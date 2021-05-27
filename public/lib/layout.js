(function ($) {
    'use strict';
    $(document).ready(function(){
        window.arrayPath = [];
        window.childPath = [];
        var data;
        for(var i = 0;i < $('.nav-link').length;i++ ){
            data = {};
            data.el =  $($('.nav-link')[i]);
            data.path = $($('.nav-link')[i]).attr('href');
            arrayPath.push(data);
        }
        for(var i = 0;i<$('.card .nav-link').length;i++){
            data = {};
            data.el = $($('.card .nav-link')[i]);
            data.path = $($('.card .nav-link')[i]).attr('href');
            childPath.push(data);
        }
        var element = _.find(arrayPath,{path:window.location.pathname});
        if(!_.isEmpty(element)){
            element.el.addClass('active');
        }

        var element_child = _.find(childPath,{path:window.location.pathname});
        if(!_.isEmpty(element_child)){
            element_child.el.addClass('active');
            element_child.el.parent().parent().parent().find('[data-toggle="collapse"]').click();
        }
        $('.nav-right .power').click(function(){
            swal("คุณต้องการออกจากระบบ?", {
                buttons: {
                    catch: {
                        text: "ยืนยัน",
                        value: "yes",
                    },
                    cancel: "ยกเลิก"
                },
            })
                .then((value) => {
                    switch (value) {

                        case "yes":
                            window.location = '/logout';
                            break;

                        default:
                            swal.close();
                    }
                });
        });
        toastrConfig();
    });
    function toastrConfig(){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
})(jQuery);