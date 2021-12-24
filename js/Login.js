$(document).ready(function () {
    if (localStorage.getItem("CurrentUser") != null) {
        $.getJSON("https://api.ipify.org?format=json",
            function (data1) {
                var Token = localStorage.getItem("CurrentUser");
                var Upload = Token;
                $.post("/Social/php/LoginToken.php", { Token: Upload, loginip: data1.ip }, function (data) {
                    if(data != "Error"){
                        console.log("yesy");
                        location.href = "/Social/html/Main";
                    }
                });
            })
    }

    $("#Submit").click(function () {
        $.getJSON("https://api.ipify.org?format=json",
            function (data1) {
                var name = $("#UserNameInput").val();
                var pass = $("#pwdInput").val();
                $.post("/Social/php/Login.php", { loginUser: name, loginPass: pass, loginip: data1.ip }, function (data) {
                    if(data != "Error"){
                        console.log(data);
                        parse = JSON.parse(data);

                        if (document.getElementById('Remember').checked) {
                            if (localStorage.getItem("CurrentUser" === null)) {
                                var token = parse[1];
                                localStorage.setItem('CurrentUser', token);
                            }
    
                            else {
                                localStorage.removeItem("CurrentUser");
                                var token = parse[1];
                                localStorage.setItem('CurrentUser', token);
                            }
                        }
                        console.log("yesy");
                        location.href = "/Social/html/Main";
                    }

                    else {
                        console.log(data)
                    }
                })

            });
    });
});