from pysitemap import crawler
from pysitemap.parsers.lxml_parser import Parser

if __name__ == "__main__":
    crawler(
        "https://roll-over.org/",
        out_file="landing/static/sitemap.xml",
        exclude_urls=[".pdf", ".jpg", ".zip"],
        http_request_options={"ssl": True},
        parser=Parser,
    )
    crawler(
        "https://denta-crm.com/",
        out_file="denta/static/sitemap.xml",
        exclude_urls=[".pdf", ".jpg", ".zip"],
        http_request_options={"ssl": True},
        parser=Parser,
    )
