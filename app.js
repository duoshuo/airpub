//    ____ ___  __  ______ _
//   / __ `__ \/ / / / __ `/
//  / / / / / / /_/ / /_/ / 
// /_/ /_/ /_/\__,_/\__,_/  
// 
// @brief  : the missing blog platform built upon love
// @author : [turingou](http://guoyu.me)

var server = require('express-scaffold'),
    configs = require('./configs/app.json'),
    routes = require('./routes/index'),
    ctrlers = require('./ctrlers/index'),
    models = require('./models/index');

// create mua server
new server(configs)
    .models(models)
    .ctrlers(ctrlers)
    .routes(routes)
    .run();