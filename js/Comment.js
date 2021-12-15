var lastcall = 0;
function PostComment(id) {
    $(document).ready(function () {
        var interval = 5000;
        var user = sessionStorage.getItem("id");
        var now = Date.now()
        if (lastcall + interval < now) {
            lastcall = now;
            $.post("/Social/php/Comment.php", { Content: comment, id: user, Postid: id }, function (data) {

            });
        }
    });
}
