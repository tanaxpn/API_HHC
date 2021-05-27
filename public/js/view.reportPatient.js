let $numAll;
let $numM;
let $numF;

$( document ).ready(function() {
    $numAll = $('#numAll');
    $numM = $('#numM');
    $numF = $('#numF');
    reportAll('A');
    reportAll('M');
    reportAll('F');
});
function reportAll(type){
    let param = new Object();
    param.type = type;
    param.method = "reportPatient";
    $.ajax({
        type: "POST",
        url: '/report_patient',
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: param,
        success: function (d) {
            let data = d.data;
            if(type === 'A'){
                $numAll.text(data.count);
            }else if(type === 'M'){
                $numM.text(data.count);
            }else if(type === 'F'){
                $numF.text(data.count);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
}
