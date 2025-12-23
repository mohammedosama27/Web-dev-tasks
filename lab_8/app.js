var express = require('express');
var app = express();
app.use(express.json());

var postRouter = require('./routes/posts');



app.use('/posts', postRouter);

app.get('/health', (req, res) => {
  res.status(200).send('healthy');
  res.end();
});

// assign port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


