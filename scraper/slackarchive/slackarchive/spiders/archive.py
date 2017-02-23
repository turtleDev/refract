# -*- coding: utf-8 -*-

import json
import re

import scrapy

from slackarchive.utils import encode_query
from slackarchive.items import UrlItem

class ArchiveSpider(scrapy.Spider):

    name = "archive"
    allowed_domains = ["slackarchive.io"]

    _api_url = 'http://api.slackarchive.io/v1/messages'

    def _get_link(self, source):

        pattern = "<(https?:\/\/(www\.)?youtube\.com\/watch.+)>"
        match = re.search(pattern, source)

        if match is not None:
            return match[0]
        else:
            return None
        

    def start_requests(self):
        for cid in self.settings.get('CHANNELS'):
            url = encode_query(self._api_url, { 'channel': cid });
            yield scrapy.Request(url)


    def parse(self, response):
        
        payload = json.loads(response.text)

        for message in payload['messages']:

            url = self._get_link(message['text'])

            if url is None:
                continue

            item = UrlItem()
            item['url'] = url

            yield item

        tail = payload['messages'][-1]['ts']

        url = encode_query(response.url, {'to': tail});

        return scrapy.Request(url)
