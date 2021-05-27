exports.get = function(req,res){
    let page = {'page':'assetp1','title':'ข้อมูล'};
    checkToken(req,res,page);
};
exports.post = function (req,res) {
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    tokenVerify(hhcFunc.getCookie(req,'token'),function(err,patient){
        if(!hhcFunc.isEmpty(patient)){
            if(req.body.method == 'searchAssetp'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }
                    connection.query( "SELECT *,1 as edit from assetp1; ",
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
            }else if(req.body.method == 'saveNewPatient'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }
                    connection.query( "INSERT INTO assetp1 (assetpat_id, asset_date, asset_time, asset_body, asset_tem, asset_hrate, asset_regular, asset_irregular, ) VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?);",
                        [req.body.assetpat_id, req.body.asset_date, req.body.asset_time, req.body.asset_body, req.body.asset_tem, req.body.asset_hrate, req.body.asset_regular, req.body.asset_irregular ] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกแบบประเมิณสำเร็จ"
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
            }else if(req.body.method == 'searchAssetp1ById'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query( "SELECT *,1 as edit from assetp1 us where us.assetp_id = ?; ",
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
    tokenVerify(hhcFunc.getCookie(req, 'token'), function (err, patient) {
        if (!hhcFunc.isEmpty(patient)) {
            if (req.body.method == 'saveUpdateAssetp1') {
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query(
                        " UPDATE hhc.assetp1 "+
                        " SET "+
                        " assetpat_id = ?, "+
                        " asset_date = ?, "+
                        " asset_time = ?, "+
                        " asset_body = ?, "+
                        " asset_tem = ?, "+
                        " asset_hrate = ?, "+
                        " asset_regular = ?, "+
                        " asset_irregular = ? "+
                        " WHERE assetp_id = ?; ",
                        [req.body.editassetpat_id,req.body.editasset_date,req.body.editasset_time,req.body.editasset_body,req.body.editasset_tem,req.body.editasset_hrate,req.body.editasset_regular,req.body.editasset_irregular, Number(req.body.assetp_id)] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกผู้ป่วยสำเร็จ"
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
// exports.post = function (req,res) {
//     let obj = new Object();
//     obj.message = '';
//     obj.status = false;
//     tokenVerify(hhcFunc.getCookie(req,'token'),function(err,patient){
//         if(!hhcFunc.isEmpty(patient)){
//             if(req.body.method == 'saveNewPatient'){
//                 pool.getConnection(function(err,connection){
//                     if (err) {
//                         res.json({"code" : 100, "status" : "Error in connection database"});
//                         return;
//                     }
//
//                     connection.query( "SELECT count(1) as num from patient_info m where m.pa_treatment = ?; ", //เลือกตารางที่ใช้ในการ Check ID_CARD
//                         [ req.body.paTreatment ] , function(err, rows, fields) {
//                             if(!err) {
//                                 if(rows[0].num >0){
//                                     obj.message = 'มี ID_CARD นี้แล้ว';
//                                     res.json(obj);
//                                     return;
//                                 }else{
//                                     connection.query( "INSERT INTO patient_info (pa_treatment) values ( ? )", //เลือกตารางที่ใช้ในการ Check ID_CARD
//                                         [ req.body.paTreatment ] , function(err, rows, fields) {
//                                             if(!err) {
//                                                 obj.data = rows;
//                                                 obj.status = true
//                                                 obj.message = "Save Success.";
//                                                 res.json(obj);
//                                                 return;
//                                             }else {
//                                                 obj.message = 'Error , please contact admin.';
//                                                 res.json(obj);
//                                                 return;
//                                             }
//                                         });
//
//                                     connection.on('error', function(err) {
//                                         res.json({"code" : 100, "status" : "Error in connection database"});
//                                         return;
//                                     });
//                                 }
//                             }else {
//                                 obj.message = 'Error , please contact admin.';
//                                 res.json(obj);
//                                 return;
//                             }
//                         });
//
//                     connection.on('error', function(err) {
//                         res.json({"code" : 100, "status" : "Error in connection database"});
//                         return;
//                     });
//                 });
//             }else if(req.body.method == "searchPatient"){
//                 pool.getConnection(function(err,connection){
//                     if (err) {
//                         res.json({"code" : 100, "status" : "Error in connection database"});
//                         return;
//                     }
//
//                     connection.query( "SELECT *, 1 as edit from patient_info; ", //เลือกตารางที่ใช้ในการ Check ID_CARD
//                         [ req.body.paTreatment ] , function(err, rows, fields) {
//                             if(!err) {
//                                 obj.data = rows;
//                                 obj.status = true
//                                 //obj.message = "Save Success.";
//                                 res.json(obj);
//                                 return;
//                             }else {
//                                 obj.message = 'Error , please contact admin.';
//                                 res.json(obj);
//                                 return;
//                             }
//                         });
//
//                     connection.on('error', function(err) {
//                         res.json({"code" : 100, "status" : "Error in connection database"});
//                         return;
//                     });
//                 });
//             }else{
//                 obj.message = "Not have Method..";
//                 res.json(obj);
//                 return;
//             }
//
//         }else{
//             obj.message = "Access Denied.";
//             res.json(obj);
//             return;
//         }
//     })
// };
//
//
//
