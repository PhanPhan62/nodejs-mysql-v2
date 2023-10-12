// authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../connection');

// Đăng nhập
exports.login = (req, res) => {
    const { TaiKhoan, MatKhau, LoaiQuyen } = req.body;
    if (!TaiKhoan || !MatKhau) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tài khoản và mật khẩu' });
    }
    console.log(TaiKhoan, MatKhau);
    // Kiểm tra tài khoản và mật khẩu trong cơ sở dữ liệu
    db.query(
        'SELECT * FROM taikhoan WHERE TaiKhoan = ?', [TaiKhoan.trim()],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi đăng nhập', error: err });
            } else {
                if (results.length === 0) {
                    res.status(401).json({ message: 'Tài khoản không tồn tại' });
                } else {
                    const hashedPassword = results[0].MatKhau;
                    const hashedRole = results[0].LoaiQuyen;
                    // bcrypt.compare(MatKhau, hashedPassword, (bcryptErr, isMatch) => {
                    if (MatKhau == hashedPassword) {
                        // res.status(200).json({ message: 'Đăng nhập thành công' });
                        if (hashedRole === 'admin') {
                            res.redirect('/admin');
                            // console.log("đến admin");
                        } else {
                            res.redirect('/');
                        }
                    } else {
                        res.status(401).json({ message: 'Mật khẩu không chính xác' });
                    }

                    // });
                }
            }
        }
    );
    console.log(res.render("login"));
};