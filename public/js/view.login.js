let $username;
let $password;
let $btnSubmit;
$( document ).ready(function() {
    $username = $('#username');
    $password = $('#password');
    $btnSubmit = $('#btnSubmit');
    $btnSubmit.click(function(){
        $(this).attr('disabled', true);
        if(!utils.isEmpty($username.val())&&!utils.isEmpty($password.val())){
            loginFunction();
        }else{
            $(this).attr('disabled', false);
            toastr["error"]("กรูณากรอก ชื่อผู้ใช้ และ รหัสผ่าน");
        }
    });
});

function loginFunction() {
    var param = new Object();
    param.username = $username.val();
    param.password = $password.val();

    $.ajax({
        type: "POST",
        url: '/check_login',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: param,
        success: function(d) {
            if(d.success){
                $btnSubmit.attr('disabled', false);
                window.location.replace("/");
            }else{
                $btnSubmit.attr('disabled', false);
                toastr["error"](d.message);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $btnSubmit.attr('disabled', false);
            console.log(xhr.responseJSON.description);
        }
    });
}