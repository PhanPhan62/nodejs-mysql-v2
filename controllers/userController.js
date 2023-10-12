const flash = require('connect-flash');
// const User = require('../models/users');
const db = require('../connection');
const { render } = require('ejs');
// const flash = require('express-flash');

// Create a new user
exports.createUser = (req, res) => {
    const {
        MaNhanVien,
        TaiKhoan,
        MatKhau,
        NgayBatDau,
        NgayKetThuc,
        TrangThai,
        LoaiQuyen
    } = req.body;

    db.query(
        'call createOrUpdateTaiKhoan(?, ?, ?, ?, ?, ?, ?)', [MaNhanVien, TaiKhoan, MatKhau, NgayBatDau,
            NgayKetThuc, TrangThai, LoaiQuyen
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi thêm mới', error: err });
            } else {
                const successMessage = "Thêm mới thành công!!!";
                // res.render('users/index', { successMessage });
                res.redirect('back');
                // res.status(200).json({ message: 'Thêm mới thành công!!!' });
            }
        }
    );
};


// Read all users

exports.getAllUsers = async(req, res, next) => {
    try {
        // const name = "Thông tin tài khoản";
        // Thực hiện truy vấn SQL thứ nhất bằng async/await
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // res.json(results)
                    resolve(results);
                    // res.render('users/index', nhanvien)
                    // console.log(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('call getAllTaiKhoan', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // const nhanvien = res.locals.nhanvien;
                    const users = results[0].map((user) => {
                        user.TrangThai1 = user.TrangThai == 1 ? {
                            "text": "Đang hoạt động",
                            "icon": "lni lni-checkmark",
                            "color": "success"
                        } : {
                            "text": "Không hoạt động",
                            "icon": "lni lni-spinner",
                            "color": "close"
                        };
                        return user;
                    });
                    // Tính toán các biến liên quan đến phân trang
                    const page = parseInt(req.query.page) || 1;
                    const perPage = 7;
                    const start = (page - 1) * perPage;
                    const end = page * perPage;
                    const paginatedUsers = users.slice(start, end);
                    // console.log(paginatedUsers);

                    const name = "Thông tin tài khoản";
                    // Trả về danh sách người dùng đã phân trang và các biến phân trang
                    // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
                    // console.log(users, nhanvien);
                    res.render('users/index', {
                        title: name,
                        taikhoan: paginatedUsers,
                        nhanvien: nhanvien
                    });
                    // res.render('users/index', { users: users,});

                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};



// Read a single user by ID
exports.getUserById = async(req, res) => {
    const userId = req.params.id;

    const users = await new Promise((resolve, reject) => {
        db.query('call getAllTaiKhoanbyId(?)', userId, (err, results) => {
            const users = results[0].map((user) => {
                user.TrangThai1 = user.TrangThai == 1 ? {
                    "text": "Đang hoạt động",
                    "icon": "lni lni-checkmark",
                    "color": "inactive"
                } : {
                    "text": "Không hoạt động",
                    "icon": "lni lni-spinner",
                    "color": "worked"
                };
                return user;
            });
            const usersById = results[0];
            const title = 'Chỉnh sửa';
            // console.log(nhanvien);
            res.render('users/show', { usersById: usersById, title: title });
            // res.render('users/edit', { usersById: usersById, title: title});
        })
    });
};

exports.getUserByIdEdit = async(req, res) => {
    const userId = req.params.id;

    const nhanvien = await new Promise((resolve, reject) => {
        db.query('select * from nhanvien', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

    const users = await new Promise((resolve, reject) => {
        db.query('call getAllTaiKhoanbyId(?)', userId, (err, results) => {
            const user = results[0][0];
            if (!user) {
                // Xử lý trường hợp không tìm thấy người dùng
                // Thường là hiển thị thông báo lỗi hoặc chuyển hướng
                return res.status(404).send('Người dùng không tồn tại.');
            }
            user.TrangThai1 = user.TrangThai == 1 ? {
                "text": "Đang hoạt động",
                "icon": "lni lni-checkmark",
                "color": "inactive"
            } : {
                "text": "Không hoạt động",
                "icon": "lni lni-spinner",
                "color": "worked"
            };
            const title = 'Chỉnh sửa';
            // console.log(user);
            res.render('users/edit', { users: user, title: title, nhanvien: nhanvien });
        });
    });
};


// Update a user by ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const {
        MaNhanVien,
        TaiKhoan,
        MatKhau,
        NgayBatDau,
        NgayKetThuc,
        TrangThai,
        LoaiQuyen
    } = req.body;

    db.query(
        'call updateTaiKhoanById(?, ?, ?, ?, ?, ?, ?, ?)', [userId, MaNhanVien, TaiKhoan, MatKhau,
            NgayBatDau, NgayKetThuc, TrangThai, LoaiQuyen
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi cập nhật ', error: err });
            } else {
                res.redirect('/admin/users');
            }
        }
    );
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('call deleteTaiKhoanById(?)', userId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi xóa', error: err });
        } else {
            res.status(200).json({ message: 'Xóa thành công!!!' });
        }
    });

};