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



const FindComment = function(VidId) {

  var UserInput = VidId;

  if (UserInput === "" || UserInput === "undefined") {
      console.log('videoid requied!!!')
      process.exit()
  } else {



      const puppeteer = require('puppeteer');
      const fs = require('fs');
      const BaseUrl = 'https://www.youtube.com/watch?v=';
      const VideoId = UserInput //'r_bzGhXLhHs';
      const fullUrl = BaseUrl + VideoId;
      (async () => {
          const browser = await puppeteer.launch({
              headless: 1
          });
          const page = await browser.newPage();
          await page.goto(fullUrl, );
          await page.setViewport({
              width: 1200,
              height: 800
          });



          async function asd() {
              const elem = await page.$('#contents');
              const boundingBox = await elem.boundingBox();
              const lempar = JSON.parse(JSON.stringify(boundingBox)).height
              await page.waitForTimeout(200);
              await page.keyboard.press("PageDown");
              LagiCek(lempar)
          }

          async function LagiCek(val) {
              await page.waitForTimeout(900);
              const elems = await page.$('#contents');
              const boundingBoxs = await elems.boundingBox();
              const iuguig = JSON.parse(JSON.stringify(boundingBoxs)).height
              const biugu9oh = iuguig - val
              if (biugu9oh == 0) {
                  await page.waitForTimeout(8000);
                  console.log(`all JSON saved at storage/VideoComments/${UserInput}/`)
                  process.exit()
              }
          }

          await page.waitForSelector('#comments');
          await page.waitForTimeout(2200);
          await page.keyboard.press("PageDown");

          page.on('response', async (response) => {
              asd()
              if (response.url().includes('/youtubei/v1/next')) {
                  asd()
                  if (response.url() == response.url()) {
                      //Get raw json data
                      const data = await response.json()

                      const ResStrings = JSON.stringify(data)
                      const obj = JSON.parse(ResStrings);
                      const CariKomeng = ResStrings.search('"contentText"');
                      //console.log(CariKomeng);
                      if (CariKomeng == -1) {
                          // console.log("gada komen" + CariKomeng);
                      } else {
                          // console.log("ada komen" + CariKomeng);
                          const arrLength = obj.onResponseReceivedEndpoints.length;
                          //console.log(arrLength);
                          if (arrLength == 1) {
                              const arrs1 = obj.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems;
                              const RemoveUnusedRecord = arrs1.splice(0, arrs1.length - 1)
                              const ResStringss = JSON.stringify(RemoveUnusedRecord)
                              const objasd = JSON.parse(ResStringss);
                              const arrads = objasd;
                              const results = arrads.map(d => {
                                  //cv means Comment Variable
                                  const cv = d.commentThreadRenderer.comment.commentRenderer

                                  return {
                                      comment: cv.contentText.runs[0].text,
                                      //like_count: cv.voteCount.simpleText,
                                      reply_count: 0 + cv.replyCount,
                                      comment_created: cv.actionButtons.commentActionButtonsRenderer.protoCreationMs,
                                      screen_name: cv.authorText.simpleText,
                                      pic_url: cv.authorThumbnail.thumbnails[2].url,
                                      channel_url: 'https://youtube.com' + cv.authorEndpoint.commandMetadata.webCommandMetadata.url,
                                      commentId: cv.commentId
                                  }
                              })
                              var saveItem = results;

                          } else {
                              const arrs = obj.onResponseReceivedEndpoints[1].reloadContinuationItemsCommand.continuationItems;
                              var RemoveUnusedRecord = arrs.splice(0, arrs.length - 1)
                              const ResStringss = JSON.stringify(RemoveUnusedRecord)
                              const objasd = JSON.parse(ResStringss);
                              const arrads = objasd;
                              const results = arrads.map(d => {
                                  //cv means Comment Variable    
                                  const cv = d.commentThreadRenderer.comment.commentRenderer

                                  return {
                                      comment: cv.contentText.runs[0].text,
                                      //like_count: cv.voteCount.simpleText,
                                      reply_count: 0 + cv.replyCount,
                                      comment_created: cv.actionButtons.commentActionButtonsRenderer.protoCreationMs,
                                      screen_name: cv.authorText.simpleText,
                                      pic_url: cv.authorThumbnail.thumbnails[2].url,
                                      channel_url: 'https://youtube.com' + cv.authorEndpoint.commandMetadata.webCommandMetadata.url,
                                      commentId: cv.commentId
                                  }
                              })
                              var saveItem = results;
                          }
                      }
                      //end cari koment
                      const url = new URL(fullUrl);
                      const params = new URLSearchParams(url.search.slice(1));
                      const QueryToFiles = params.get('v')
                      const Isinya = JSON.stringify(await saveItem)
                      const dir = 'storage/VideoComments/' + QueryToFiles;

                      var items = [254, 45, 212, 365, 2543];

                      function random_item(items) {
                          return items[Math.floor(Math.random() * items.length)];
                      }
                      const TimeNya = Date.now() + "_" + random_item(items)
                      
                      if (!fs.existsSync(dir)) {
                          fs.mkdirSync(dir);
                      }

                      if (Isinya !== undefined) {
                          fs.writeFile('storage/VideoComments/' + QueryToFiles + '/' + 'tmp_' + TimeNya + '_' + QueryToFiles + '.json', Isinya, function(err) {
                              if (err) throw err;
                          });
                      }
                  }
                  //response end
              }
          })
      })();
  }
}

