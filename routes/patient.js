exports.get = function(req,res){
    let page = {'page':'patient','title':'ผู้ป่วย'};
    checkToken(req,res,page);
};
exports.post = function (req,res) {
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    tokenVerify(hhcFunc.getCookie(req,'token'),function(err,patient){
        if(!hhcFunc.isEmpty(patient)){
            if(req.body.method == 'searchPatient'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }
                    connection.query( "SELECT *,1 as edit from patient_info; ",
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
                    connection.query( "INSERT INTO patient_info (pa_home_id, pa_name, pa_last_name, pa_gender, pa_age, pa_marital,pa_religion ,pa_treatment ,cr_by, cr_date, upd_by, upd_date) VALUES ( ?, ?, ?, ?, ?, ?,?,?,? ,NOW() , ?, NOW()) ; ",
                        [req.body.paHomeId,req.body.paName,req.body.paLastName,req.body.paGender,req.body.paAge,req.body.paMarital,req.body.paReligion,req.body.paTreatment,patient.userName, patient.userName] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกผู้ป่วยใหม่ สำเร็จ"
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
            }else if(req.body.method == 'searchPatientById'){
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query( "SELECT *,1 as edit from patient_info us where us.id = ?; ",
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
            if (req.body.method == 'saveUpdatePatient') {
                pool.getConnection(function(err,connection){
                    if (err) {
                        connection.release();
                        res.json({"code" : 100, "status" : "Error in connection database"});
                        return;
                    }

                    connection.query(
                        " UPDATE hhc.patient_info "+
                        " SET "+
                        " pa_home_id = ?, "+
                        " pa_name = ?, "+
                        " pa_last_name = ?, "+
                        " pa_gender = ?, "+
                        " pa_age = ?, "+
                        " pa_marital = ?, "+
                        " pa_religion = ?, "+
                        " pa_treatment = ?, "+
                        " upd_by = ?, "+
                        " upd_date = now() "+
                        " WHERE id = ?; ",
                        [req.body.editPaHomeId,req.body.editPaName,req.body.editPaLastName,req.body.editPaGender,req.body.editPaAge,req.body.editPaMarital,req.body.editPaReligion,req.body.editPaTreatment, patient.userName,Number(req.body.id)] , function(err, rows, fields) {
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
