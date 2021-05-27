let addNewUser;
let saveNewUser;
let newUsUserName;
let newUsName;
let newUsPass;
let newUsEmail;
let newUsPhone;

let editUsId;
let editUsUserName;
let editUsName;
let editUsEmail;
let editUsPhone;
let saveEditUser;
let keywordInput;
let search;
$( document ).ready(function() {
    addNewUser = $('#addNewUser');
    saveNewUser = $('#saveNewUser');
    saveEditUser = $('#saveEditUser');

    newUsUserName = $('#newUsUserName');
    newUsName = $('#newUsName');
    newUsPass = $('#newUsPass');
    newUsEmail = $('#newUsEmail');
    newUsPhone = $('#newUsPhone');


    editUsId = $('#editUsId');
    editUsUserName = $('#editUsUserName');
    editUsName = $('#editUsName');
    editUsEmail = $('#editUsEmail');
    editUsPhone = $('#editUsPhone');

    keywordInput = $('#keywordInput');
    search = $('#search');

    addNewUser.click(function(){
        let scale = 310;
        if($(this).hasClass('action')){
            scale = 0;
        }else{
            resetForm();
        }
        $(this).toggleClass('action');
        anime({
            targets: '.newUserFormZone,.dataZone',
            translateX: scale
        });
    });
    saveNewUser.click(function(){
        if(checkBeforeSave()){
            saveNewUser.attr('disabled',true);
            saveFunction();
        }else{
            toastr["error"]("กรูณากรอกข้อมูลในช่อง * ให้ครบ");
        }
    });
    saveEditUser.click(function(){
        if(checkBeforeUpdate()){
            saveEditUser.attr('disabled',true);
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
            { data: 'us_username' },
            { data: 'us_name' },
            { data: 'us_pass' },
            { data: 'us_email' },
            { data: 'us_phone' },
            { data: 'us_active',

                render: function ( data, type, row ) {
                    var check = '';
                    if(data == 1){
                        check = "checked";
                    }else{
                        check = '';
                    }
                    data = '<input type="checkbox" '+check+' id="active_'+row.id+'" class="checkbox" onclick="updateStatus($(this).prop(\'id\').replace(\'active_\',\'\'), $(this).prop(\'checked\'))" /><label for="active_'+row.faction_id+'" class="switch"></label>'

                    return data;
                }
            },
            {
                data : 'edit',
                render : function(data , type , row){
                    let check = ''
                    if(data == 0){
                        check = 'disabled="true"';
                    }
                    data = '<div class="text-center"  style="width: 100%"><button data-id="'+row.id+'" type="button" '+check+' class="btn btn-outline-secondary" onclick="selectUserForEdit($(this).attr(\'data-id\'));" >แก้ไข</button></div>'
                    return data;
                }
            }
        ],
        ajax: {
            url: '/user',
            type: "POST",
            data: function(d){
                d.method = 'searchUser';
            },
            dataSrc: function ( json ) {
                let keyword = keywordInput.val();
                let result = json.data;
                result = _.filter(json.data,function(d){
                    let isKeywordWithName = true;
                    let isKeywordWithUsername = true;
                    let isKeywordWithEmail = true;
                    if(keyword != ""){
                        let name = !utils.isEmpty(d.us_name)? d.us_name.toLowerCase() : '';
                        let username = !utils.isEmpty(d.us_username)?d.us_username.toLowerCase():'';
                        let email = !utils.isEmpty(d.us_email)?d.us_email.toLowerCase():'';
                        isKeywordWithName = (name.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithUsername = (username.indexOf(keyword.toLowerCase()) >= 0);
                        isKeywordWithEmail = (email.indexOf(keyword.toLowerCase()) >= 0);
                    }
                    return isKeywordWithUsername || isKeywordWithName || isKeywordWithEmail;
                });
                return result;
            }
        }
    })
});

function saveFunction(){
    //ตัวแปรที่จะส่งไปหลังบ้าน
    let paramSaveUser = new Object();
    paramSaveUser.usUserName = newUsUserName.val();
    paramSaveUser.usName = newUsName.val();
    paramSaveUser.usPass = newUsPass.val();
    paramSaveUser.usEmail = newUsEmail.val();
    paramSaveUser.usPhone = newUsPhone.val();
    paramSaveUser.method = "saveNewUser";
    //ยิงเข้าหลังบ้าน
    $.ajax({
        type: "POST",
        url: '/user',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramSaveUser,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveNewUser.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveNewUser.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveNewUser.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });
};
function updateFunction(){
    let paramUpdateUser = new Object();
    paramUpdateUser.id = editUsId.val();
    paramUpdateUser.editUsUserName = editUsUserName.val();
    paramUpdateUser.editUsName = editUsName.val();
    paramUpdateUser.editUsEmail = editUsEmail.val();
    paramUpdateUser.editUsPhone = editUsPhone.val();
    paramUpdateUser.method = "saveUpdateUser";
    $.ajax({
        type: "PATCH",
        url: '/user',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramUpdateUser,
        success: function(d) {
            //ถ้าสำเร็จจะส่งเรข้า success
            if(d.status){
                resetForm();
                saveEditUser.attr('disabled',false);
                reRenderData();
                toastr['success'](d.message,"Success");
            }else{
                saveEditUser.attr('disabled',false);
                toastr['error'](d.message,"Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            saveEditUser.attr('disabled',false);
            toastr['error']("Fail to Save. Please contact Admin","Error");
        }
    });
};
function reRenderData(){
    $('#table').DataTable().ajax.reload();
};
function checkBeforeSave(){
    return !utils.isEmpty(newUsUserName.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newUsName.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newUsPass.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newUsEmail.val());
}
function checkBeforeSave() {
    return !utils.isEmpty(newUsPhone.val());
}
function checkBeforeUpdate() {
    return !utils.isEmpty(editUsUserName.val()) && !utils.isEmpty(editUsName.val()) && !utils.isEmpty(editUsEmail.val()) && !utils.isEmpty(editUsPhone.val());
}
function selectUserForEdit(id){

    let paramUserEdit = new Object();
    paramUserEdit.id = id
    paramUserEdit.method = "searchUserById";
    $.ajax({
        type: "POST",
        url: '/user',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: paramUserEdit,
        success: function(d) {
            if(d.status){
                resetForm();
                let data = d.data;
                editUsId.val(data.id);
                editUsUserName.val(data.us_username);
                editUsName.val(data.us_name);
                editUsEmail.val(data.us_email);
                editUsPhone.val(data.us_phone);
                let scale = 310;
                anime({
                    targets: '.editUserFormZone,.dataZone',
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
    let element = [{'id':'newUserFormZone',ele:addNewUser}];
    _.forEach(element,function(o){
        o.ele.removeClass('action');
    });
    anime({
        targets: '.newUserFormZone,.editUserFormZone,.dataZone',
        translateX: 0
    });
    clearNewUser();
    clearEditUser();
};
function clearNewUser(){
    newUsUserName.val(null);
    newUsName.val(null);
    newUsPass.val(null);
    newUsEmail.val(null);
    newUsPhone.val(null);
}
function clearEditUser(){
    editUsId.val(null);
    editUsUserName.val(null);
    editUsName.val(null);
    editUsEmail.val(null);
    editUsPhone.val(null);
}