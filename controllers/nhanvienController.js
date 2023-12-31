const db = require('../connection');

exports.getAllNV = async(req, res, next) => {
    try {
        const name = "Thông tin Nhân viên";
        // Thực hiện truy vấn SQL thứ nhất bằng async/await
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('call getAllTaiKhoan', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhanvien/index', {
                        title: name,
                        nhanvien: nhanvien
                    });
                }
            });

        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};