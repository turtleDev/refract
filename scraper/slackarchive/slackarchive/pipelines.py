# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from slackarchive import models

class DatabasePipeline(object):

    def __init__(self):

        self.collisions = 0
        self.collision_threshold = -1
        self.active = True
    
    def open_spider(self, spider):
        models.init(spider.settings['DB_PATH'])

    def process_item(self, item, spider):

        if self.active is False:
            return

        u = models.Url(item['url'], item['timestamp'])

        if u.exists() is True:
            self.collisions += 1
            if self.collision_threshold > 0 and self.collisions > self.collision_threshold:
                spider.crawler.stop()
                self.active = False
            return
        else:
            u.save()

        return item

    def close_spider(self, spider):
        models.cleanup()

