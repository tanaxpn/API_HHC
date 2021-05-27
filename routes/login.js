exports.get = function(req,res){
    res.render('login',{title:'Login'});
};

exports.check = function(req,res){
    var obj = new Object();
    obj.message = '';
    obj.success = false;

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }
        console.log(sha1(req.body.password))
        connection.query( "SELECT * FROM user_info WHERE us_username = ? AND us_pass = ? AND us_active = 1 ",
            [ req.body.username,sha1(req.body.password) ] , function(err, rows, fields) {
                if(!err) {
                    if(rows.length > 0){
                        let token = jwt.sign({userCode:req.body.username,userName:rows[0].us_username ,loginStatus:true,userStatus:rows[0].us_user_type,date:Number(new Date())},'secrethhc'
                            // , { expiresIn: 1 }
                        );
                        obj.success = true;
                        obj.message = 'successful';
                        res.cookie('token',token);
                        console.log(req.body.username+' login - connected as id : ' + connection.threadId);
                    }else{
                        obj.success = false;
                        obj.message = 'Username or Password not valid';
                    }
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
};