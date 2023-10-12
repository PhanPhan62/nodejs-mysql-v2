# Muốn chạy dự án, thực hiện các bước
## 1. Chạy cơ sở dữ liệu mysql bằng WorkBench hoặc xampp
    - Nếu quên mật khẩu workbench hãy chạy câu lệnh 
    ALTER USER 'tên_người_dùng'@'localhost' IDENTIFIED BY 'mật_khẩu_mới';
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'Phanthanhcong29032002@';
## 2. cài đặt package
    npm install
    npm bcrypt, body-parser, ejs, express, express-handlebars handlebars, hbs, mysql, mysql2, sequelize
## 3. vào file package.json, tìm đến dòng dưới đây và thêm cào file package.json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon app.js"
    },
## 4. chạy dự án bằng cách vào terminal thực thi câu lệnh 
    npm start