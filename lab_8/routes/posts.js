var express = require('express');
var router = express.Router();


const posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
    comments: [
      { id: 1, content: "Nice post!" },
      { id: 2, content: "Thanks for sharing." }
    ] 
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
    comments: [
      { id: 1, content: "Interesting read." }
    ]
  },
  {
    id: 3,
    title: "Third Post",
    content: "This is the content of the third post.",
    comments: [
      { id: 1, content: "Great post!" },
      { id: 2, content: "Very informative." }
    ]
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "This is the content of the fourth post.",
    comments: [
      { id: 1, content: "Loved it!" },
      { id: 2, content: "Well written." },
      { id: 3, content: "Looking forward to more." },
      
    ]
  }
];

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

router.post('/newpost', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.post('/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === postId);
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      content: req.body.content
    };
    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

router.delete('/:postId/comments/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const commentId = parseInt(req.params.commentId, 10);
  const post = posts.find(p => p.id === postId);
  if (post) {
    const commentIndex = post.comments.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

module.exports = router; 