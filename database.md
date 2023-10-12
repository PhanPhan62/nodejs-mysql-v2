-- DROP DATABASE shop
-- CREATE DATABASE shop
-- use shop
CREATE TABLE `LoaiSanPham` (
  `MaLoai` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaLoai_Cha` int,
  `TenLoai` varchar(250) NOT NULL,
  `TrangThai` bit NOT NULL
);

CREATE TABLE `NhaSanXuat` (
  `MaNSX` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TenNSX` varchar(250) NOT NULL,
  `MoTa` text
);

CREATE TABLE `DonViTinh` (
  `MaDonViTinh` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TenDonViTinh` varchar(100) NOT NULL
);

CREATE TABLE `NhaCungCap` (
  `MaNCC` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TenNCC` varchar(250) NOT NULL,
  `DiaChi` varchar(500) NOT NULL,
  `SoDienThoai` char(20) NOT NULL,
  `Email` char(20) NOT NULL
);

CREATE TABLE `SanPham` (
  `MaSanPham` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaLoai` int NOT NULL,
  `TenSanPham` varchar(250) NOT NULL,
  `MoTaSanPham` text NOT NULL,
  `SoLuong` int NOT NULL,
  `MaNSX` int NOT NULL,
  `MaDonViTinh` int NOT NULL,
  `NgayTao` datetime NOT NULL,
  `AnhSanPham` varchar(250) NOT NULL
);
--
CREATE TABLE `ChiTietAnh` (
  `MaAnhChitiet` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaSanPham` int,
  `Anh` varchar(500)
);

--
CREATE TABLE `GiamGia` (
  `MaGiamGia` int PRIMARY KEY AUTO_INCREMENT,
  `MaSanPham` int,
  `PhanTram` float,
  `ThoiGianBatDau` datetime,
  `ThoiGianKetThuc` datetime,
  `TrangThai` bit
);

CREATE TABLE `KhuyenMai` (
  `MaKhuyenMai` int PRIMARY KEY NOT NULL,
  `TenKhuyenMai` varchar(250) NOT NULL,
  `MoTa` text
);

CREATE TABLE `ChiTietKhuyenMai` (
  `MaChiTietKhuyenMai` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaSanPham` int NOT NULL,
  `ThoiGianBatDau` datetime NOT NULL,
  `ThoiGianKetThuc` datetime NOT NULL,
  `MaKhuyenMai` int,
  `TrangThai` bit NOT NULL
);

CREATE TABLE `KhachHang` (
  `MaKhachHang` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TenKhachHang` varchar(250) NOT NULL,
  `DiaChi` varchar(1500) NOT NULL,
  `SDT` varchar(50) NOT NULL,
  `Email` varchar(50)
);

CREATE TABLE `NhanVien` (
  `MaNhanVien` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(250),
  `NgaySinh` datetime,
  `GioiTinh` varchar(20),
  `AnhDaiDien` varchar(500),
  `DiaChi` varchar(1500),
  `Email` varchar(100),
  `DienThoai` char(20),
  `TrangThai` bit
);

CREATE TABLE `Kho` (
  `MaKho` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `TenKho` varchar(250) NOT NULL,
  `DiaChi` varchar(500) NOT NULL
);

CREATE TABLE `ChiTietKho` (
  `MaChiTietKho` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaKho` int,
  `MaSanPham` int,
  `SoLuong` int
);

CREATE TABLE `KiemKho` (
  `MaKiemKho` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaNhanVien` int,
  `ThoiGianBatDau` datetime,
  `ThoiGianKetThuc` datetime,
  `TrangThaiKho` int,
  `MaKho` int,
  `MoTa` text
);

CREATE TABLE `ChiTietKiemKho` (
  `MaChiTietKiemKho` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaSanPham` int NOT NULL,
  `MaKiemKho` int NOT NULL,
  `SoLuongDemDuoc` int,
  `SoLuongTinhToan` int,
  `SoLuongThayDoi` int
);

CREATE TABLE `HoaDonNhap` (
  `MaHoaDonNhap` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `SoHoaDonNhap` nchar NOT NULL,
  `NgayNhap` datetime NOT NULL,
  `MaNhanVien` int NOT NULL,
  `MaNhaCungCap` int NOT NULL
);

CREATE TABLE `ChiTietHoaDonNhap` (
  `MaChiTiet` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaSanPham` int NOT NULL,
  `MaHoaDonNhap` int NOT NULL,
  `SoLuong` int,
  `DonGiaNhap` float NOT NULL
);

CREATE TABLE `DonHang` (
  `MaDonHang` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int NOT NULL,
  `NgayDat` datetime,
  `TrangThaiDonHang` int
);

