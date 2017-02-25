# -*- coding: utf-8

import re

import scrapy
import scrapy.loader
import scrapy.loader.processors

def duration_processor(self, it):
    values = [x for x in it]
    
    if len(values) == 0:
        return None

    time = re.search('PT(.+)', values[0]).groups()[0]
    time = time.lower()
    return time

def video_id_processor(self, it):
    urls = [x for x in it]

    if len(urls) == 0:
        return None

    video_id = re.search('\/watch\?v=(...........)', urls[0]).groups()[0]
    return video_id

class VideoItemLoader(scrapy.loader.ItemLoader):

    default_output_processor = scrapy.loader.processors.TakeFirst()

    duration_out = duration_processor
    video_id_out = video_id_processor
