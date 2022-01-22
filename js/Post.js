$(document).ready(function () {
    $("#SubmitMain").click(function () {
        var content = $("#content").val();
        $.post("/Social/php/CreatePost.php", { Content: content }, function (data) {
            //location.reload();
            $("#content").value = '';
            data = JSON.parse(data);
            CreatePost(data);
        });
    });

    $("#Submit").click(function () {
        var content = $("#content").val();
        $.post("/Social/php/CreatePost.php", { Content: content }, function (data) {
            //location.reload();
            $("#content").value = '';
        });
    });
});