# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from slackarchive import models
from slackarchive import items

class DatabasePipeline(object):

    def __init__(self):

        self.collisions = 0
        self.collision_threshold = -1
        self.active = True
    
    def close_spider(self, spider):
        models.db.close()

    def update_collision_count(self):
        self.collisions += 1
        if self.collision_threshold > 0 and self.collisions > self.collision_threshold:
            spider.crawler.stop()
            self.active = False

    def process_item(self, item, spider):

        if self.active is False:
            return

        if isinstance(item, items.TeamItem):
            return self.process_team(item)
        else:
            return self.process_video(item)

    def process_team(self, item):
        team, created = models.Team.create_or_get(**dict(item))
        team.save()

    def process_video(self, item):
        team, _ = models.Team.create_or_get(**dict(item['team']))
        item['team'] = team
        video, created = models.Video.create_or_get(**dict(item))
        if created is False:
            self.update_collision_count()
            return
        video.save()
         

