# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class VideoItem(scrapy.Item):
    video_id = scrapy.Field()
    team = scrapy.Field()
    title = scrapy.Field()
    duration = scrapy.Field()

class TeamItem(scrapy.Item):
    team_id = scrapy.Field()
    domain = scrapy.Field()
    name = scrapy.Field()
