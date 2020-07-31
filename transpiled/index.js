require('babel-register');
//require("@babel/register");
require('../src/index');
require('../src/middleware/auth.js');
require('../src/models/user');
require('../src/routers/user');
//require('../src/controllers/user');