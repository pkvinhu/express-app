const express = require("express");
const morgan = require('morgan');
const postBank = require('./postBank');
const path = require('path');


const app = express();

app.use(morgan('dev'));

app.use(express.static('public'))

app.get("/", (req, res) => {
	// res.send("Hello World!")
  const posts = postBank.list();

  const html = 
`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      )}
    </div>
  </body>
</html>`;

  res.send(html);
});

app.get("/:id", (req, res) => {
	// res.send("Hello World!")
  const posts = postBank.find(req.params.id);
  const postTitle = posts.title;
  const postID = posts.id;
  const postName = posts.name;

  const resWithThis = 
`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${postID}. ▲</span>${postID}
            <small>(by ${postName})</small>
          </p>
          <small class="news-info">
            ${posts.upvotes} upvotes | ${posts.date}
          </small>
        </div>
    </div>
  </body>
</html>`;

  res.send(resWithThis);
});

app.get("/posts/:id", (req, res) => {
	// res.send("Hello World!")
  const posts = postBank.find(req.params.id);
  const postTitle = posts.title;
  const postID = posts.id;
  const postName = posts.name;


  const resWithThis = 
`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${postID}. ▲</span>${postID}
            <small>(by ${postName})</small>
          </p>
          <small class="news-info">
            ${posts.upvotes} upvotes | ${posts.date}
          </small>
        </div>
    </div>
  </body>
</html>`;

  res.send(resWithThis);
});

app.get( '/posts/:id', (req, res) => {
  console.log( req.params.id );
});

app.get( '/users/:name', (req, res) => {
  console.log( req.params.name );
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

