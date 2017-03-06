# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from slackarchive import models
from slackarchive import items

class DatabasePipeline(object):

    def __init__(self, threshold):

        self.collisions = 0
        self.collision_threshold = threshold
        self.active = True
    
    def close_spider(self, spider):
        models.db.close()

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler.settings.get('REDUNDENCY_THRESHOLD', -1))

    def update_collision_count(self, spider):
        self.collisions += 1
        if self.collision_threshold > 0 and self.collisions > self.collision_threshold:
            spider.crawler.stop()
            self.active = False

    def process_item(self, item, spider):

        if self.active is False:
            return

        if isinstance(item, items.TeamItem):
            return self.process_team(item, spider)
        else:
            return self.process_video(item, spider)

    def process_team(self, item, spider):
        team, created = models.Team.create_or_get(**dict(item))
        team.save()

    def process_video(self, item, spider):
        team, _ = models.Team.create_or_get(**dict(item['team']))
        item['team'] = team
        video, created = models.Video.create_or_get(**dict(item))
        if created is False:
            self.update_collision_count(spider)
            return
        video.save()
         

