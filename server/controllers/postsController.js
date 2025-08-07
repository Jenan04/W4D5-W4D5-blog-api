// controllers/postsController.js
const { writeFileSync } = require('fs');
const { join } = require('path');
const datta = require('../models/datta');
const { users ,posts } = datta;

const createPost = (req, res) => {
  // in storage
  // const data = require('../models/data.json');
  // const { posts } = data;
  // const {userId, title, body} = req.body;
  
  // if (!userId || !title || !body) {
  //   return res.status(400).json({ error: "Missing fields" });
  // }

  // const newPost = {
  //   id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
  //   userId,
  //   title,
  //   body
  // };
  // posts.push(newPost);

  // // res.status(201).json(newPost);

  // try {
  //   writeFileSync(
  //     join(__dirname, '..', 'models', 'data.json'),
  //     JSON.stringify(data, null, 2) + '\n'
  //   );
  //   res.status(201).json(newPost);
  // } catch (err) {
  //   next(err);
  // }

  // in memory 
  const { userId, title, body } = req.body;

 
  if (!userId || !title || !body) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  
  // const userExists = users.some(user => user.id === Number(userId));
  // if (!userExists) {
  //   return res.status(404).json({ error: 'User not found' });
  // }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    userId: Number(userId),
    title,
    body
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};


const getAllPosts = (req, res) => {
  // const { posts } = require('../models/data.json');
  res.json(posts);
}

const getPostsByUser = (req, res) => {
  // const { users, posts } = require('../models/data.json');
  const userId = parseInt(req.params.userId);
  const userPosts = posts.filter(post => post.userId === userId);
  res.json(userPosts);
  
  // const { userId } = req.params.userId;
  
  // const user = users.find(_user => _user.id );
  // const postUser = posts.find(_post => _post.user_id === userId);
  
  // user.id = postUser.id;
  
  // res.send(postUser);
}

module.exports = { createPost, getAllPosts, getPostsByUser };
