-------------- Loại sản phẩm  --------------------

CREATE TABLE
    LoaiSanPham (
        MaLoai int IDENTITY(1, 1) primary key NOT NULL,
        MaLoai_Cha int null,
        TenLoai varchar (250) not null,
        TrangThai bit not null
    );
    USE shop;
CREATE TABLE MenuAdmin (
    MaMenuAdmin int AUTO_INCREMENT primary key NOT NULL,
    icon varchar(500) null,
    TenMenu_Cha varchar(250) null,
    TenMenu_con varchar(250) null,
    urlMenu VARCHAR(250) NULL,
    idjs VARCHAR(250) null
);
select * from MenuAdmin;

----- Nhà sản xuất ----

CREATE TABLE
    NhaSanXuat (
        MaNSX int IDENTITY(1, 1) primary key not null,
        TenNSX varchar(250) not null,
        MoTa text null
    ) ------ Đơn vị tính ----
CREATE TABLE
    DonViTinh (
        MaDonViTinh int IDENTITY(1, 1) primary key not null,
        TenDonViTinh varchar(100) not null
    ) ---------- Nhà cung cấp --------
CREATE TABLE
    NhaCungCap (
        MaNCC int IDENTITY(1, 1) primary key not null,
        TenNCC varchar (250) not null,
        DiaChi varchar(500) not null,
        SoDienThoai char (20) not null,
        Email char (20) not null
    ) ----------- Sản phẩm -------------
CREATE TABLE
    SanPham (
        MaSanPham int IDENTITY(1, 1) primary key not null,
        MaLoai int not null foreign key references LoaiSanPham(MaLoai),
        TenSanPham varchar (250) not null,
        MoTaSanPham text not null,
        SoLuong int not null,
        MaNSX int not null foreign key references NhaSanXuat(MaNSX),
        MaDonViTinh int NOT NULL foreign key references DonViTinh(MaDonViTinh),
        NgayTao datetime not null,
        AnhSanPham varchar(250) not null
    ) ----- Chi tiết ảnh--------
CREATE TABLE
    ChiTietAnh (
        MaAnhChitiet int IDENTITY(1, 1) primary key NOT NULL,
        MaSanPham int FOREIGN KEY REFERENCES SanPham(MaSanPham) NULL,
        Anh varchar(500) NULL,
    ) ------- Giá sản phẩm  ---------
CREATE TABLE
    GiaSanPham (
        MaGiaSanPHam int IDENTITY (1, 1) NOT NULL,
        MaSanPham int not null foreign key references SanPham(MaSanPham),
        NgayBatDau datetime not null,
        NgayKetThuc datetime not null,
        Gia float null
    ) ---------------Giảm giá -------
CREATE TABLE
    GiamGia (
        MaGiamGia int IDENTITY(1, 1) NOT NULL,
        MaSanPham int null foreign key references SanPham(MaSanPham),
        PhanTram float null,
        ThoiGianBatDau datetime null,
        ThoiGianKetThuc datetime null,
        TrangThai bit null
    ) --------- Khuyến mãi---------
CREATE TABLE
    KhuyenMai (
        MaKhuyenMai int primary key not null,
        TenKhuyenMai varchar (250) not null,
        MoTa text null,
    ) --------- Chi tiết khuyến mại ----------
CREATE TABLE
    ChiTietKhuyenMai (
        MaChiTietKhuyenMai int IDENTITY (1, 1) primary key not null,
        MaSanPham int not null foreign key references SanPham(MaSanPham),
        ThoiGianBatDau datetime not null,
        ThoiGianKetThuc datetime not null,
        MaKhuyenMai int foreign key references KhuyenMai(MaKhuyenMai),
        TrangThai bit not null
    )

---------- KHách Hàng ------

CREATE TABLE
    KhachHang (
        MaKhachHang int IDENTITY (1, 1) primary key not null,
        TenKhachHang varchar (250) not null,
        DiaChi varchar (1500) not null,
        SĐT varchar(50) not null,
        Email varchar (50) null
    ) --------- Nhân viên ------
