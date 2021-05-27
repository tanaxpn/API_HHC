let addNewPatient;
let saveNewPatient;

let newPaHomeId;
let newPaName;
let newPaLastName;
let newPaGender;
let newPaAge;
let newPaMarital;
let newPaReligion;
let newPaTreatment;

let editPaId;
let editPaHomeId;
let editPaName;
let editPaLastName;
let editPaGender;
let editPaAge;
let editPaMarital;
let editPaReligion;
let editPaTreatment;
let editPamodname;
let editParela;
let saveEditPatient;
let keywordInput;
let search;

$( document ).ready(function() {
    addNewPatient = $('#addNewPatient');
    saveNewPatient = $('#saveNewPatient');
    saveEditPatient = $('#saveEditPatient');


    newPaHomeId = $('#newPaHomeId');
    newPaName = $('#newPaName');
    newPaLastName = $('#newPaLastName');
    newPaGender = $('#newPaGender');
    newPaAge = $('#newPaAge');
    newPaMarital = $('#newPaMarital');
    newPaReligion = $('#newPaReligion');
    newPaTreatment = $('#newPaTreatment');

    editPaId = $('#editPaId');
    editPaHomeId = $('#editPaHomeId');
    editPaName = $('#editPaName');
    editPaLastName = $('#editPaLastName');
    editPaGender = $('#editPaGender');
    editPaAge = $('#editPaAge');
    editPaMarital = $('#editPaMarital');
    editPaReligion = $('#editPaReligion');
    editPaTreatment = $('#editPaTreatment');
    editPamodname = $('#editPamodname');
    editParela = $('#editParela');

    keywordInput = $('#keywordInput');
    search = $('#search');

    addNewPatient.click(function(){
        let scale = 310;
        if($(this).hasClass('action')){
            scale = 0;
        }else{
            resetForm();
        }
        $(this).toggleClass('action');
        anime({
            targets: '.newPatientFormZone,.dataZone',
            translateX: scale
        });
    });
    saveNewPatient.click(function(){
        if(checkBeforeSave()){
            saveNewPatient.attr('disabled',true);
            saveFunction();
        }else{
            toastr["error"]("กรูณากรอกข้อมูลในช่อง * ให้ครบ");
        }
    });
    saveEditPatient.click(function(){
        if(checkBeforeUpdate()){
            saveEditPatient.attr('disabled',true);
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
            { data: 'id' },
            { data: 'pa_home_id' },
            { data: 'pa_name' },
            { data: 'pa_last_name' },
            { data: 'pa_gender' },
            { data: 'pa_age' },
            { data: 'pa_marital' },
            { data: 'pa_religion' },
            { data: 'pa_treatment' },


            {
                data : 'edit',
                render : function(data , type , row){
                    let check = ''
                    if(data == 0){
                        check = 'disabled="true"';
                    }
                    data = '<div class="text-center"  style="width: 100%"><button data-id="'+row.id+'" type="button" '+check+' class="btn btn-outline-secondary" onclick="selectPatientForEdit($(this).attr(\'data-id\'));" >เเก้ไข</button></div>'
                    return data;
                }
            }

        ],
        ajax: {
            url: '/patient',
            type: "POST",
            data: function(d){
                d.method = 'searchPatient';
            },
            dataSrc: function ( json ) {
                let keyword = keywordInput.val();
                let result = json.data;
                result = _.filter(json.data,function(d){
                    let isKeywordWithHomeId = true;
                    let isKeywordWithName = true;
                    let isKeywordWithLastName = true;
                    let isKeywordWithGender = true;
                    let isKeywordWithAge = true;
                    let isKeywordWithReligion = true;
                    if(keyword != ""){
                       let homeid = !utils.isEmpty(d.pa_home_id)? d.pa_home_id.toLowerCase() : '';
                        let name = !utils.isEmpty(d.pa_name)?d.pa_name.toLowerCase():'';
                        let lastname = !utils.isEmpty(d.pa_last_name)?d.pa_last_name.toLowerCase():'';
                        let Gender = !utils.isEmpty(d.pa_gender)?d.pa_gender.toLowerCase():'';
                        let Age = !utils.isEmpty(d.pa_age)?d.pa_age.toLowerCase():'';
                        let Religion = !utils.isEmpty(d.pa_religion)?d.pa_religion.toLowerCase():'';
                        isKeywordWithHomeId = (homeid.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithName = (name.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithLastName = (lastname.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithGender = (Gender.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithAge = (Age.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithReligion = (Religion.indexOf(keyword.toLowerCase()) >= 0);
                    }
                    return  isKeywordWithHomeId || isKeywordWithName || isKeywordWithLastName ||isKeywordWithGender || isKeywordWithAge|| isKeywordWithReligion;
                });
                return result;
            }
        }
    })
});

function saveFunction(){
    //ตัวแปรที่จะส่งไปหลังบ้าน
    let paramSavePatient = new Object();
    paramSavePatient.paHomeId = newPaHomeId.val();
    paramSavePatient.paName = newPaName.val();
    paramSavePatient.paLastName = newPaLastName.val();
    paramSavePatient.paGender = newPaGender.val();
    paramSavePatient.paAge = newPaAge.val();
    paramSavePatient.paMarital = newPaMarital.val();
    paramSavePatient.paReligion = newPaReligion.val();
    paramSavePatient.paTreatment = newPaTreatment.val();
    paramSavePatient.method = "saveNewPatient";

    //ยิงเข้าหลังบ้าน
    $.ajax({
        type: "POST",
        url: '/patient',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramSavePatient,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveNewPatient.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveNewPatient.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveNewPatient.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });

};

function updateFunction(){
    let paramUpdatePatient = new Object();
    paramUpdatePatient.id = editPaId.val();
    paramUpdatePatient.editPaHomeId = editPaHomeId.val();
    paramUpdatePatient.editPaName = editPaName.val();
    paramUpdatePatient.editPaLastName = editPaLastName.val();
    paramUpdatePatient.editPaGender = editPaGender.val();
    paramUpdatePatient.editPaAge = editPaAge.val();
    paramUpdatePatient.editPaMarital = editPaMarital.val();
    paramUpdatePatient.editPaReligion = editPaReligion.val();
    paramUpdatePatient.editPaTreatment = editPaTreatment.val();
    paramUpdatePatient.method = "saveUpdatePatient";
    $.ajax({
        type: "PATCH",
        url: '/patient',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramUpdatePatient,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveEditPatient.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveEditPatient.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveEditPatient.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });
};



function reRenderData(){
    $('#table').DataTable().ajax.reload();
};
function checkBeforeSave(){
    return !utils.isEmpty(newPaHomeId.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaName.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaLastName.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaGender.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaAge.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaMarital.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaReligion.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newPaTreatment.val());

}
function checkBeforeUpdate() {

    return !utils.isEmpty(editPaHomeId.val()) && !utils.isEmpty(editPaName.val()) && !utils.isEmpty(editPaLastName.val()) && !utils.isEmpty(editPaGender.val()) && !utils.isEmpty(editPaAge.val()) && !utils.isEmpty(editPaMarital.val()) && !utils.isEmpty(editPaTreatment.val());
}


function selectPatientForEdit(id){

    let paramPatientEdit = new Object();
    paramPatientEdit.id = id
    paramPatientEdit.method = "searchPatientById";
    $.ajax({
        type: "POST",
        url: '/patient',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data:paramPatientEdit,
        success: function(d) {
            if(d.status){
                resetForm();
                let data = d.data;
                editPaId.val(data.id);
                editPaHomeId.val(data.pa_home_id);
                editPaName.val(data.pa_name);
                editPaLastName.val(data.pa_last_name);
                editPaGender.val(data.pa_gender);
                editPaAge.val(data.pa_age);
                editPaMarital.val(data.pa_marital);
                editPaReligion.val(data.pa_religion);
                editPaTreatment.val(data.pa_treatment);
                editPamodname.val(data.pa_mod_name);
                editParela.val(data.pa_rela);
                let scale = 310;
                anime({
                    targets: '.editPatientFormZone,.dataZone',
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
    let element = [{'id':'newPatientFormZone',ele:addNewPatient}];
    _.forEach(element,function(o){
        o.ele.removeClass('action');
    });
    anime({
        targets: '.newPatientFormZone,.editPatientFormZone,.dataZone',
        translateX: 0
    });
    clearNewPatient();
    clearEditPatient();
};
function clearNewPatient(){
    newPaHomeId.val(null);
    newPaName.val(null);
    newPaLastName.val(null);
    newPaGender.val(null);
    newPaAge.val(null);
    newPaMarital.val(null);
    newPaReligion.val(null);
    newPaTreatment.val(null);
}
function clearEditPatient() {
    editPaHomeId.val(null);
    editPaName.val(null);
    editPaLastName.val(null);
    editPaGender.val(null);
    editPaAge.val(null);
    editPaMarital.val(null);
    editPaReligion.val(null);
    editPaTreatment.val(null);
}

