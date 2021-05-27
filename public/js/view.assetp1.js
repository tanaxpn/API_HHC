let addNewassetp1;
let saveNewassetp1;

let newassetpat_id;
let newasset_date;
let newasset_time;
let newasset_body;
let newasset_tem;
let newasset_hrate;
let newasset_regular;
let newasset_irregular;

let editasset_id;
let editassetpat_id;
let editasset_date;
let editasset_time;
let editasset_body;
let editasset_tem;
let editasset_hrate;
let editasset_regular;
let editasset_irregular;
let editasset_breathe;
let editasset_normal;
let editasset_gasp;
let editasset_dry;
let editasset_wet;
let editasset_weight;
let editasset_bmi;
let saveEditassetp1;
let keywordInput;
let search;

$( document ).ready(function() {
    addNewassetp1 = $('#addNewassetp1');
    saveNewassetp1 = $('#saveNewassetp1');
    saveEditassetp1 = $('#saveEditassetp1');
    newassetpat_id = $('#newassetpat_id');
    newasset_date = $('#newasset_date');
    newasset_time = $('#newasset_time');
    newasset_body = $('#newasset_body');
    newasset_tem = $('#newasset_tem');
    newasset_hrate = $('#newasset_hrate');
    newasset_regular = $('#newasset_regular');
    newasset_irregular = $('#newasset_irregular');

    editasset_id = $('#editasset_id');
    editassetpat_id = $('#editassetpat_id');
    editasset_date = $('#editasset_date');
    editasset_time = $('#editasset_time');
    editasset_body = $('#editasset_body');
    editasset_tem = $('#editasset_tem');
    editasset_hrate = $('#editasset_hrate');
    editasset_regular = $('#editasset_regular');
    editasset_irregular = $('#editasset_irregular');
    editasset_breathe = $('#editasset_breathe');
    editasset_normal = $('#editasset_normal');
    editasset_gasp = $('#editasset_gasp');
    editasset_dry = $('#editasset_dry');
    editasset_wet = $('#editasset_wet');
    editasset_bmi = $('#editasset_bmi');

    keywordInput = $('#keywordInput');
    search = $('#search');

    addNewassetp1.click(function(){
        let scale = 310;
        if($(this).hasClass('action')){
            scale = 0;
        }else{
            resetForm();
        }
        $(this).toggleClass('action');
        anime({
            targets: '.newAssetp1FormZone,.dataZone',
            translateX: scale
        });
    });
    saveNewassetp1.click(function(){
        if(checkBeforeSave()){
            saveNewassetp1.attr('disabled',true);
            saveFunction();
        }else{
            toastr["error"]("กรูณากรอกข้อมูลในช่อง * ให้ครบ");
        }
    });
    saveEditassetp1.click(function(){
        if(checkBeforeUpdate()){
            saveEditassetp1.attr('disabled',true);
            updateFunction();
        }else{
            toastr["error"]("กรูณากรอกข้อมูลในช่อง * ให้ครบ");
        }
    });
    keywordInput.keyup(function(code){
        if(code.keyCode === 13){
            reRenderData();
        }
    });
    search.click(function(){
        reRenderData();
    });



    let table = $('#table').DataTable({
        scrollY: 350,
        searching: false,
        select: true,
        "bLengthChange" : false,
        "initComplete": function(settings, json) {
        },
        columns: [
            { data: 'assetp_id' },
            { data: 'assetpat_id' },
            { data: 'asset_date' },
            { data: 'asset_time' },
            { data: 'asset_body' },
            { data: 'asset_tem' },
            { data: 'asset_hrate' },
            { data: 'asset_regular' },
            { data: 'asset_irregular' },


            {
                data : 'edit',
                render : function(data , type , row){
                    let check = ''
                    if(data == 0){
                        check = 'disabled="true"';
                    }
                    data = '<div class="text-center"  style="width: 100%"><button data-id="'+row.assetp_id+'" type="button" '+check+' class="btn btn-outline-secondary" onclick="selectassetp1ForEdit($(this).attr(\'data-id\'));" >เเก้ไข/ดู</button></div>'
                    return data;
                }
            }

        ],
        ajax: {
            url: '/assetp1',
            type: "POST",
            data: function(d){
                d.method = 'searchAssetp';
            },
            dataSrc: function ( json ) {
                let keyword = keywordInput.val();
                let result = json.data;
                result = _.filter(json.data,function(d){
                    let isKeywordWithHomeId = true;
                    let isKeywordWithName = true;
                    let isKeywordWithLastName = true;
                    if(keyword != ""){
                        let homeid = !utils.isEmpty(d.pa_home_id)? d.pa_home_id.toLowerCase() : '';
                        let name = !utils.isEmpty(d.pa_name)?d.pa_name.toLowerCase():'';
                        let lastname = !utils.isEmpty(d.pa_last_name)?d.pa_last_name.toLowerCase():'';
                        isKeywordWithHomeId = (homeid.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithName = (name.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithLastName = (lastname.indexOf(keyword.toLowerCase()) >= 0);
                    }
                    return  isKeywordWithHomeId || isKeywordWithName || isKeywordWithLastName;
                });
                return result;
            }
        }
    })
});

function saveFunction(){
    //ตัวแปรที่จะส่งไปหลังบ้าน
    let paramSaveassetp1 = new Object();
    paramSaveassetp1.assetpatId = newassetpat_id.val();
    paramSaveassetp1.assetDate = newasset_date.val();
    paramSaveassetp1.assetTime = newasset_time.val();
    paramSaveassetp1.assetBody = newasset_body.val();
    paramSaveassetp1.assetTem = newasset_tem.val();
    paramSaveassetp1.assetHrate = newasset_hrate.val();
    paramSaveassetp1.assetRegular = newasset_regular.val();
    paramSaveassetp1.assetIrregular = newasset_irregular.val();
    paramSaveassetp1.method = "saveNewassetp1";

    //ยิงเข้าหลังบ้าน
    $.ajax({
        type: "POST",
        url: '/assetp1',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramSaveassetp1,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveNewassetp1.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveNewassetp1.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveNewassetp1.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });

};

function updateFunction(){
    let paramUpdateassetp1 = new Object();
    paramUpdateassetp1.assetp_id = editasset_id.val();
    paramUpdateassetp1.editassetpat_id = editassetpat_id.val();
    paramUpdateassetp1.editasset_date = editasset_date.val();
    paramUpdateassetp1.editasset_time = editasset_time.val();
    paramUpdateassetp1.editasset_body = editasset_body.val();
    paramUpdateassetp1.editasset_tem = editasset_tem.val();
    paramUpdateassetp1.editasset_hrate = editasset_hrate.val();
    paramUpdateassetp1.editasset_regular = editasset_regular.val();
    paramUpdateassetp1.editasset_irregular = editasset_irregular.val();
    paramUpdateassetp1.method = "saveUpdateAssetp1";
    $.ajax({
        type: "PATCH",
        url: '/assetp1',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramUpdateassetp1,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveEditassetp1.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveEditassetp1.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveEditassetp1.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });
};

function reRenderData(){
    $('#table').DataTable().ajax.reload();
};
function checkBeforeSave(){
    return !utils.isEmpty(newassetpat_id.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_date.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_time.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_body.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_tem.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_hrate.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_regular.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newasset_irregular.val());

}
function checkBeforeUpdate() {

    return !utils.isEmpty(editassetpat_id.val()) && !utils.isEmpty(editasset_date.val()) && !utils.isEmpty(editasset_time.val()) && !utils.isEmpty(editasset_body.val()) && !utils.isEmpty(editasset_tem.val()) && !utils.isEmpty(editasset_hrate.val()) && !utils.isEmpty(editasset_regular.val());
}


function selectassetp1ForEdit(id){

    let paramAssetp1Edit = new Object();
    paramAssetp1Edit.id = id
    paramAssetp1Edit.method = "searchAssetp1ById";
    $.ajax({
        type: "POST",
        url: '/assetp1',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data:paramAssetp1Edit,
        success: function(d) {
            if(d.status){
                resetForm();
                const data = d.data;
                editasset_id.val(data.assetp_id);
                editassetpat_id.val(data.assetpat_id);
                editasset_date.val(data.asset_date);
                editasset_time.val(data.asset_time);
                editasset_body.val(data.asset_body);
                editasset_tem.val(data.asset_tem);
                editasset_hrate.val(data.asset_hrate);
                editasset_regular.val(data.asset_regular);
                editasset_irregular.val(data.asset_irregular);
                editasset_breathe.val(data.asset_breathe);
                editasset_normal.val(data.asset_normal);
                editasset_gasp.val(data.asset_gasp);
                editasset_dry.val(data.asset_dry);
                editasset_wet.val(data.asset_wet);
                editasset_bmi.val(data.asset_bmi);
                let scale = 310;
                anime({
                    targets: '.editAssetp1FormZone,.dataZone',
                    translateX: scale
                });
            }else{
                toastr['error'](d.message);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseJSON.description);
        }
    });
}


function resetForm(el){
    let element = [{'id':'newAssetp1FormZone',ele:addNewassetp1}];
    _.forEach(element,function(o){
        o.ele.removeClass('action');
    });
    anime({
        targets: '.newAssetp1FormZone,.editAssetp1FormZone,.dataZone',
        translateX: 0
    });
    clearNewAssetp1();
    clearEditAssetp1();
};
function clearNewAssetp1(){
    newassetpat_id.val(null);
    newasset_date.val(null);
    newasset_time.val(null);
    newasset_body.val(null);
    newasset_tem.val(null);
    newasset_hrate.val(null);
    newasset_regular.val(null);
    newasset_irregular.val(null);
}
function clearEditAssetp1() {
    editassetpat_id.val(null);
    editasset_date.val(null);
    editasset_time.val(null);
    editasset_body.val(null);
    editasset_tem.val(null);
    editasset_hrate.val(null);
    editasset_regular.val(null);
    editasset_irregular.val(null);
}