CREATE TABLE `ChiTietDonHang` (
  `MaChiTietDonHang` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaDonHang` int NOT NULL,
  `MaSanPham` int NOT NULL,
  `SoLuong` int NOT NULL,
  `GiaMua` float NOT NULL
);

CREATE TABLE `HoaDonXuat` (
  `MaHoaDonXuat` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `NgayXuat` datetime,
  `MaKhachHang` int,
  `MaNhanVien` int
);

CREATE TABLE `ChiTietHoaDonXuat` (
  `MaChiTietHoaDonXuat` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `MaHoaDonXuat` int NOT NULL,
  `MaSanPham` int NOT NULL,
  `SoLuong` int NOT NULL,
  `GiaBan` float NOT NULL,
  `ChietKhau` float,
  `TraLai` int
);

CREATE TABLE `TaiKhoan` (
  `MaTaiKhoan` int PRIMARY KEY AUTO_INCREMENT,
  `MaNhanVien` int NOT NULL,
  `TaiKhoan` varchar(100),
  `MatKhau` varchar(100),
  `NgayBatDau` datetime,
  `NgayKetThuc` datetime,
  `TrangThai` bit,
  `LoaiQuuyen` varchar(10)
);

CREATE TABLE `GiaSanPham` (
  `MaGiaSanPHam` int PRIMARY KEY AUTO_INCREMENT,
  `MaSanPham` int NOT NULL,
  `NgayBatDau` datetime NOT NULL,
  `NgayKetThuc` datetime NOT NULL,
  `Gia` float
);

ALTER TABLE `SanPham` ADD FOREIGN KEY (`MaLoai`) REFERENCES `LoaiSanPham` (`MaLoai`);

ALTER TABLE `SanPham` ADD FOREIGN KEY (`MaNSX`) REFERENCES `NhaSanXuat` (`MaNSX`);

ALTER TABLE `SanPham` ADD FOREIGN KEY (`MaDonViTinh`) REFERENCES `DonViTinh` (`MaDonViTinh`);

ALTER TABLE `ChiTietAnh` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `GiaSanPham` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `GiamGia` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `ChiTietKhuyenMai` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `ChiTietKhuyenMai` ADD FOREIGN KEY (`MaKhuyenMai`) REFERENCES `KhuyenMai` (`MaKhuyenMai`);

ALTER TABLE `ChiTietKho` ADD FOREIGN KEY (`MaKho`) REFERENCES `Kho` (`MaKho`);

ALTER TABLE `ChiTietKho` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `KiemKho` ADD FOREIGN KEY (`MaNhanVien`) REFERENCES `NhanVien` (`MaNhanVien`);

ALTER TABLE `KiemKho` ADD FOREIGN KEY (`MaKho`) REFERENCES `Kho` (`MaKho`);

ALTER TABLE `ChiTietKiemKho` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `ChiTietKiemKho` ADD FOREIGN KEY (`MaKiemKho`) REFERENCES `KiemKho` (`MaKiemKho`);

ALTER TABLE `HoaDonNhap` ADD FOREIGN KEY (`MaNhanVien`) REFERENCES `NhanVien` (`MaNhanVien`);

ALTER TABLE `HoaDonNhap` ADD FOREIGN KEY (`MaNhaCungCap`) REFERENCES `NhaCungCap` (`MaNCC`);

ALTER TABLE `ChiTietHoaDonNhap` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `ChiTietHoaDonNhap` ADD FOREIGN KEY (`MaHoaDonNhap`) REFERENCES `HoaDonNhap` (`MaHoaDonNhap`);

ALTER TABLE `DonHang` ADD FOREIGN KEY (`MaKhachHang`) REFERENCES `KhachHang` (`MaKhachHang`);

ALTER TABLE `ChiTietDonHang` ADD FOREIGN KEY (`MaDonHang`) REFERENCES `DonHang` (`MaDonHang`);

ALTER TABLE `ChiTietDonHang` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `HoaDonXuat` ADD FOREIGN KEY (`MaKhachHang`) REFERENCES `KhachHang` (`MaKhachHang`);

ALTER TABLE `HoaDonXuat` ADD FOREIGN KEY (`MaNhanVien`) REFERENCES `NhanVien` (`MaNhanVien`);

ALTER TABLE `ChiTietHoaDonXuat` ADD FOREIGN KEY (`MaHoaDonXuat`) REFERENCES `HoaDonXuat` (`MaHoaDonXuat`);

ALTER TABLE `ChiTietHoaDonXuat` ADD FOREIGN KEY (`MaSanPham`) REFERENCES `SanPham` (`MaSanPham`);

ALTER TABLE `TaiKhoan` ADD FOREIGN KEY (`MaNhanVien`) REFERENCES `NhanVien` (`MaNhanVien`);
