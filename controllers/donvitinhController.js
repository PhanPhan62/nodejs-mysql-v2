const db = require('../connection');

exports.getAllDV = async(req, res, next) => {
    try {
        const name = "Thông tin Đơn vị tính";
        // Thực hiện truy vấn SQL thứ nhất bằng async/await
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from donvitinh', (err, results) => {
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
                    res.render('dvt/index', {
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