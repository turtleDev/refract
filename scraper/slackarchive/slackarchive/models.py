# -*- coding: utf-8 -*-

from peewee import *
import slackarchive.settings as settings

db = SqliteDatabase(settings.DB_PATH)

class Team(Model):
    team_id = CharField()
    domain = CharField()
    name = CharField()

    class Meta:
        database = db
        db_table = 'teams'

class Video(Model):
    video_id = CharField()
    title = CharField()
    duration = CharField()

    class Meta:
        database = db
        db_table = 'videos'

class TeamVideoMap(Model):
    team = ForeignKeyField(Team)
    video = ForeignKeyField(Video)

    class Meta:
        database = db
        db_table = 'map'


db.connect()
db.create_tables([Team, Video, TeamVideoMap], safe=True)
