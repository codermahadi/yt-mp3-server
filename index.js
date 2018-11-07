const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
var through = require('through');

const app = express();

app.get('/get-mp3/:videoId', function (req, res) {

  const videoUrl = 'https://www.youtube.com/watch?v=' + req.params.videoId;
  const destDir = __dirname;

  var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'});

  try {
    ytdl.getInfo(videoUrl, function(err, info){
       var videoName = info.title.replace('|','').toString('ascii');

       videoReadableStream.on('end', () => res.end(videoReadableStream));
       videoReadableStream.pipe(res);
   });
 } catch (exception) {
   console.log(exception);
   resn.end("Error");
 }

});

const port = process.env.PORT ? process.env.PORT : 8080;

app.listen(port, function () {
  console.log('http://localhost:' + port);
});