const UPloadCh = function(VidId) {

    if (VidId === "" || VidId === "undefined") {
        console.log('videoid requied!!!')
        process.exit()
    } else {
  
        if(VidId.includes('youtube.com/c/')){
            var BaseUrl = VidId+"/videos";
            var UserInput = VidId.split("/")[4];
        }else{
            var BaseUrl = VidId+"/videos";
            var UserInput = VidId.split("/")[4];
        }

        const uniqid = require('uniqid'); 
        const puppeteer = require('puppeteer');
        const fs = require('fs');
        const fullUrl = BaseUrl;        
        const dir = 'storage/channelupdate/' + UserInput;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        (async () => {
            const browser = await puppeteer.launch({
                headless: 1
            });
            const page = await browser.newPage();
            await page.goto(fullUrl, );
            await page.setViewport({
                width: 1200,
                height: 800
            });
  
  
  
            async function asd() {
                const elem = await page.$('#contents');
                const boundingBox = await elem.boundingBox();
                const lempar = JSON.parse(JSON.stringify(boundingBox)).height
                await page.waitForTimeout(200);
                await page.keyboard.press("PageDown");
                LagiCek(lempar)
            }
  
            async function LagiCek(val) {
                await page.waitForTimeout(900);
                const elems = await page.$('#contents');
                const boundingBoxs = await elems.boundingBox();
                const iuguig = JSON.parse(JSON.stringify(boundingBoxs)).height
                const biugu9oh = iuguig - val
                if (biugu9oh == 0) {
                    await page.waitForTimeout(8000);
                    console.log(`all JSON saved at storage/channelupdate/${UserInput}/`)
                    process.exit()
                }
            }
  
            await page.waitForSelector('#img');
            await page.waitForTimeout(2200);
            await page.keyboard.press("PageDown");
  
            page.on('response', async (response) => {
                asd()
                if (response.url().includes('youtubei/v1/browse')) {
                    if (response.url() == response.url()) {
                        //Get raw json data
                        const data = await response.json()
  
                        const ResStrings = JSON.stringify(data)
                        const obj = JSON.parse(ResStrings);
                        
                        const arrs = obj.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems
                        var RemoveUnusedRecord = arrs.splice(0, arrs.length - 1)
                        const ResStringss = JSON.stringify(RemoveUnusedRecord)
                        const objasd = JSON.parse(ResStringss);
                        const arrads = objasd;
                        
                          const results = arrads.map(d => {
                              //cv means Comment Variable    
                              const cv = d.gridVideoRenderer
  
                              if(cv.videoId == undefined){
  
                                  //return []
  
                              }else{
                                  return {
                                      videoId: cv.videoId,
                                      thumbnail : cv.thumbnail.thumbnails[0].url,
                                      //richthumbnail: cv.richThumbnail.movingThumbnailRenderer.movingThumbnailDetails.thumbnails[0].url,
                                      title : cv.title.runs[0].text,
                                      duration: cv.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText,
                                      accessibility : cv.title.accessibility.accessibilityData.label,
                                      publishedTimeText : cv.publishedTimeText.simpleText,
                                      viewCountText : cv.viewCountText.simpleText
                                  }
                              }
                          })

                        const QueryToFiles = UserInput
                        const Isinya = JSON.stringify(await results)

                        const TimeNya = Date.now() + "_" + uniqid()

  
                        if (Isinya !== undefined) {
                            fs.writeFile('storage/channelupdate/' + QueryToFiles + '/' + 'tmp_' + TimeNya + '_' + QueryToFiles + '.json', Isinya, function(err) {
                                if (err) throw err;
                            });
                        }
  
  
                          
                        
  
                        //process.exit()
  
                        
                        
                    }
                    //response end
                }
            })
        })();
    }
  }
  
module.exports = {
  UPloadCh,
  Parser,
  FindComment
}