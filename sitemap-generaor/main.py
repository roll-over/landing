import sys
import logging
from pysitemap import crawler
from pysitemap.parsers.lxml_parser import Parser

if __name__ == '__main__':
    if '--iocp' in sys.argv:
        from asyncio import events, windows_events
        sys.argv.remove('--iocp')
        logging.info('using iocp')
        el = windows_events.ProactorEventLoop()
        events.set_event_loop(el)

    # root_url = sys.argv[1]
    root_url = 'https://roll-over.org/'
    crawler(
        root_url, out_file='src/static/sitemap.xml', exclude_urls=[".pdf", ".jpg", ".zip"],
        http_request_options={"ssl": True}, parser=Parser
    )