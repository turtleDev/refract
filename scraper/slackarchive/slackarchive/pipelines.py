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
        self.teams = {}
    
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

        try:
            team = models.Team.select().where(
                models.Team.team_id == item['team_id']).get()
        except:
            models.Team.create(**dict(item))

        self.teams[team.team_id] = team

    def process_video(self, item, spider):

        # see if the team exists in the local cache, if not, create it
        team = item['team']
        if team['team_id'] not in self.teams.keys():
            self.process_team(team, spider)
        team = self.teams[team['team_id']]

        # if the video doesn't exist create it
        try:
            video = models.Video.select().where(
                models.Video.video_id == item['video_id']).get()
            self.update_collision_count(spider)
        except:
            video = models.Video.create(**dict(item))
         
        # create a relationship, if it doesn't exist
        try:
            mapping = models.TeamVideoMap.select().where(
                    (models.TeamVideoMap.team == team) & (models.TeamVideoMap.video == video)).get()
        except:
            models.TeamVideoMap.create(team=team, video=video)

