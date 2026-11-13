
const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');

// Lấy các liên hệ yêu thích
router.get('/favorite', contactController.findFavorite);

// Lấy tất cả liên hệ
router.get('/', contactController.findAll);

// Xóa tất cả liên hệ
router.delete('/', contactController.deleteAll);

// Lấy một liên hệ theo ID
router.get('/:id', contactController.findOne);

// Thêm liên hệ mới
router.post('/', contactController.create);

// Cập nhật liên hệ
router.put('/:id', contactController.update);

// Xóa một liên hệ theo ID
router.delete('/:id', contactController.delete);

module.exports = router;
