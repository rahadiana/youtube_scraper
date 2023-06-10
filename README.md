
# youtube scraper


#nothing to maintain

Easy scrape youtube data include sentiment analysis in **BAHASA**


Clone & instal (uncomment one of function to see results)

       git clone  https://github.com/rahadiana/youtube_scraper.git
       cd youtube_scraper
       npm i
       node index.js

Avaliable Command

For find comment from video :

    FindComment("[video_id]")

For find video upload from channel :

    UPloadCh("https://www.youtube.com/c/[CHANNEL_NAME]")
**OR**

```
UPloadCh("https://www.youtube.com/channel/[CHANNEL_ID]")
```
For Find video using a query

    Request('[query]','[peroid]')

Avaliable peroid :

    ['1h','1w','1m','1y']

