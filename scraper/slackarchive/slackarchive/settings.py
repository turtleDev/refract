# -*- coding: utf-8 -*-

import os

# Scrapy settings for slackarchive project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#     http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
#     http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html

class DatabaseNotSpecified(Exception):
    pass

BOT_NAME = 'slackarchive'

SPIDER_MODULES = ['slackarchive.spiders']
NEWSPIDER_MODULE = 'slackarchive.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'refract scraper'

# delay to make sure we don't go over api limits
DOWNLOAD_DELAY = 1

# keep retrying, never give up
RETRY_ENABLE = True
RETRY_HTTP_CODES = [429]
# Item pipeline
ITEM_PIPELINES = {
    'slackarchive.pipelines.DatabasePipeline': 100
}

# channels to scrape
CHANNELS = ['C0DT79Y86']

# where to save the files
DB_PATH = os.getenv('REFRACT_DB_PATH')

if DB_PATH is None:
    raise DatabaseNotSpecified(
        'please set REFRACT_DB_PATH environment variable to the path to the database')

