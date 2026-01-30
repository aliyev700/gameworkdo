const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// 1. Şəklin hara və hansı adla düşəcəyini təyin edirik
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Şəkillər bu qovluğa gedəcək
  },
  filename(req, file, cb) {
    // Faylın adı eyni olmasın deyə tarix əlavə edirik: image-12345678.jpg
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// 2. Yalnız şəkil fayllarını qəbul etmək üçün yoxlama
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!'); // Şəkil deyilsə xəta ver
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// 3. Upload endpointi (Tək şəkil üçün)
router.post('/', upload.single('image'), (req, res) => {
  // Frontendə şəklin yolunu qaytarırıq (məsələn: /uploads/image-123.jpg)
  res.send(`/${req.file.path}`);
});

module.exports = router;