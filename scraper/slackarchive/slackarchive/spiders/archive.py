# -*- coding: utf-8 -*-

import json
import re

import scrapy

from slackarchive.utils import encode_query
from slackarchive.items import VideoItem
from slackarchive.loaders import VideoItemLoader

class ArchiveSpider(scrapy.Spider):

    name = "archive"
    allowed_domains = ["slackarchive.io", "youtube.com"]

    _api_url = 'http://api.slackarchive.io/v1/messages'

    def _get_link(self, source):

        # So a quick google search reveals that youtube ids are 11 characters long
        pattern = "<(https?:\/\/(www\.)?youtube\.com\/watch\?v=...........)>"
        match = re.search(pattern, source)

        if match is not None:
            return match.groups()[0]
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

            yield scrapy.Request(url, callback=self.parse_metadata)

        try:
            tail = payload['messages'][-1]['ts']
        except IndexError:
            return None

        url = encode_query(response.url, {'to': tail});

        # yield scrapy.Request(url)

    def parse_metadata(self, response):

        l = VideoItemLoader(VideoItem(), response.xpath('/html/head')) 

        l.add_xpath('title', '//meta[@itemprop="name"]/@content')
        l.add_xpath('duration', '//meta[@itemprop="duration"]/@content')
        l.add_value('url', response.url)

        yield l.load_item()