CREATE TABLE
    NhanVien (
        MaNhanVien int IDENTITY(1, 1) primary key NOT NULL,
        HoTen varchar(250) NULL,
        NgaySinh datetime NULL,
        GioiTinh varchar(20) NULL,
        AnhDaiDien varchar(500) NULL,
        DiaChi varchar(1500) NULL,
        Email varchar(100) NULL,
        DienThoai char(20) NULL,
        TrangThai bit NULL,
    ) --------- Kho -------
CREATE TABLE
    Kho (
        MaKho int IDENTITY (1, 1) primary key NOT NULL,
        TenKho varchar (250) not null,
        DiaChi varchar (500) not null,
    ) ---------- Chi tiết kho -----
CREATE TABLE
    ChiTietKho (
        MaChiTietKho int IDENTITY(1, 1) primary key not null,
        MaKho int null foreign key references Kho(MaKho),
        MaSanPham int null foreign key references SanPham(MaSanPham),
        SoLuong int null
    ) ------ Kiểm kho ---------
create table
    KiemKho (
        MaKiemKho int IDENTITY(1, 1) primary key NOT NULL,
        MaNhanVien int FOREIGN KEY REFERENCES NhanVien(MaNhanVien) NULL,
        ThoiGianBatDau datetime NULL,
        ThoiGianKetThuc datetime NULL,
        TrangThaiKho int NULL,
        MaKho int FOREIGN KEY REFERENCES Kho(MaKho) NULL,
        MoTa text NULL,
    ) ---------- Chi tiết kiểm kho ------
create table
    ChiTietKiemKho (
        MaChiTietKiemKho int IDENTITY(1, 1) primary key NOT NULL,
        MaSanPham int FOREIGN KEY REFERENCES SanPham(MaSanPham) NOT NULL,
        MaKiemKho int FOREIGN KEY REFERENCES KiemKho(MaKiemKho) NOT NULL,
        SoLuongDemDuoc int NULL,
        SoLuongTinhToan int NULL,
        SoLuongThayDoi int NULL,
    ) ------------ Hóa đơn nhập ----------
CREATE TABLE
    HoaDonNhap (
        MaHoaDonNhap int IDENTITY (1, 1) primary key not null,
        SoHoaDonNhap nchar not null,
        NgayNhap datetime not null,
        MaNhanVien int foreign key references NhanVien(MaNhanVien) Not null,
        MaNhaCungCap int foreign key references NhaCungCap(MaNCC) Not null,
    )

---------- Chi tiết hóa đơn nhập ---------

CREATE TABLE
    ChiTietHoaDonNhap (
        MaChiTiet int IDENTITY (1, 1) primary key NOT NULL,
        MaSanPham int foreign key references SanPham(MaSanPham) not null,
        MaHoaDonNhap int foreign key references HoaDonNhap(MaHoaDonNhap) Not null,
        SoLuong int null,
        DonGiaNhap float not null,
    ) --------- Đơn Hàng -----------
CREATE TABLE
    DonHang (
        MaDonHang int IDENTITY(1, 1) primary key not null,
        MaKhachHang int not null foreign key references KhachHang(MaKhachHang),
        NgayDat datetime null,
        TrangThaiDonHang int null,
    ) ----------- Chi tiết đơn hàng -------
CREATE TABLE
    ChiTietDonHang (
        MaChiTietDonHang int IDENTITY (1, 1) primary key not null,
        MaDonHang int not null foreign key references DonHang(MaDonHang),
        MaSanPham int foreign key references SanPham(MaSanPham) not null,
        SoLuong int not null,
        GiaMua float not null,
    ) --------- Hóa đơn xuất --------
CREATE TABLE
    HoaDonXuat (
        MaHoaDonXuat int IDENTITY(1, 1) primary key NOT NULL,
        NgayXuat datetime NULL,
        MaKhachHang int FOREIGN KEY REFERENCES KhachHang(MaKhachHang) NULL,
        MaNhanVien int FOREIGN KEY REFERENCES NhanVien(MaNhanVien) NULL,
    ) ------- Chi tiết hóa đơn xuất ---------
