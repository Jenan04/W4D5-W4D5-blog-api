// const express = require('express');
// const app = express();

// app.use(express.json()); // لتفسير JSON في الطلبات

// // مثال راوت بسيط
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const app = express();

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.get('/', (req, res) => {
  res.send('API is running');
});

// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

