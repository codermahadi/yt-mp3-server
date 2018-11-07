const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/:videoId', function (req, res) {

  const videoUrl = 'https://www.youtube.com/watch?v=' + req.params.videoId;
  const destDir = __dirname;

  var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'});

   ytdl.getInfo(videoUrl, function(err, info){
     var videoName = info.title.replace('|','').toString('ascii');

     var videoWritableStream = fs.createWriteStream(destDir + '\\' + videoName + '.mp3');

     var stream = videoReadableStream.pipe(videoWritableStream);

     stream.on('finish', function() {
         res.writeHead(204);
         res.end();
     });
 });

});

app.listen(process.env.PORT);