CREATE TABLE
    ChiTietHoaDonXuat (
        MaChiTietHoaDonXuat int IDENTITY(1, 1) primary key NOT NULL,
        MaHoaDonXuat int FOREIGN KEY REFERENCES HoaDonXuat(MaHoaDonXuat) NOT NULL,
        MaSanPham int FOREIGN KEY REFERENCES SanPham(MaSanPham) NOT NULL,
        SoLuong int NOT NULL,
        GiaBan float NOT NULL,
        ChietKhau float NULL,
        TraLai int NULL,
    ) ------------ Tài Khoản ---------
CREATE TABLE
    TaiKhoan (
        MaTaiKhoan int IDENTITY (1, 1) not null,
        MaNhanVien int foreign key references NhanVien(MaNhanVien) not null,
        TaiKhoan varchar(100) null,
        MatKhau varchar(100) null,
        NgayBatDau datetime NULL,
        NgayKetThuc datetime NULL,
        TrangThai bit null,
        LoaiQuyen varchar(10)
    ) -- Hiển thị tất cả tài khoản

DELIMITER //

CREATE PROCEDURE GETALLTAIKHOAN() BEGIN  
	
	SELECT
	    `taikhoan`.`MaTaiKhoan`,
	    `taikhoan`.`MaNhanVien`,
	    `taikhoan`.`TaiKhoan`,
	    `taikhoan`.`MatKhau`,
	    `taikhoan`.`NgayBatDau`,
	    `taikhoan`.`NgayKetThuc`,
	    `taikhoan`.`TrangThai`,
	    `taikhoan`.`LoaiQuyen`
	FROM `shop`.`taikhoan`;
	END// 


DELIMITER ;

-- Gọi proc

call getAllTaiKhoan;

-- Hiển thị tất cả tài khoản theo id

DELIMITER //

CREATE PROCEDURE GETALLTAIKHOANBYID(IN MATAIKHOAN INT
) BEGIN  
	
	SELECT
	    `taikhoan`.`MaTaiKhoan`,
	    `taikhoan`.`MaNhanVien`,
	    `taikhoan`.`TaiKhoan`,
	    `taikhoan`.`MatKhau`,
	    `taikhoan`.`NgayBatDau`,
	    `taikhoan`.`NgayKetThuc`,
	    `taikhoan`.`TrangThai`,
	    `taikhoan`.`LoaiQuyen`
	FROM `shop`.`taikhoan`
	WHERE
	    `taikhoan`.`MaTaiKhoan` = MaTaiKhoan;
	END// 


DELIMITER ;

-- Gọi proc

call getAllTaiKhoanbyId;

-- Thêm tài khoản

DELIMITER //

CREATE PROCEDURE CREATEORUPDATETAIKHOAN(IN MANHANVIEN 
INT, IN TAIKHOAN1 VARCHAR(100), IN MATKHAU VARCHAR
(100), IN NGAYBATDAU TIMESTAMP, IN NGAYKETTHUC TIMESTAMP
, IN TRANGTHAI INT, IN LOAIQUYEN VARCHAR(10)) BEGIN 
 
	 DECLARE existingCount INT;
	-- Kiểm tra xem tài khoản đã tồn tại trong bảng chưa
	SELECT
	    COUNT(*) INTO existingCount
	FROM taikhoan
	WHERE TaiKhoan = TaiKhoan1;
	IF existingCount > 0 THEN -- Nếu tài khoản đã tồn tại, cập nhật thông tin
	UPDATE taikhoan
	SET
	    MaNhanVien = MaNhanVien,
	    MatKhau = MatKhau,
	    NgayBatDau = NgayBatDau,
	    NgayKetThuc = NgayKetThuc,
	    TrangThai = TrangThai,
	    LoaiQuyen = LoaiQuyen
	where TaiKhoan = TaiKhoan1;
	ELSE -- Nếu tài khoản chưa tồn tại, thêm mới
	INSERT INTO
	    taikhoan (
	        MaNhanVien,
	        TaiKhoan,
	        MatKhau,
	        NgayBatDau,
	        NgayKetThuc,
	        TrangThai,
	        LoaiQuyen
	    )
	VALUES (
	        MaNhanVien,
	        TaiKhoan1,
	        MatKhau,
	        NgayBatDau,
	        NgayKetThuc,
	        TrangThai,
	        LoaiQuyen
	    );
	END IF;
	END// 


