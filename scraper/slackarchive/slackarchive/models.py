# -*- coding: utf-8 -*-

from peewee import *
import slackarchive.settings as settings

db = SqliteDatabase(settings.DB_PATH)

class Team(Model):
    team_id = CharField(unique=True)
    domain = CharField()
    name = CharField()

    class Meta:
        database = db
        db_table = 'teams'

class Video(Model):
    team = ForeignKeyField(Team, related_name='songs')
    video_id = CharField(unique=True)
    title = CharField()
    duration = CharField()

    class Meta:
        database = db
        db_table = 'videos'

db.connect()
db.create_tables([Team, Video], safe=True)
