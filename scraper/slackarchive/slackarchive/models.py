# -*- coding: utf-8 -*-

import sqlite3
import hashlib

connection = None
cursor = None

class ConnectionNotOpenError(Exception):
    pass

def init(db_path):
    global connection, cursor
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

def cleanup():
    connection.commit()
    connection.close()

class Url:

    name = 'videos'

    url = None

    def _check_connection(self):

        if connection is None:
            raise ConnectionNotOpenError()

    def __init__(self, item):

        self.url = item['url']
        self.title = item['title']
        self.duration = item['duration']

        self._check_connection()

        q = 'create table if not exists {}(id integer primary key, url varchar, title varchar, duration varchar);'.format(self.name)
        cursor.execute(q)

    def save(self):

        self._check_connection()

        q = 'insert into {}(url, title, duration) values(?, ?, ?)'.format(self.name)
        result = cursor.execute(q, (self.url, self.title, self.duration))
        connection.commit()

    def exists(self):
        q = 'select * from {} where url=?'.format(self.name)
        result = cursor.execute(q, (self.url,)).fetchone()
        if result:
            return True
        else:
            return False
