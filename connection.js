const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phanthanhcong29032002@',
    database: 'shop'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Kết nối cơ sở dữ liệu thành công');
});

module.exports = db;