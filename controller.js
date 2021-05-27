const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const patientRoute = require('./routes/patient');
const assetpRoute = require('./routes/assetp1');
const reportPatientRoute = require('./routes/reportPatient');



module.exports = function(app){

    const indexPath = '/';
    app.get(indexPath,indexRoute.get);

    const patientPath = '/patient';
    app.get(patientPath, patientRoute.get);
    app.post(patientPath, patientRoute.post);
    app.patch(patientPath, patientRoute.patch);

    const assetpPath = '/assetp1';
    app.get(assetpPath, assetpRoute.get);
    app.post(assetpPath, assetpRoute.post);
    app.patch(assetpPath, assetpRoute.patch);


    const userPath = '/user';
    app.get(userPath, userRoute.get);
    app.post(userPath, userRoute.post);
    app.patch(userPath, userRoute.patch);


    const reportPatientPath = '/report_patient';
    app.get(reportPatientPath, reportPatientRoute.get);
    app.post(reportPatientPath, reportPatientRoute.post);

    const loginPath = '/login';
    const check_loginPath = '/check_login';
    app.get(loginPath, loginRoute.get);
    app.post(check_loginPath, loginRoute.check);

    const logoutPath = '/logout';
    app.get(logoutPath,function(req,res){
        res.cookie('token','');
        res.redirect('/login');
    });
};
