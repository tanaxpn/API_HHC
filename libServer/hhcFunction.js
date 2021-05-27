var HHC = new Object();
String.prototype.indexOfEnd = function(string) {
    var io = this.indexOf(string);
    return io == -1 ? -1 : io + string.length;
}
HHC.isEmpty = function(v){
    return v === null || v === undefined || v === '' || (_.isArray(v) && !v.length) || (_.isFunction(v.size) && v.size() === 0 );
};
HHC.getNow = function getDate(format,dateValue){
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var date = new Date();
    if(!HHC.isEmpty(dateValue)){
        date = dateValue;
    }
    var offset = new Date().getTimezoneOffset();
    offset += 420;
    var day = _.padStart(date.getDate(),2,'0');
    var month = _.padStart(date.getMonth()+1,2,'0');
    var year = date.getFullYear();
    var hourEdit = date.getHours()+Number(offset/60);
    if(hourEdit>=24){
        hourEdit -= 24;
    }
    var hour = addZero(hourEdit);
    var min = addZero(date.getMinutes());
    var sec = addZero(date.getSeconds());
    var result = '';
    if(!_.isEmpty(format)){
        format = format.replace('dd',day);
        format = format.replace('mm',month);
        format = format.search('yyyy') != -1 ?format.replace('yyyy',year+''):format.replace('yy',year.toString().substring(2));
        format = format.replace('hh',hour);
        format = format.replace('mi',min);
        format = format.replace('ss',sec);
        result = format;
    }else{
        result += year;
        result += month;
        result += day;
        result += hour;
        result += min;
        result += sec;
    }
    return result;
};
HHC.getIndexString = function(text,textCompare){
    if(!_.isEmpty(text)&&!_.isEmpty(textCompare)){
        var array = [];
        array.push(text.indexOf(textCompare));
        array.push(text.indexOfEnd(textCompare));
        return array;
    }else{
        return [];
    }
};
HHC.changeDateFormat = function(dateString){
    var array = dateString.split('/');
    var result = '';
    if(!_.isEmpty(array)){
        result = array[2]+array[1]+array[0];
    }
    return result;
};
HHC.parseShortDate = function(date, format,callback){
    var result = '';
    var year = '';
    var month = '';
    var day = '';
    var hour = '';
    var minute = '';
    var second = '';
    if(!_.isEmpty(format)){
        var yearIndex = HHC.getIndexString(format,"yyyy");
        var monthIndex = HHC.getIndexString(format,"mm");
        var dayIndex = HHC.getIndexString(format,"dd");
        var hourIndex = HHC.getIndexString(format,"hh");
        var minuteIndex = HHC.getIndexString(format,"mi");
        var secondIndex = HHC.getIndexString(format,"ss");
        if(dayIndex[0]>=0){
            day = date.substring(dayIndex[0],dayIndex[1]);
            result = day;
        }
        if(monthIndex[0]>=0){
            month = date.substring(monthIndex[0],monthIndex[1]);
            result = result+'/'+month;
        }
        if(yearIndex[0]>=0){
            year = date.substring(yearIndex[0],yearIndex[1]);
            result = result+'/'+year;
        }
        if(hourIndex[0]>=0){
            hour = date.substring(hourIndex[0],hourIndex[1]);
            result = result+' '+hour;
        }
        if(minuteIndex[0]>=0){
            minute = date.substring(minuteIndex[0],minuteIndex[1]);
            result = result+':'+minute;
        }
        if(secondIndex[0]>=0){
            second = date.substring(secondIndex[0],secondIndex[1]);
            result = result+':'+second;
        }
    }else{
        result = date ;
    }
    callback(result);
};
HHC.addMonths = function (date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
};
HHC.getCookie = function(req,cname){
    var name = cname + "=";
    if(!_.isEmpty(req.headers.cookie)){
        var ca = req.headers.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    }
    return "";
};
HHC.deleteAllCookies = function(req,res) {

    var cookies =  req.headers.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        res.clearCookie(name);
    }
}

HHC.randomID = function(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = HHC;


//var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
//var result = words.filter(function(data){
//	return data === 'exuberant';
//});