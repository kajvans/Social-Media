$(document).ready(function () {
    $("#Submit").click(function () {
        var content = $("#content").val();
        var user = sessionStorage.getItem("id");
        $.post("/Social/php/CreatePost.php", { Content: content, id: user }, function (data) {
            //location.reload();
            console.log(data);
            $("#content").value = '';
        });
    });
});