const BlogPost = require('../models/BlogPost.js');
const path = require('path')
module.exports = async (req, res) => {
    try {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, 'public/upload', image.name))
        const { title, body } = req.body;  // Lấy title và body từ req.body
    
        // Tạo blogpost mới với dữ liệu từ req.body
        const blogpost = await BlogPost.create({
          title: title,
          body: body,
          image: `/upload/` + image.name
        });
    
        console.log('Bài viết đã được tạo:', blogpost);
        res.redirect('/');  
      } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi khi tạo bài viết');
      }
}