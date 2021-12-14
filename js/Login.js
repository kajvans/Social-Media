$(document).ready(function () {
    if (localStorage.getItem("CurrentUser") != null) {
        $.getJSON("https://api.ipify.org?format=json",
            function (data1) {
                var Token = localStorage.getItem("CurrentUser");
                var Upload = Token;
                $.post("/Social/php/LoginToken.php", { Token: Upload, loginip: data1.ip }, function (data) {
                    if (data.includes("Login Succes")) {
                        str = data.slice(12);
                        parse = JSON.parse(str);
                        sessionStorage.setItem("id", parse[0]);
                        sessionStorage.setItem("user", parse[1])
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
                    str = data.slice(12);
                    parse = JSON.parse(str);

                    if (data.includes("Login Succes") && document.getElementById('Remember').checked) {
                        if (localStorage.getItem("CurrentUser" === null)) {
                            var token = parse[2];
                            localStorage.setItem('CurrentUser', token);
                        }

                        else {
                            localStorage.removeItem("CurrentUser");
                            var token = parse[2];
                            localStorage.setItem('CurrentUser', token);
                        }
                    }

                    sessionStorage.setItem("id", parse[0]);
                    sessionStorage.setItem("user", parse[1])

                    if (data.includes("Login Succes")) {
                        location.href = "/Social/html/Main";
                    }
                })

            });
    });
});