# -*- coding: utf-8 -*-

import urllib.parse

def encode_query(url, query):
    ''' encode (and overwrite) query parameters

    Parameters:
      url - the url to modify
      query - a dict containing the query parameters
    '''

    # yeah, not a documented API. It may break in the future.
    parse_result = urllib.parse.urlparse(url)._asdict()
    base_query = urllib.parse.parse_qs(parse_result['query'])

    channel = base_query.get('channel')
    if channel and isinstance(channel, list):
        base_query['channel'] = channel[0]

    # merge the two query maps
    query = {**base_query, **query}
    
    parse_result['query'] = urllib.parse.urlencode(query)

    return urllib.parse.urlunparse(parse_result.values())

