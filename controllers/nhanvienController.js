const db = require('../connection');

exports.getAllNV = (req, res, next) => {
    db.query('select * from NhanVien', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            const nhanvien = results;
            // exports.nhanvien = nhanvien;
            res.json({ nhanvien: nhanvien, title: "dkjfnkdjfn" })
                // res.render('users/index', { nhanvien: nhanvien, title: "djfkdfjh" });
                // console.log(results);
                // next();
        }
    });
};