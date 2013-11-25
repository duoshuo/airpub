var md5 = require('../libs/md5'),
    mail = require('../libs/mail'),
    creator = require('../configs/app.json').creator;

exports.in = function(req, res, next) {
    if (!req.session.user) {
        res.render('sign/signin');
    } else {
        res.redirect('/');
    }
}

exports.up = function(req, res, next) {
    if (!req.session.user) {
        res.render('sign/signup');
    } else {
        res.redirect('/');
    }
}

exports.create = function($ctrlers) {
    return function(req, res, next) {
        if (!req.session.user) {
            var baby = req.body.user;
            if (baby) {
                $ctrlers.user.findOne({
                    email: baby.email
                }, function(err, u) {
                    if (!err) {
                        if (!u) {
                            baby.password = md5(baby.password);
                            baby.avatarHash = md5(baby.email);
                            if (creators && creator === baby.email) baby.type = 'creator';
                            $ctrlers.user.create(baby, function(err, baby) {
                                if (!err) {
                                    req.session.user = baby;
                                    res.json({
                                        stat: 'ok'
                                    });
                                } else {
                                    next(err);
                                }
                            })
                        } else {
                            res.json({
                                stat: 'fail',
                                msg: '您的账户已经注册，请直接登录'
                            });
                        }
                    } else {
                        next(err);
                    }
                })
            } else {
                next(new Error('params required'))
            }
        } else {
            next(new Error('authed user required'))
        }
    }
}

exports.login = function($ctrlers) {
    return function(req, res, next) {
        if (!req.session.user) {
            if (req.body.email && req.body.password) {
                $ctrlers.user.findOne({
                    email: req.body.email
                }, function(err, u) {
                    if (!err) {
                        if (u) {
                            if (md5(req.body.password) == u.password) {
                                req.session.user = u;
                                res.json({
                                    stat: 'ok'
                                });
                            } else {
                                res.json({
                                    stat: 'fail',
                                    msg: '登录出错，请检查用户邮箱与密码'
                                });
                            }
                        } else {
                            res.json({
                                stat: 'fail',
                                msg: '登录出错，没有找到这个账户'
                            })
                        }
                    } else {
                        next(err);
                    }
                })
            } else {
                next(new Error('params required'))
            }
        } else {
            next(new Error('already signined'))
        }
    }
}

exports.password = function(req, res, next) {
    mail('mails-flat/message', {
        title: "重置您的密码",
        subtitle: "如果是您发起的注册请求，请点击下方按钮确认；如果不是您发起的请求，请忽略这封邮件。",
    }, function(err, result) {
        if (!err) {
            res.json({
                stat: 'ok',
                msg: '重置密码邮件已发送到您的邮箱，请查收后点击确认链接完成重置'
            });
        } else {
            res.json({
                stat: 'fail',
                msg: '邮件发送失败，请稍后再试试'
            })
        }
    });
}