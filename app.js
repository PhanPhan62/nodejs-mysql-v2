const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const loaisanphamRoutes = require('./routes/loaisanphamRoutes');
const nhanvienRoute = require('./routes/nhanvienRoute');
const loginRoutes = require('./routes/loginRoute');
const menuRoutes = require('./routes/menuRoute');
const homePage = require('./routes/homePageRoute');
const DVT = require('./routes/DVTRoute');
const sanphamRoute = require('./routes/sanphamRoute');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
// Sử dụng express-session
app.use(session({
    secret: 'your-secret-key', // Thay 'your-secret-key' bằng một chuỗi bất kỳ
    resave: false,
    saveUninitialized: true,
}));

// app.use(methodOverride('_method'));

// Sử dụng express-flash
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', loginRoutes, nhanvienRoute, userRoutes, loaisanphamRoutes, menuRoutes, DVT, sanphamRoute);
app.use('/', homePage);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});