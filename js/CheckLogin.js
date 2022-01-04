$(document).ready(function () {
    $.get("/Social/php/CheckLogin.php", function (data) {
        document.getElementById("Profile").onclick = function () {window.location.href=`Profile?${sessionStorage.getItem("Name")}`};
        if (data == "Error" || sessionStorage.getItem("Name") == null) {
            location.href = '/Social/html/login'
        }
    });
});