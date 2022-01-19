$(document).ready(function () {
    $.get("/Social/php/CheckLogin.php", function (data) {
        document.getElementById("Profile").onclick = function () {window.location.href=`Profile?${sessionStorage.getItem("Name")}`};
        if (data == "Error" || sessionStorage.getItem("Name") == null) {
            if(localStorage.getItem("CurrentUser") == null){
                location.href = '/Social/html/login'
            }
            else {
                $.getJSON("https://api.ipify.org?format=json",
                function (data1) {
                    var Token = localStorage.getItem("CurrentUser");
                    var Upload = Token;
                    $.post("/Social/php/LoginToken.php", { Token: Upload, loginip: data1.ip }, function (data) {
                        if (data != "Error") {
                            sessionStorage.setItem("Name", data.slice(1,-1))
                            location.href = "/Social/html/Main";
                        }
                    });
                })
            }
        }
    });
});