const apiRoute = require('./routes/api/api');
module.exports = function(app){
    const version = '1.0.0'
    const path = '/api/'+version;

    app.post(path+'/assetp1', apiRoute.assetp1.save);
}

const { data } = require("jquery");
var api = require("./routes/api/api");
module.exports = function (app) {
  const path = "/api";

  const userPath = "/api/user"
  const villagePath = "/api/village"
  const homePath = "/api/home"
  const barthelPath = "/api/barthel"
  const personPath = "/api/person"
  const assetPart1 = "/api/assetP1"
  const assetPart2 = "/api/assetP2"

  
  app.get(homePath +"/getAll", function (req, res) {
    let obj = {};
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query("SELECT * FROM home ", [], function (err, rows, fields) {
        console.log("result",rows);

        if (!err) {
          if (rows.length > 0) {
            obj.data = rows; 
            obj.success = true;
            obj.message = "successful";
          } else {
            obj.data = [];
            obj.success = false;
            obj.message = "Not found";
          }
          console.log(rows);
    
          res.json(obj);
          return;
        } else {
          obj.message = "Error , please contact admin.";
          res.json(obj.message);
          return;
        }
      });

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });

  app.get(homePath + "/:id", function (req, res) {
    let obj = {};
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query(
        "SELECT * FROM home where ho_id = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              obj.data = rows[0];
              obj.success = true;
              obj.message = "successful";
            } else {
              obj.data = [];
              obj.success = false;
              obj.message = "Not found";
            }
            res.json(rows);
            return;
          } else {
            obj.message = "Error , please contact admin.";
            res.json(obj);
            return;
          }
        }
      );

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });

  app.delete(homePath + "/delete/:id", (req, res) => {

    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query(
        "DELETE FROM home WHERE ho_id =?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            res.send("data has been deleted");
          } else {
            res.send("can not delete");
            return;
          }
        }
      );
    });
  });

  app.post(homePath + "/add", (req, res) => {
    const payload = req.body
    res.json(payload)
  })

  app.put(homePath + "/edit/:id", (req, res) => {
    const { id } = req.params
    res.json({ id })
  })


  //Barthel Zone

  app.get(barthelPath +"/getAll", function (req, res) {
    let obj = {};
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query("SELECT * FROM barthel ", [], function (err, rows, fields) {
        console.log("result",rows);

        if (!err) {
          if (rows.length > 0) {
            obj.data = rows; 
            obj.success = true;
            obj.message = "successful";
          } else {
            obj.data = [];
            obj.success = false;
            obj.message = "Not found";
          }
          console.log(rows);
    
          res.json(obj);
          return;
        } else {
          obj.message = "Error , please contact admin.";
          res.json(obj.message);
          return;
        }
      });

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });

  app.get(barthelPath + "/:id", function (req, res) {
    let obj = {};
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query(
        "SELECT * FROM barthel where barthel_id = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              obj.data = rows[0];
              obj.success = true;
              obj.message = "successful";
            } else {
              obj.data = [];
              obj.success = false;
              obj.message = "Not found";
            }
            res.json(rows);
            return;
          } else {
            obj.message = "Error , please contact admin.";
            res.json(obj);
            return;
          }
        }
      );

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });

  // app.post(barthelPath + "/add", (req, res) => {
  //   barthel.push(req.body)
  //   res.status(201).json(reqbody)
  // })

  // app.post(barthelPath + "/add", urlencodedParser, function(req, res){
  //   console.log(req.body);      // your JSON
  //   res.render('data', {qs:req.query});    // echo the result back
  // });
  

  app.post(barthelPath + "/add" , function (req,res) {
    console.log("มาาาาาา");
    let obj = {};
    const pat_id = req.body.pats_id
    const score = req.body.barthel_score
    const date = req.body.barthel_date

    console.log("pats id="+pat_id +" score ="+score+ " date" +date);
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query( "INSERT INTO barthel ( pats_id, barthel_score, barthel_date) VALUES ( ?, ?, ?) ; ",
                        [pat_id,score,date] , function(err, rows, fields) {
                            if(!err) {
                                obj.data = rows;
                                obj.status = true
                                obj.message = "บันทึกคะแนนสำเร็จ"
                                res.json(obj);
                                return;
                            }else {
                                obj.message = err;
                                res.json(obj);
                                return;
                            }
                        });

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });


  app.patch(barthelPath + "/edit/:id" , function (req,res) {
    let obj = {};
    obj.status = false;
    pool.getConnection(function (err, connection) {
      if (err) {
        // connection.release();
        console.log("[mysql error]", err);
        res.json({ code: 100, status: "Error in connection database" });
        return;
      }
      connection.query(
        " UPDATE hhc.barthel "+
        " SET "+
        " pats_id = ?, "+
        " barthel_score = ? "+
        " WHERE barthel_id = ?; ",
        [req.body.editPaId,req.body.editbarScore,req.params.id] , function(err, rows, fields) {
            if(!err) {
                obj.data = rows;
                obj.status = true
                obj.message = "แก้ไขสำเร็จ"
                res.json(obj);
                return;
            }else {
                obj.message = err;
                res.json(obj);
                return;
            }
        });

      connection.on("error", function (err) {
        res.json({ code: 100, status: "Error in connection database" });
        return;
      });
    });
  });

