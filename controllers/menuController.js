const db = require('../connection');

exports.showMenu = (req, res) => {

    db.query('select * from MenuAdmin', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            // res.status(200).json({ data: results });
            res.render('shared/admin/menu-left', { menu: results });
        }
    });
};