exports.get = function(req,res){
    let page = {'page':'user','title':'กำหนดผู้ใช้งาน'};
    checkToken(req,res,page);
};
exports.post = function (req,res) {
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    tokenVerify(hhcFunc.getCookie(req,'token'),function(err,user){
        if(!hhcFunc.isEmpty(user)){
            if(req.body.method == 'searchUser'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query( "SELECT *,1 as edit from user_info; ",
                        [] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "Search Success."
                                res.json(obj);
                                return;
                            }else {
                                obj.message = 'Error , please contact admin.';
                                res.json(obj);
                                return;
                            }
                        });

                    connection.on('error', function(err) {
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    });
                });
            }else if(req.body.method == 'saveNewUser'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query( "INSERT INTO user_info (us_username, us_name, us_pass, us_email, us_phone, us_active, cr_by, cr_date, upd_by, upd_date) VALUES ( ?,?,?,?,?,1, ? ,NOW() , ?, NOW()) ; ",
                        [req.body.usUserName,req.body.usName,req.body.usPass,req.body.usEmail,req.body.usPhone,user.userName, user.userName] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกผู้ใช้งานใหม่ สำเร็จ"
                                res.json(obj);
                                return;
                            }else {
                                obj.message = err;
                                res.json(obj);
                                return;
                            }
                        });

                    connection.on('error', function(err) {
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    });
                });
            }else if(req.body.method == 'searchUserById'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query( "SELECT *,1 as edit from user_info us where us.id = ?; ",
                        [Number(req.body.id)] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows[0];
                                obj.status = true
                                res.json(obj);
                                return;
                            }else {
                                obj.message = 'Error , Not found this user. Please contact admin.';
                                res.json(obj);
                                return;
                            }
                        });

                    connection.on('error', function(err) {
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    });
                });
            }else{
                obj.message = "Not have Method.";
                res.json(obj);
                return;
            }
        }else{
            obj.message = "Access Denied.";
            res.json(obj);
            return;
        }
    })
};
exports.patch = function (req,res) {
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    tokenVerify(hhcFunc.getCookie(req, 'token'), function (err, user) {
        if (!hhcFunc.isEmpty(user)) {
            if (req.body.method == 'saveUpdateUser') {
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query(
                        " UPDATE hhc.user_info "+
                        " SET "+
                        " us_username = ?, "+
                        " us_name = ?, "+
                        " us_email = ?, "+
                        " us_phone = ?, "+
                        " upd_by = ?, "+
                        " upd_date = now() "+
                        " WHERE id = ?; ",
                        [req.body.editUsUserName,req.body.editUsName,req.body.editUsEmail,req.body.editUsPhone, user.userName,Number(req.body.id)] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกผู้ใช้งานใหม่ สำเร็จ"
                                res.json(obj);
                                return;
                            }else {
                                obj.message = err;
                                res.json(obj);
                                return;
                            }
                        });

                    connection.on('error', function(err) {
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    });
                });
            } else {
                obj.message = "Not have Method.";
                res.json(obj);
                return;
            }
        } else {
            obj.message = "Access Denied.";
            res.json(obj);
            return;
        }
    });
};