const User = require('../models/User.js')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;  // Lấy title và body từ req.body
    
        // Tạo blogpost mới với dữ liệu từ req.body
        const user = await User.create({
          username: username,
          password: password
        });
    
        console.log('User đã được tạo:', user);
        res.redirect('/');  
      } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi khi tạo User');
      }
}