$(document).ready(function () {
        $.get("/Social/php/GetPost.php", function (data) {
            //location.reload();
            console.log(data);
        });
});