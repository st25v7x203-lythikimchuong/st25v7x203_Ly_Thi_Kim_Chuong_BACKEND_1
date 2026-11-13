
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Trang chủ
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Contactbook application." });
});

// Định nghĩa các route Contact
const contactRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactRouter);

// Xử lý đường dẫn không tồn tại
app.use((req, res, next) => {
    next(require("./app/api-error").notFound());
});

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;
