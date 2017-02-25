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

class VideoItemLoader(scrapy.loader.ItemLoader):

    default_output_processor = scrapy.loader.processors.TakeFirst()

    duration_out = duration_processor