////////////////////Village Path///////////////////

app.get(villagePath +"/getAll", function (req, res) {
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * FROM village ", [], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(villagePath +"/getAllHome/:homename", function (req, res) {
  const {homename}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * From hhc.home inner join hhc.village on home.ho_village = village.village_name WHERE home.ho_village = '"+homename+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(villagePath + "/:id", function (req, res) {
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query(
      "SELECT * FROM village where village_id = ?",
      [req.params.id],
      function (err, rows, fields) {
        if (!err) {
          if (rows.length > 0) {
            obj.data = rows[0];
            obj.success = true;
            obj.message = "successful";
          } else {
            obj.data = [];
            obj.success = false;
            obj.message = "Not found";
          }
          res.json(rows);
          return;
        } else {
          obj.message = "Error , please contact admin.";
          res.json(obj);
          return;
        }
      }
    );

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

// usename fetch ///

app.get(userPath +"/username", function (req, res) {
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT us_username,us_pass FROM user_info ", [], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});


//person
app.get(personPath +"/patient", function (req, res) {
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * FROM patient ", [], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

//patient name
app.get(personPath +"/getAllPerson/:IDhome", function (req, res) {
  const {IDhome}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * From hhc.patient inner join hhc.home on patient.pa_home_id = home.ho_id WHERE patient.pa_home_id = '"+IDhome+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(barthelPath +"/getAllbarthel/:IDbarthel", function (req, res) {
  const {IDbarthel}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * From hhc.barthel inner join hhc.patient on barthel.pats_id = patient.id WHERE barthel.pats_id = '"+IDbarthel+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

//asset form Part 1

app.get(assetPart1 +"/:assetp1ID", function (req, res) {
  const {assetp1ID}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * FROM hhc.assetp1 where asset_id = '"+assetp1ID+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(assetPart1 +"/getRoundassetP1/:assetp1", function (req, res) {
  const {assetp1}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT asset_id,asset_date From hhc.assetp1 inner join hhc.patient on assetp1.assetpat_id = patient.id WHERE assetp1.assetpat_id = '"+assetp1+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(assetPart1 +"/getassetP1/:assetp1", function (req, res) {
  const {assetp1}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * From hhc.assetp1 inner join hhc.patient on assetp1.assetpat_id = patient.id WHERE assetp1.assetpat_id = '"+assetp1+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});


app.post(assetPart1 + "/add" , function (req,res) {
  console.log("มาาาาาา");
  let obj = {};
  const apats_id = req.body.assetpat_id
  const date = req.body.asset_date
  const time = req.body.asset_time
  const body = req.body.asset_body
  const tem = req.body.asset_tem
  const hrate = req.body.asset_hrate
  const regucheck = req.body.asset_regular
  const irrecheck = req.body.asset_irregular
  const otherregu = req.body.asset_other_regular
  const breathe = req.body.asset_breathe
  const normal = req.body.asset_normal
  const gasp = req.body.asset_gasp
  const dry = req.body.asset_dry
  const wet = req.body.asset_wet
  const othercheck = req.body.asset_othercheck
  const other = req.body.asset_other
  const blood = req.body.asset_blood
  const weight = req.body.asset_weight
  const tall = req.body.asset_tall
  const bmi = req.body.asset_bmi

  console.log("เข้ามาแล้วแหละ" + apats_id);
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query( "INSERT INTO assetp1 ( assetpat_id, asset_date, asset_time, asset_body, asset_tem, asset_hrate, asset_regular, asset_irregular, asset_other_regular, asset_breathe, asset_normal, asset_gasp, asset_dry, asset_wet, asset_othercheck, asset_other, asset_blood, asset_weight, asset_tall, asset_bmi) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ; ",
                      [apats_id,date,time,body,tem,hrate,regucheck,irrecheck,otherregu,breathe,normal,gasp,dry,wet,othercheck,other,blood,weight,tall,bmi] , function(err, rows, fields) {
                          if(!err) {
                              obj.data = rows;
                              obj.status = true
                              obj.message = "บันทึกคะแนนสำเร็จ"
                              res.json(obj);
                              return;
                          }else {
                              obj.message = err;
                              res.json(obj);
                              return;
                          }
                      });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

//asset form Part 2 มี 93 อันนะทำตาเหลือกแน่ๆไอ่เวร แค่คิดก็ท้อแล้ว

app.get(assetPart2 +"/:assetp2ID", function (req, res) {
  const {assetp2ID}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * FROM hhc.assetp2 where assetp2_id = '"+assetp2ID+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});


app.get(assetPart2 +"/getRoundassetP2/:assetp2", function (req, res) {
  const {assetp2}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT assetp2_id,assetp2_date From hhc.assetp2 inner join hhc.patient on assetp2.assetpats_id = patient.id WHERE assetp2.assetpats_id = '"+assetp2+"'", [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.get(assetPart2 +"/getassetP2/:assetp2", function (req, res) {
  const {assetp2}  = req.params
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query("SELECT * From hhc.assetp2 inner join hhc.patient on assetp2.assetpats_id = patient.id WHERE assetp2.assetpats_id = '"+assetp2+"'" , [req.params], function (err, rows, fields) {
      console.log("result",rows);

      if (!err) {
        if (rows.length > 0) {
          obj.data = rows; 
          obj.success = true;
          obj.message = "successful";
        } else {
          obj.data = [];
          obj.success = false;
          obj.message = "Not found";
        }
        console.log(rows);
  
        res.json(obj);
        return;
      } else {
        obj.message = "Error , please contact admin.";
        res.json(obj.message);
        return;
      }
    });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

app.post(assetPart2 + "/add" , function (req,res) {
  console.log("กุล่ะอย่างปวดหัว");
  let obj = {};
  const a2pats_id = req.body.assetpats_id // 1
  const assetp2_date = req.body.assetp2_date //2
  const assetp2_time = req.body.assetp2_time //3
  const dis_normal = req.body.assetp2_dis_normal //4
  const dis_unnormal = req.body.assetp2_dis_unnormal //5
  const dis_other = req.body.assetp2_dis_other //6
  const weak_normal = req.body.assetp2_weak_normal //7
  const weak_unnormal = req.body.assetp2_weak_unnormal //8
  const weak_other = req.body.assetp2_weak_other //9
  const foot_none = req.body.assetp2_foot_none
  const foot_have = req.body.assetp2_foot_have
  const foot_other = req.body.assetp2_foot_other
  const wound_normal = req.body.assetp2_wound_normal //10
  const wound_unnormal = req.body.assetp2_wound_unnormal //11
  const wound_other = req.body.assetp2_wound_other // 12
  const pain_normal = req.body.assetp2_pain_normal //13
  const pain_unnormal = req.body.assetp2_pain_unnormal // 14
  const pain_other = req.body.assetp2_pain_other //15
  const pain_hurt = req.body.assetp2_pain_hurt //16
  const pain_tolerable = req.body.assetp2_pain_tolerable //17
  const pain_usedrug = req.body.assetp2_pain_usedrug //18
  const head_normal = req.body.assetp2_head_normal //19
  const head_sometime = req.body.assetp2_head_sometime //20
  const head_always = req.body.assetp2_head_always//21
  const head_have = req.body.assetp2_head_have//22
  const head_other = req.body.assetp2_head_other//23
  const head_hurt = req.body.assetp2_head_hurt//24
  const head_tolerable = req.body.assetp2_head_tolerable//25
  const head_usedrug = req.body.assetp2_head_usedrug//26
  const swell_normal = req.body.assetp2_swell_normal//27
  const swell_unnormal = req.body.assetp2_swell_unnormal//28
  const rod_normal = req.body.assetp2_rod_normal//29
  const rod_unnormal = req.body.assetp2_rod_unnormal//30
  const rod_other = req.body.assetp2_rod_other//31
  const eye_uncheck = req.body.assetp2_eye_uncheck//32
  const eye_check = req.body.assetp2_eye_check//33
  const eye_normal = req.body.assetp2_eye_normal//34
  const eye_unnormal = req.body.assetp2_eye_unnormal//35
  const eye_other = req.body.assetp2_eye_other//36
  const complicate_normal = req.body.assetp2_complicate_normal//37
  const complicate_unnormal = req.body.assetp2_complicate_unnormal//38
  const complicate_other = req.body.assetp2_complicate_other//39
  const eat_normal = req.body.assetp2_eat_normal//40
  const eat_unnormal = req.body.assetp2_eat_unnormal//41
  const eat_other = req.body.assetp2_eat_other//42
  const excrete_normal = req.body.assetp2_excrete_normal//43
  const excrete_unnormal = req.body.assetp2_excrete_unnormal//44
  const risk_fats = req.body.assetp2_risk_fats//45
  const risk_fatinblood = req.body.assetp2_risk_fatinblood//46
  const risk_unexercise = req.body.assetp2_risk_unexercise//47
  const risk_smoking = req.body.assetp2_risk_smoking//48
  const risk_alcohol = req.body.assetp2_risk_alcohol//49
  const risk_stress = req.body.assetp2_risk_stress//50
  const risk_other = req.body.assetp2_risk_other//51
  const risk_otherbe = req.body.assetp2_risk_otherbe
  const drug_1 = req.body.assetp2_drug_1//52
  const drug_2 = req.body.assetp2_drug_2//53
  const drug_3 = req.body.assetp2_drug_3//54
  const drug_4 = req.body.assetp2_drug_4//55
  const drug_5 = req.body.assetp2_drug_5//56
  const drug_6 = req.body.assetp2_drug_6//57
  const drug_correct = req.body.assetp2_drug_correct//58
  const drug_wrong = req.body.assetp2_drug_wrong//59
  const drug_wrongbe = req.body.assetp2_drug_wrongbe//60
  const problemdrug_1 = req.body.assetp2_problemdrug_1//61
  const problemdrug_2 = req.body.assetp2_problemdrug_2//62
  const problemdrug_3 = req.body.assetp2_problemdrug_3//63
  const problemdrug_4 = req.body.assetp2_problemdrug_4//64
  const problemdrug_5 = req.body.assetp2_problemdrug_5//65
  const problemdrug_6 = req.body.assetp2_problemdrug_6//66
  const problemdrug_7 = req.body.assetp2_problemdrug_7//67
  const problemdrug_other = req.body.assetp2_problemdrug_other//68
  const lab_none = req.body.assetp2_lab_none//69
  const lab_have = req.body.assetp2_lab_have//70
  const lab_other = req.body.assetp2_lab_other//
  const lab_fbs = req.body.assetp2_lab_fbs//71
  const lab_other1 = req.body.assetp2_lab_other1//72
  const lab_other2 = req.body.assetp2_lab_other2//73
  const medequipment_none = req.body.assetp2_medequipment_none//74
  const medequipment_have = req.body.assetp2_medequipment_have//75
  const medequipment_havebecaz = req.body.assetp2_medequipment_havebecaz//76
  const emote_none = req.body.assetp2_emote_none//77
  const emote_changing = req.body.assetp2_emote_changing//78
  const emote_other = req.body.assetp2_emote_other//79
  const emote_otherbe = req.body.assetp2_emote_otherbe//80
  const social_none = req.body.assetp2_social_none//81
  const social_have = req.body.assetp2_social_have//82
  const social_other = req.body.assetp2_social_other//83
  const financial_none = req.body.assetp2_financial_none//84
  const financial_have = req.body.assetp2_financial_have//85
  const financial_other = req.body.assetp2_financial_other//86
  const meet_always = req.body.assetp2_meet_always//87
  const meet_none = req.body.assetp2_meet_none//88
  const meet_other = req.body.assetp2_meet_other//89
  const note = req.body.assetp2_note//90
  const meeting = req.body.assetp2_meeting//91
  const assessor1 = req.body.assetp2_assessor1//92
  const assessor2 = req.body.assetp2_assessor2//93


  console.log("เข้ามาแล้วแหละ" + a2pats_id);
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query( "INSERT INTO assetp2 ( assetpats_id, assetp2_date, assetp2_time, assetp2_dis_normal, assetp2_dis_unnormal, assetp2_dis_other, assetp2_weak_normal, assetp2_weak_unnormal, assetp2_weak_other,assetp2_foot_none,assetp2_foot_have,assetp2_foot_other, assetp2_wound_normal, assetp2_wound_unnormal, assetp2_wound_other, assetp2_pain_normal, assetp2_pain_unnormal, assetp2_pain_other, assetp2_pain_hurt, assetp2_pain_tolerable, assetp2_pain_usedrug, assetp2_head_normal, assetp2_head_sometime, assetp2_head_always, assetp2_head_have, assetp2_head_other, assetp2_head_hurt,assetp2_head_tolerable,assetp2_head_usedrug,assetp2_swell_normal,assetp2_swell_unnormal,assetp2_rod_normal,assetp2_rod_unnormal,assetp2_rod_other,assetp2_eye_uncheck,assetp2_eye_check,assetp2_eye_normal,assetp2_eye_unnormal,assetp2_eye_other,assetp2_complicate_normal,assetp2_complicate_unnormal,assetp2_complicate_other,assetp2_eat_normal,assetp2_eat_unnormal,assetp2_eat_other,assetp2_excrete_normal,assetp2_excrete_unnormal,assetp2_risk_fats,assetp2_risk_fatinblood,assetp2_risk_unexercise,assetp2_risk_smoking,assetp2_risk_alcohol,assetp2_risk_stress,assetp2_risk_other,assetp2_risk_otherbe,assetp2_drug_1,assetp2_drug_2,assetp2_drug_3,assetp2_drug_4,assetp2_drug_5,assetp2_drug_6,assetp2_drug_correct,assetp2_drug_wrong,assetp2_drug_wrongbe,assetp2_problemdrug_1,assetp2_problemdrug_2,assetp2_problemdrug_3,assetp2_problemdrug_4,assetp2_problemdrug_5,assetp2_problemdrug_6,assetp2_problemdrug_7,assetp2_problemdrug_other,assetp2_lab_none,assetp2_lab_have,assetp2_lab_other,assetp2_lab_fbs,assetp2_lab_other1,assetp2_lab_other2,assetp2_medequipment_none,assetp2_medequipment_have,assetp2_medequipment_havebecaz,assetp2_emote_none,assetp2_emote_changing,assetp2_emote_other,assetp2_emote_otherbe,assetp2_social_none,assetp2_social_have,assetp2_social_other,assetp2_financial_none,assetp2_financial_have,assetp2_financial_other,assetp2_meet_always,assetp2_meet_none,assetp2_meet_other,assetp2_note,assetp2_meeting,assetp2_assessor1,assetp2_assessor2 ) VALUES ( ?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?) ; ",
                      [a2pats_id,assetp2_date,assetp2_time,dis_normal,dis_unnormal,dis_other,weak_normal,weak_unnormal,weak_other,foot_none,foot_have,foot_other,wound_normal,wound_unnormal,wound_other,pain_normal,pain_unnormal,pain_other,pain_hurt,pain_tolerable,pain_usedrug,head_normal,head_sometime,head_always,head_have,head_other,head_hurt,head_tolerable,head_usedrug,swell_normal,swell_unnormal,rod_normal,rod_unnormal,rod_other,eye_uncheck,eye_check,eye_normal,eye_unnormal,eye_other,complicate_normal,complicate_unnormal,complicate_other,eat_normal,eat_unnormal,eat_other,excrete_normal,excrete_unnormal,risk_fats,risk_fatinblood,risk_unexercise,risk_smoking,risk_alcohol,risk_stress,risk_other,risk_otherbe,drug_1,drug_2,drug_3,drug_4,drug_5,drug_6,drug_correct,drug_wrong,drug_wrongbe,problemdrug_1,problemdrug_2,problemdrug_3,problemdrug_4,problemdrug_5,problemdrug_6,problemdrug_7,problemdrug_other,lab_none,lab_have,lab_other,lab_fbs,lab_other1,lab_other2,medequipment_none,medequipment_have,medequipment_havebecaz,emote_none,emote_changing,emote_other,emote_otherbe,social_none,social_have,social_other,financial_none,financial_have,financial_other,meet_always,meet_none,meet_other,note,meeting,assessor1,assessor2] , function(err, rows, fields) {
                          if(!err) {
                              obj.data = rows;
                              obj.status = true
                              obj.message = "บันทึกคะแนนสำเร็จ"
                              res.json(obj);
                              return;
                          }else {
                              obj.message = err;
                              res.json(obj);
                              return;
                          }
                      });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

//Edit mapping
app.patch(homePath + "/edit/:id" , function (req,res) {
  console.log("เข้ามาแล้วอิดอก")
  let obj = {};
  obj.status = false;
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      console.log("[mysql error]", err);
      res.json({ code: 100, status: "Error in connection database" });
      return;
    }
    connection.query(
      " UPDATE hhc.home "+
      " SET "+
      " ho_lat = ?, "+
      " ho_long = ? "+
      " WHERE ho_id = ?; ",
      [req.body.editholat,req.body.editholong,req.params.id] , function(err, rows, fields) {
          if(!err) {
              obj.data = rows;
              obj.status = true
              obj.message = "แก้ไขสำเร็จ"
              res.json(obj);
              return;
          }else {
              obj.message = err;
              res.json(obj);
              return;
          }
      });

    connection.on("error", function (err) {
      res.json({ code: 100, status: "Error in connection database" });
      return;
    });
  });
});

}


