var Server = require('./app').server;

new Server({
    name: 'mua', // 站点名称
    url: 'http://mua.io', // 站点url
    desc: 'the missing blog system for geek and coder', // 站点描述
    database: {
        name: 'mua'
    },
    duoshuo: { 
        short_name: 'candydemo', // 多说 short_name
        secret: '055834753bf452f248602e26221a8345' // 多说 secret
    }
}).run();