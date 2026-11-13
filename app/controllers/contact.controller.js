
const ContactService = require('../services/contact.service');

// Lấy tất cả liên hệ
exports.findAll = async (req, res, next) => {
    try {
        const contacts = await ContactService.findAll();
        res.send(contacts);
    } catch (error) {
        next(error);
    }
};

// Lấy liên hệ yêu thích
exports.findFavorite = async (req, res, next) => {
    try {
        const contacts = await ContactService.findFavorite();
        res.send(contacts);
    } catch (error) {
        next(error);
    }
};

// Xóa tất cả liên hệ
exports.deleteAll = async (req, res, next) => {
    try {
        await ContactService.deleteAll();
        res.send({ message: 'All contacts deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Lấy một liên hệ theo ID
exports.findOne = async (req, res, next) => {
    try {
        const contact = await ContactService.findOne(req.params.id);

        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }

        res.send(contact);
    } catch (error) {
        next(error);
    }
};

// Thêm liên hệ mới
exports.create = async (req, res, next) => {
    try {
        const contact = await ContactService.create(req.body);
        res.status(201).send(contact);
    } catch (error) {
        next(error);
    }
};

// Cập nhật liên hệ
exports.update = async (req, res, next) => {
    try {
        const contact = await ContactService.update(req.params.id, req.body);

        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }

        res.send(contact);
    } catch (error) {
        next(error);
    }
};

// Xóa một liên hệ
exports.delete = async (req, res, next) => {
    try {
        const result = await ContactService.delete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: 'Contact not found' });
        }

        res.send({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error);
    }
};
