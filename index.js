const express = require('express');
const app = express();

app.get('/:videoId', function (req, res) {

  res.send(req.params);

});

app.listen(process.env.PORT);
