const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const User = require('./models/User')

mongoose.connect('mongodb://127.0.0.1/blog_posts', {})
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));
  
  async function createBlogPost() {
    try {
      const blogpost = await BlogPost.create({
        title: 'Đây là sách dạy học lập trình Node.js từ cơ bản',
        body: 'Nếu bạn đam mê với JavaScript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.',
        username: 'DuyHoan23',
      });
      console.log(blogpost);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getAllPosts() {
    try {
      const posts = await BlogPost.find();  // Lấy tất cả bài viết
      console.log('Danh sách bài viết:', posts);
    } catch (error) {
      console.error('Lỗi khi tìm bài viết:', error);
    }
  }

  async function getAllUsers() {
    try {
      const users = await User.find();  // Lấy tất cả bài viết
      console.log('Users:', users);
    } catch (error) {
      console.error('Lỗi khi tìm user:', error);
    }
  }

  getAllUsers();

  async function deleteAllPosts(){
    try {
      const deleteAllPosts = await BlogPost.deleteMany({}); 
    } catch (error) {
      console.error('Error occurred: ', error)
    }
  }

  // deleteAllPosts();


