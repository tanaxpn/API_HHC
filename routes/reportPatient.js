exports.get = function(req,res){
    let page = {'page':'reportPatient','title':'รายงานผู้ป่วย'};
    checkToken(req,res,page);
};
exports.post = function (req,res) {
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    tokenVerify(hhcFunc.getCookie(req,'token'),function(err,patient){
        if(!hhcFunc.isEmpty(patient)){
            if(req.body.method == 'reportPatient'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }
                    let where = '';
                    let m = 'ชาย';
                    let f = 'หญิง';
                    if(req.body.type === 'M'){
                        where = ' WHERE pa_gender = "'+ m +'"';
                    }else if(req.body.type === 'F'){
                        where = ' WHERE pa_gender = "'+ f +'"';
                    }
                    connection.query( "select count(1) as 'count' from patient_info "+where,
                        [] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows[0];
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
