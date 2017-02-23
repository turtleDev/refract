# -*- coding: utf-8 -*-

# Scrapy settings for slackarchive project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#     http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
#     http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'slackarchive'

SPIDER_MODULES = ['slackarchive.spiders']
NEWSPIDER_MODULE = 'slackarchive.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'refract scraper'

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# channels to scrape
CHANNELS = ['C0DT79Y86']
