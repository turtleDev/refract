# -*- coding: utf-8 -*-

import os
import logging

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
USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'

# delay to make sure we don't go over api limits
DOWNLOAD_DELAY = 1

# be less verbose
LOG_LEVEL = logging.INFO

# keep retrying, never give up
RETRY_ENABLE = True
RETRY_HTTP_CODES = [429]

# Item pipeline
ITEM_PIPELINES = {
    'slackarchive.pipelines.DatabasePipeline': 100
}

# channels to scrape
CHANNELS = os.environ['REFRACT_CHANNELS'].split(',')

# team to query
TEAM = os.environ['REFRACT_TEAM_DOMAIN']

# where to save the files
DB_PATH = os.environ['REFRACT_DB_PATH']

# how many collisions to tolerate
REDUNDENCY_THRESHOLD = int(os.getenv('REFRACT_REDUNDENCY_THRESHOLD'))