DELIMITER ;

DROP PROCEDURE createOrUpdateTaiKhoan;

-- Gọi proc

CALL
    createOrUpdateTaiKhoan(
        1,
        'cong',
        'cong',
        '2023-09-06',
        NULL,
        1,
        'nhanvien'
    );

SELECT * FROM taikhoan 

-- Sửa tài khoản

DELIMITER //

CREATE PROCEDURE UPDATETAIKHOANBYID(IN TAIKHOANID INT
, IN NEWMANHANVIENID INT, IN NEWTAIKHOAN VARCHAR(100
), IN NEWMATKHAU VARCHAR(100), IN NEWNGAYBATDAU DATETIME
, IN NEWNGAYKETTHUC DATETIME, IN NEWTRANGTHAI INT, 
IN NEWLOAIQUYEN VARCHAR(10)) BEGIN  
	
	UPDATE TaiKhoan
	SET
	    MaNhanVien = NewMaNhanVienId,
	    TaiKhoan = NewTaiKhoan,
	    MatKhau = NewMatKhau,
	    NgayBatDau = NewNgayBatDau,
	    NgayKetThuc = NewNgayKetThuc,
	    TrangThai = NewTrangThai,
	    LoaiQuyen = NewLoaiQuyen
	WHERE MaTaiKhoan = TaiKhoanId;
	END // 


DELIMITER ;

drop PROCEDURE updateTaiKhoanById;

CALL
    updateTaiKhoanById(
        8,
        -- TaiKhoanId
        2,
        -- NewMaNhanVien
        'a2',
        -- NewTaiKhoan
        'a2',
        -- NewMatKhau
        '2023-09-07 00:00:00',
        -- NewNgayBatDau (sử dụng ngày giờ thích hợp)
        '2023-09-08 00:00:00',
        -- NewNgayKetThuc (sử dụng ngày giờ thích hợp)
        1,
        -- NewTrangThai
        'Nhân Viên' -- NewLoaiQuyen
    );

-- Sửa tài khoản

DELIMITER //

CREATE PROCEDURE DELETETAIKHOANBYID(IN TAIKHOANID INT
) BEGIN 
DELETE 
	  FROM taikhoan WHERE MaTaiKhoan = TaiKhoanId;
	END // 


DELIMITER ;

CREATE INDEX Account ON TaiKhoan (taikhoan);

SELECT TaiKhoan FROM taikhoan WHERE TaiKhoan = 'admin' 

-- -----------PROCEDURE LoaiSanPham-----------

-- Hiển thị tất cả tài khoản

DELIMITER //

CREATE PROCEDURE GETALLLOAISP() BEGIN  
	SELECT
	    MaLoai,
	    MaLoai_Cha,
	    TenLoai,
	    TrangThai
	FROM loaisanpham;
	END// 


DELIMITER ;

-- Gọi proc

call getAllLoaiSP;

-- Hiển thị tất cả tài khoản theo id

DELIMITER //

CREATE PROCEDURE GETALLLOAISPBYID(IN MALOAISP INT) 
BEGIN  
	SELECT
	    MaLoai,
	    MaLoai_Cha,
	    TenLoai,
	    TrangThai
	FROM LoaiSanPham
	WHERE MaLoai = MaLoaiSP;
	END// 


DELIMITER ;

-- Gọi proc

call getAllLoaiSPbyId(2);

