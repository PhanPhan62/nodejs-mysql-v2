const db = require('../connection');

// Create a new user
exports.create = (req, res) => {
    const {
        MaSanPham,
        MaLoai,
        TenSanPham,
        MoTaSanPham,
        MaNSX,
        MaDonViTinh,
        AnhSanPham
    } = req.body;

    db.query(
        'INSERT INTO shop.sanpham (MaSanPham, MaLoai, TenSanPham, MoTaSanPham, MaNSX, MaDonViTinh, AnhSanPham) VALUES( ? , ? , ? , ? , ? , ? , ? );', [MaSanPham,
            MaLoai,
            TenSanPham,
            MoTaSanPham,
            MaNSX,
            MaDonViTinh,
            AnhSanPham
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi thêm mới', error: err });
            } else {
                const successMessage = "Thêm mới thành công!!!";
                res.redirect('back');
            }
        }
    );
};


// Read all users

exports.getAllUsers = async(req, res, next) => {
    try {
        const sanpham = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP = await new Promise((resolve, reject) => {
            db.query('select * from loaisanpham where TrangThai = 1', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const NSX = await new Promise((resolve, reject) => {
            db.query('select * from nhasanxuat', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const DVT = await new Promise((resolve, reject) => {
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
                    const name = "Thông tin sản phẩm";
                    res.render('sanpham/index', {
                        title: name,
                        LoaiSP: LoaiSP,
                        NSX: NSX,
                        DVT: DVT,
                        nhanvien: sanpham
                    });
                    // res.render('sanpham/index', { users: users,});

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

            const title = 'Chỉnh sửa';
            // console.log(nhanvien);
            res.render('sanpham/show', { title: title });
            // res.render('sanpham/edit', { usersById: usersById, title: title});
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

            const title = 'Chỉnh sửa';
            // console.log(user);
            res.render('sanpham/edit', { title: title, nhanvien: nhanvien });
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
                res.redirect('/admin/sanpham');
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