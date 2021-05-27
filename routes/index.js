var messages_array = [];
exports.get = function(req,res){
    let page = {'page':'index','title':''};
    checkToken(req,res,page);
};