-- Hiện tất cả Loại Sản Phẩm trạng thái theo trang thái

CREATE PROCEDURE GETALLLOAISPPASS(IN TRANGTHAISP INT
) BEGIN  
	
	SELECT
	    MaLoai_Cha,
	    TenLoai,
	    TrangThai
	FROM LoaiSanPham
	WHERE TrangThai = TrangThaiSP
END// 


DELIMITER ;call getAllLoaiSPPASS(1);

-- Thêm tài khoản

DELIMITER //

CREATE PROCEDURE CREATEORUPDATELOAISP(IN MALOAI_CHASP 
INT, IN TENLOAISP VARCHAR(250), IN TRANGTHAISP INT
) BEGIN  
	 DECLARE existingCount INT;
	-- Kiểm tra xem tài khoản đã tồn tại trong bảng chưa
	SELECT
	    COUNT(*) INTO existingCount
	FROM loaisanpham
	WHERE TenLoai = TenLoaiSP;
	IF existingCount > 0 THEN -- Nếu tài khoản đã tồn tại, cập nhật thông tin
	UPDATE loaisanpham
	SET
	    MaLoai_Cha = MaLoai_ChaSP,
	    TrangThai = TrangThaiSP
	WHERE TenLoai = TenLoaiSP;
	ELSE -- Nếu tài khoản chưa tồn tại, thêm mới
	INSERT INTO
	    loaisanpham (MaLoai_Cha, TenLoai, TrangThai)
	VALUES (
	        MaLoai_ChaSP,
	        TenLoaiSP,
	        TrangThaiSP
	    );
	END IF;
	END// 


DELIMITER ;

DROP PROCEDURE createOrUpdateLoaiSP;

-- Gọi proc

CALL createOrUpdateLoaiSP(null, 'Phan', 0);

SELECT * FROM loaisanpham 

-- Sửa Loại sản phẩm

DELIMITER //

CREATE PROCEDURE UPDATELOAISPBYID(IN MALOAISP INT, 
IN MALOAI_CHASP INT, IN TENLOAISP VARCHAR(250), IN 
TRANGTHAISP INT) BEGIN  
	
	UPDATE loaisanpham
	SET
	    MaLoai_Cha = MaLoai_ChaSP,
	    TenLoai = TenLoaiSP,
	    TrangThai = TrangThaiSP
	WHERE MaLoai = MaLoaiSP;
	END // 


DELIMITER ;

drop PROCEDURE updateLoaiSPById;

CALL
    updateLoaiSPById(
        1,
        -- Thay thế bằng giá trị thực tế cho MaLoaiSP
        null,
        -- Thay thế bằng giá trị thực tế cho MaLoai_ChaSP
        'Tên Loại Sản Phẩm',
        -- Thay thế bằng giá trị thực tế cho TenLoaiSP
        1 -- Thay thế bằng giá trị thực tế cho TrangThaiSP
    );

-- Sửa Loại Sản Phẩm

DELIMITER //

CREATE PROCEDURE DELETELOAISPBYID(IN MALOAISP INT) 
BEGIN 
DELETE 
	FROM loaisanpham WHERE MaLoai = MaLoaiSP;
	END // 


DELIMITER ;

-- --Check đăng nhập

DELIMITER //

CREATE PROCEDURE CHECKLOGIN(IN ACC VARCHAR(100)) BEGIN  
	select
	    MaTaiKhoan,
	    TaiKhoan,
	    MatKhau
	from taikhoan
	where TaiKhoan = Acc;
	END // 


DELIMITER ;

-- use shop;
call checkLogin('phan3');

alter VIEW viewTK_NV AS
SELECT 
	tk.MaTaiKhoan,
    tk.MaNhanVien, 
    nv.HoTen,
    tk.TaiKhoan, 
    tk.MatKhau, 
    tk.NgayBatDau,
    tk.NgayKetThuc,
    tk.TrangThai,
    tk.LoaiQuyen
FROM taikhoan tk 
inner join nhanvien nv;


