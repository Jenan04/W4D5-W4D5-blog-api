
const API_URL = 'http://localhost:5000';

const formContainer = document.getElementById('form-container');
const message = document.getElementById('message');
const output = document.getElementById('output');


const showMessage = (text, error = false) => {
  message.textContent = text;
  message.className = error ? 'text-red-600 text-center mt-4' : 'text-green-600 text-center mt-4';
  setTimeout(() => message.textContent = '', 3000);
}


const renderAddUserForm = () => {
  formContainer.innerHTML = `
    <form id="add-user-form" class="space-y-4">

      <input type="text" id="firstname" placeholder="First Name" class="w-full border p-2 rounded" required />
      <input type="text" id="secondname" placeholder="Second Name" class="w-full border p-2 rounded" required />
      <input type="password" id="password" placeholder="Password" class="w-full border p-2 rounded" required />
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
    </form>
  `;
  output.innerHTML = '';

  document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
    //   id: Number(document.getElementById('user-id').value),
      firstname: document.getElementById('firstname').value.trim(),
      secondname: document.getElementById('secondname').value.trim(),
      password: document.getElementById('password').value.trim()
    };
// !user.id ||
    if ( !user.firstname || !user.secondname || !user.password) {
      showMessage('All fields required', true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error');

      showMessage(`User added successfully. Your ID is ${data.id}`);
      const button = document.createElement('button');
    button.textContent = 'Show My Posts';
    button.className = 'bg-green-600 text-white px-4 py-2 rounded block mt-4';

    button.addEventListener('click', async () => {
      const res = await fetch(`${API_URL}/posts/user/${data.id}`);
      const posts = await res.json();

      if (!res.ok) {
        showMessage(posts.message || 'Error fetching posts', true);
        return;
      }

      output.innerHTML = `<h3 class="text-lg font-bold mb-2">User Posts</h3>` +
        posts.map(post => `<div class="border p-2 mb-2">${post.content}</div>`).join('');
    });

    output.appendChild(button);
      e.target.reset();
    } catch (err) {
      showMessage(err.message, true);
    }
  });
}


const renderAddPostForm = () => {
  formContainer.innerHTML = `
    <form id="add-post-form" class="space-y-4">
      <input type="number" id="post-user-id" placeholder="User ID" class="w-full border p-2 rounded" required />
      <input type="text" id="title" placeholder="Post Title" class="w-full border p-2 rounded" required />
      <textarea id="content" placeholder="Post Content" class="w-full border p-2 rounded" required></textarea>
      <button class="bg-green-600 text-white px-4 py-2 rounded">Add Post</button>
    </form>
  `;
  output.innerHTML = '';

  document.getElementById('add-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const post = {
      userId: Number(document.getElementById('post-user-id').value),
      title: document.getElementById('title').value.trim(),
      body: document.getElementById('content').value.trim()
    };

    if (!post.userId || !post.title || !post.body) {
      showMessage('All fields required', true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error');

      showMessage('Post added successfully');
      e.target.reset();
    } catch (err) {
      showMessage(err.message, true);
    }
      
// fetch('http://localhost:5000/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(post)
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));
  });
}


const renderAllPosts = async () => {
  formContainer.innerHTML = '';
  output.innerHTML = '';

  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    if (!Array.isArray(posts)) {
      showMessage('Unexpected response', true);
      return;
    }

    if (posts.length === 0) {
      output.innerHTML = '<p class="text-center text-gray-500">No posts found</p>';
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'border p-4 rounded bg-gray-50';

      card.innerHTML = `
        <h2 class="text-xl font-bold">${post.title}</h2>
        <p class="text-gray-700">${post.body}</p>
        <p class="text-sm text-gray-500 mt-2">User ID: ${post.userId}</p>
      `;

      output.appendChild(card);
    });
  } catch (err) {
    showMessage('Failed to fetch posts', true);
  }
}

const renderGetUserPostsForm = () => {
  formContainer.innerHTML = `
    <form id="get-user-posts-form" class="space-y-4">
      <input type="number" id="user-id-input" placeholder="Enter User ID" class="w-full border p-2 rounded" required />
      <button class="bg-yellow-600 text-white px-4 py-2 rounded">Get Posts</button>
    </form>
  `;
  output.innerHTML = '';
  
  document.getElementById('get-user-posts-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = Number(document.getElementById('user-id-input').value);
    if (!userId) {
      showMessage('Please enter a valid User ID', true);
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/posts/user/${userId}`);
      if (res.status === 404) {
        showMessage('User not found or no posts', true);
        output.innerHTML = '';
        return;
      }
      const posts = await res.json();
      
      if (!Array.isArray(posts) || posts.length === 0) {
        showMessage('No posts found for this user', true);
        output.innerHTML = '';
        return;
      }
      
      output.innerHTML = '';
      posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'border p-4 rounded bg-gray-50 mb-4';
        card.innerHTML = `
          <h3 class="font-bold text-lg">${post.title}</h3>
          <p>${post.body}</p>
          <p class="text-sm text-gray-500 mt-1">Post ID: ${post.id}</p>
        `;
        output.appendChild(card);
      });
      
      showMessage(`Found ${posts.length} posts for user ${userId}`);
      
    } catch (err) {
      showMessage('Failed to fetch posts', true);
      output.innerHTML = '';
    }
  });
}



document.getElementById('show-add-user').addEventListener('click', renderAddUserForm);
document.getElementById('show-add-post').addEventListener('click', renderAddPostForm);
document.getElementById('show-posts').addEventListener('click', renderAllPosts);
document.getElementById('show-user-posts').addEventListener('click', renderGetUserPostsForm);


renderAddUserForm();
