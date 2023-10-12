const mysql = require('mysql');
const db = require('../connection');

// Create a new user
exports.createLoaisp = (req, res) => {
    const {
        MaLoai_Cha,
        TenLoai,
        TrangThai
    } = req.body;

    db.query(
        'call createOrUpdateLoaiSP(?, ?, ?)', [MaLoai_Cha, TenLoai, TrangThai],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi thêm mới', error: err });
            } else {
                res.status(201).json({ message: 'Thêm mới thành công!!!' });
            }
        }
    );
};


// Read all 
exports.getAllLoaisp = (req, res) => {
    db.query('call getAllLoaiSP;', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json({ data: results });
        }
    });
    // db.end();
};

// Read a single by ID
exports.getLoaispById = (req, res) => {
    const loaispId = req.params.id;

    db.query('call getAllLoaiSPbyId(?)', loaispId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Lỗi không tồn tại' });
            } else {
                res.status(200).json({ data: results[0] });
            }
        }
    });
};
// Read  LoaiSp Pass
exports.getLoaispPass = (req, res) => {
    const trangthaiPass = req.params.id;

    db.query('call getAllLoaiSPPASS(?)', trangthaiPass, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Lỗi không tồn tại' });
            } else {
                res.status(200).json({ data: results[0] });
            }
        }
    });
};

// Update by ID
exports.updateLoaisp = (req, res) => {
    const loaispId = req.params.id;
    const {
        MaLoai_Cha,
        TenLoai,
        TrangThai
    } = req.body;

    db.query(
        'call updateLoaiSPById(?, ?, ?, ?)', [loaispId,
            MaLoai_Cha,
            TenLoai,
            TrangThai
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi cập nhật ', error: err });
            } else {
                res.status(200).json({ message: 'Cập nhật thành công' });
            }
        }
    );
};

// Delete a user by ID
exports.deleteLoaisp = (req, res) => {
    const loaispId = req.params.id;
    db.query('call deleteLoaiSPById(?)', loaispId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi xóa', error: err });
        } else {
            res.status(200).json({ message: 'Xóa thành công!!!' });
        }
    });

};

//