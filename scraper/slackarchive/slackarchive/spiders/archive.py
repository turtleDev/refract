# -*- coding: utf-8 -*-

import json
import re

import scrapy

from slackarchive.utils import encode_query
from slackarchive.items import VideoItem, TeamItem
from slackarchive.loaders import VideoItemLoader

class TeamNotFound(Exception):
    pass

class ArchiveSpider(scrapy.Spider):

    name = "archive"
    allowed_domains = ["slackarchive.io", "youtube.com"]

    _api_url = 'http://api.slackarchive.io/v1/messages'
    _team_discovery = 'http://api.slackarchive.io/v1/team'
    _channel_discovery = 'http://api.slackarchive.io/v1/channels'

    def _get_link(self, source):

        # So a quick google search reveals that youtube ids are 11 characters long
        pattern = "<(https?:\/\/(www\.)?youtube\.com\/watch\?v=...........)>"
        match = re.search(pattern, source)

        if match is not None:
            return match.groups()[0]
        else:
            return None
        

    def start_requests(self):
        # for cid in self.settings.get('CHANNELS'):
        #     url = encode_query(self._api_url, { 'channel': cid });
        #     yield scrapy.Request(url)
        team_domain = self.settings['TEAM']
        team_discovery = encode_query(self._team_discovery, {'domain': team_domain})
        yield scrapy.Request(url=team_discovery, callback=self.parse_team)


    def parse_team(self, response):

        data = json.loads(response.text)
        try:
            team = data['team'][0]
        except IndexError:
            raise TeamNotFound(self.settings['TEAM'])

        teamitem = TeamItem()
        teamitem['name'] = team['name']
        teamitem['team_id'] = team['team_id']
        teamitem['domain'] = team['domain']

        yield teamitem

        url = encode_query(self._channel_discovery, {'team_id': team['team_id']})

        yield scrapy.Request(url, callback=self.parse_channels, meta={'team': teamitem})


    def parse_channels(self, response):
        channels = self.settings['CHANNELS']
        data = json.loads(response.text)
        for c in data['channels']:
            if c['name'] in channels:
                url = encode_query(self._api_url, {'channel': c['channel_id']})
                yield scrapy.Request(url, meta={'team': response.meta['team']})


    def parse(self, response):
        
        payload = json.loads(response.text)

        for message in payload['messages']:

            url = self._get_link(message['text'])

            if url is None:
                continue

            yield scrapy.Request(url, callback=self.parse_metadata, meta={'team': response.meta['team']})

        try:
            tail = payload['messages'][-1]['ts']
        except IndexError:
            return None

        url = encode_query(response.url, {'to': tail});

        yield scrapy.Request(url, meta={'team': response.meta['team']})

    def parse_metadata(self, response):

        l = VideoItemLoader(VideoItem(), response.xpath('/html/head')) 

        l.add_xpath('title', '//meta[@itemprop="name"]/@content')
        l.add_xpath('duration', '//meta[@itemprop="duration"]/@content')
        l.add_value('video_id', response.url)
        l.add_value('team', response.meta['team'])

        yield l.load_item()
