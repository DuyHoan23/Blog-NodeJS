const BlogPost = require('../models/BlogPost.js');
module.exports = async (req, res) => {
    try {
        const detailPost = await BlogPost.findById(req.params.id);
        if (!detailPost) {
          return res.status(404).send('Post not found');
        }
  
        res.render('post', {
          detailPost
        })
      } catch (error) {
        console.error('Error fetching post', error);
        res.status(500).send('An error occurred while fetching the post')
      }
}