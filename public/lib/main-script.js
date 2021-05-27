let utils = {
    isEmpty: function (v) {
        return v === null || v === undefined || v === '' || ($.isArray(v) && !v.length) || ($.isFunction(v.size) && v.size() === 0);
    }
};
$(window).on('load', function() {
    toastrConfig();
    window.addEventListener("beforeunload", function(event) {
    });
});
function toastrConfig(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}