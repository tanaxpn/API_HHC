const operation = new Object();
operation.assetp1 = new Object();
operation.assetp1.save = function(req, res){
    let obj = new Object();
    obj.message = '';
    obj.status = false;
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        connection.query( "INSERT INTO assetp1 (assetpat_id, asset_date, asset_time, asset_body, asset_tem, asset_hrate, asset_regular, asset_irregular, asset_other_regular, asset_breathe, asset_normal, asset_gasp, asset_dry, asset_wet, asset_othercheck, asset_other, asset_blood, asset_weight, asset_tall, asset_bmi ) VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ? );",
            [req.body.assetpat_id, req.body.asset_date, req.body.asset_time, req.body.asset_body, req.body.asset_tem, req.body.asset_hrate, req.body.asset_regular, req.body.asset_irregular, req.body.asset_other_regular, req.body.asset_breathe, req.body.asset_normal, req.body.asset_gasp, req.body.asset_dry, req.body.asset_wet, req.body.asset_othercheck, req.body.asset_other, req.body.asset_blood, req.body.asset_weight, req.body.asset_tall, req.body.asset_bmi] , function(err, rows, fields) {
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
};

module.exports = operation;
