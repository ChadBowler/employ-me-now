const multer = require('multer');

// File upload middleware
const handleFileUpload = (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });
  
    const upload = multer({ storage }).single('resume');
  
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error uploading file' });
      }
  
      next();
    });
  };
  
  module.exports = handleFileUpload;