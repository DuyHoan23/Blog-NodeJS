const BlogPost = require('../models/BlogPost.js');
const session = require('express-session');
module.exports = async (request, response) => {
    try {
        console.log(request.session);      
        const posts = await BlogPost.find();
        response.render('index', {
          blogposts: posts,
        })
      } catch (error) {
        console.error('Lỗi khi tìm bài viết:', error);
      }
}