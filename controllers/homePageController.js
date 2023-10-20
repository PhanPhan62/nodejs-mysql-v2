const flash = require('connect-flash');
// const User = require('../models/users');
const db = require('../connection');
const { render } = require('ejs');

exports.homePage = async(req, res, next) => {
    try {
        const slider = await new Promise((resolve, reject) => {
            db.query('select * from slider WHERE status = 1', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const categoryPass = await new Promise((resolve, reject) => {
            db.query('select * from loaisanpham where trangthai = 1 limit 4', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const newsProduct = await new Promise((resolve, reject) => {
            const sql = "SELECT sp.`TenSanPham`, gsp.`Gia`, sp.`AnhSanPham`, hdn.`NgayNhap`FROM chitietdonhang ctdh INNER JOIN sanpham sp on ctdh.`MaSanPham` = sp.`MaSanPham` INNER JOIN donhang dh on ctdh.`MaDonHang` = dh.`MaDonHang` INNER JOIN GiaSanPham gsp on sp.`MaSanPham` = gsp.`MaSanPham` INNER JOIN giamgia gg on sp.`MaSanPham` = gg.`MaSanPham` INNER JOIN chitiethoadonnhap cthdn on sp.`MaSanPham` = cthdn.`MaSanPham` INNER JOIN hoadonnhap hdn on cthdn.`MaHoaDonNhap` = hdn.`MaHoaDonNhap`WHERE hdn.`NgayNhap` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND hdn.`NgayNhap` <= CURDATE();";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const bestSeller = await new Promise((resolve, reject) => {
            const sql = "SELECT sp.MaSanPham, sp.TenSanPham, gsp.Gia, sp.AnhSanPham, MAX(ctdh.SoLuong * ctdh.GiaMua) AS MaxGiaMua FROM ChiTietDonHang ctdh INNER JOIN SanPham sp ON ctdh.MaSanPham = sp.MaSanPham INNER JOIN DonHang dh ON ctdh.MaDonHang = dh.MaDonHang INNER JOIN GiaSanPham gsp ON sp.MaSanPham = gsp.MaSanPham GROUP BY sp.MaSanPham, sp.TenSanPham, gsp.Gia, sp.AnhSanPham LIMIT 10 ";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const sell = await new Promise((resolve, reject) => {
            const sql = "SELECT sp. MaSanPham, sp.AnhSanPham, sp.TenSanPham, gg.PhanTram, gg.PhanTram, gg.ThoiGianBatDau, gg.ThoiGianKetThuc, gsp.Gia, ROUND(100 - (gsp.Gia * (gg.PhanTram / 100)), 2) AS GiaSauGiam FROM SanPham sp INNER JOIN GiamGia gg ON sp.MaSanPham = gg.MaSanPham INNER JOIN GiaSanPham gsp ON sp.MaSanPham = gsp.MaSanPham WHERE NOW() BETWEEN gg.ThoiGianBatDau AND gg.ThoiGianKetThuc AND gg.TrangThai= 1 ORDER BY gg.PhanTram DESC; ";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const category = await new Promise((resolve, reject) => {
            db.query('call getAllLoaiSPLimit4()', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/homePage', {
                        slider: slider,
                        categoryPass: categoryPass,
                        category: results,
                        bestSeller: bestSeller,
                        sell: sell,
                        newsProduct: newsProduct
                    });
                }
            });
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.product = async(req, res, next) => {
    try {
        const slider = await new Promise((resolve, reject) => {
            db.query('select * from slider WHERE status = 1', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const categoryPass = await new Promise((resolve, reject) => {
            db.query('select * from loaisanpham where trangthai = 1 limit 4', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const newsProduct = await new Promise((resolve, reject) => {
            const sql = "SELECT sp.`TenSanPham`, gsp.`Gia`, sp.`AnhSanPham`, hdn.`NgayNhap`FROM chitietdonhang ctdh INNER JOIN sanpham sp on ctdh.`MaSanPham` = sp.`MaSanPham` INNER JOIN donhang dh on ctdh.`MaDonHang` = dh.`MaDonHang` INNER JOIN GiaSanPham gsp on sp.`MaSanPham` = gsp.`MaSanPham` INNER JOIN giamgia gg on sp.`MaSanPham` = gg.`MaSanPham` INNER JOIN chitiethoadonnhap cthdn on sp.`MaSanPham` = cthdn.`MaSanPham` INNER JOIN hoadonnhap hdn on cthdn.`MaHoaDonNhap` = hdn.`MaHoaDonNhap`WHERE hdn.`NgayNhap` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND hdn.`NgayNhap` <= CURDATE();";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const bestSeller = await new Promise((resolve, reject) => {
            const sql = "SELECT sp.TenSanPham, gsp.Gia, sp.AnhSanPham, MAX(ctdh.SoLuong * ctdh.GiaMua) AS MaxGiaMua FROM ChiTietDonHang ctdh INNER JOIN SanPham sp ON ctdh.MaSanPham = sp.MaSanPham INNER JOIN DonHang dh ON ctdh.MaDonHang = dh.MaDonHang INNER JOIN GiaSanPham gsp ON sp.MaSanPham = gsp.MaSanPham GROUP BY sp.TenSanPham, gsp.Gia, sp.AnhSanPham LIMIT 10";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const sell = await new Promise((resolve, reject) => {
            const sql = "SELECT sp. MaSanPham, sp.AnhSanPham, sp.TenSanPham, gg.PhanTram, gg.PhanTram, gg.ThoiGianBatDau, gg.ThoiGianKetThuc, gsp.Gia, ROUND(100 - (gsp.Gia * (gg.PhanTram / 100)), 2) AS GiaSauGiam FROM SanPham sp INNER JOIN GiamGia gg ON sp.MaSanPham = gg.MaSanPham INNER JOIN GiaSanPham gsp ON sp.MaSanPham = gsp.MaSanPham WHERE NOW() BETWEEN gg.ThoiGianBatDau AND gg.ThoiGianKetThuc AND gg.TrangThai= 1 ORDER BY gg.PhanTram DESC; ";
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const category = await new Promise((resolve, reject) => {
            db.query('call getAllLoaiSPLimit4()', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/shop', {
                        slider: slider,
                        categoryPass: categoryPass,
                        category: results,
                        bestSeller: bestSeller,
                        sell: sell,
                        newsProduct: newsProduct
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.productDetail = async(req, res, next) => {
    try {
        const userId = req.params.id;

        const procductByID = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM sanpham sp INNER JOIN giasanpham gsp ON gsp. `MaSanPham` = sp. `MaSanPham` INNER JOIN chitietanh cta ON sp.MaSanPham = cta.MaSanPham WHERE sp. `MaSanPham` = ? ";
            db.query(sql, userId, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                    // console.log(results);
                }
            });
        });
        const procductByID1 = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM sanpham sp INNER JOIN giasanpham gsp ON gsp.`MaSanPham`= sp.`MaSanPham` WHERE sp.`MaSanPham` = ?";
            db.query(sql, userId, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        const categoryPass = await new Promise((resolve, reject) => {
            db.query('select * from loaisanpham where trangthai = 1 limit 4', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const main = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM sanpham sp INNER JOIN giasanpham gsp ON gsp.`MaSanPham`=sp.`MaSanPham` WHERE sp.`MaSanPham` = ?', userId, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/productByID', {
                        procductByID: procductByID,
                        procductByID1: procductByID1,
                        prdID: results,
                        categoryPass: categoryPass
                    });
                    console.log(procductByID);
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};