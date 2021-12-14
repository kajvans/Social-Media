$(document).ready(function () {
    $("#Submit").click(function () {
        $.getJSON("https://api.ipify.org?format=json",
            function (data1) {
                var name = $("#UserNameInput").val();
                var mail = $("#emailInput").val();
                var pass = $("#pwdInput").val();

                $.post("/Social/php/Register.php", { loginUser: name, loginEmail: mail, loginPass: pass, loginIp: data1.ip }, function (data) {
                    console.log(data);
                    str = data.slice(13);
                    parse = JSON.parse(str);

                    if (data.includes("creating user") && document.getElementById('Remember').checked) {
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

                    sessionStorage.setItem("id", parse[0]);

                    if (data.includes("creating user")) {
                        location.href = "/Social/html/Main";
                    }
                })
            });
    });
});