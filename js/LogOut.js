$(document).ready(function(){
    $("#LOGOUT").click(function () {
        $.get("/Social/php/LogOut.php", function (data) {
            console.log(data)
            localStorage.removeItem("CurrentUser");
            sessionStorage.removeItem("Name");
            location.href = '/Social/html/login';
        })
    });
});