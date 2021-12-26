$(document).ready(function () {
    $.get("/Social/php/CheckLogin.php", function (data) {
        if (data == null) {
            location.href = '/Social/html/login'
        }
    });
});