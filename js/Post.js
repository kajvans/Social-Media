$(document).ready(function () {
    $("#Submit").click(function () {
        var content = $("#content").val();
        $.post("/Social/php/CreatePost.php", { Content: content }, function (data) {
            //location.reload();
            $("#content").value = '';
        });
    });
});