const Parser = function(res) {

  let 
  { GetQuery } = require('./FindQuery'),
   ResStrings = JSON.parse(JSON.stringify(GetQuery(res))),
   objs = JSON.parse(ResStrings).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents,
   CountLength = objs.length,
   results;

  switch (CountLength) {
      case CountLength = 20:
          results = objs.map(d => {
              let res = d.videoRenderer
              return {
                  video_id: res.videoId,
                  thumbnail: res.thumbnail.thumbnails[0].url,
                  title: res.title.runs[0].text,
                  publishedTime: res.publishedTimeText.simpleText,
                  viewCount: res.viewCountText.simpleText,
                  uploadBy: res.longBylineText.runs[0].text,
                  channelUrl: "https://www.youtube.com" + res.longBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
                  channelThumbnail: res.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url
              }
          });

          break;
      default:
          results = [{"status":"notfound"}];
  }

  return JSON.stringify(results);
}

module.exports = {
  Parser
}