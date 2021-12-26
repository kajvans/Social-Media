var lastcall = 0;
function PostLike(id) {
    var interval = 600;
    var userid = sessionStorage.getItem("id");
    var user = sessionStorage.getItem("user");
    var now = Date.now()
    var user = sessionStorage.getItem("id");
    if (lastcall + interval < now) {
        lastcall = now;
        $.post("/Social/php/Like.php", { Id: id, Userid: userid, User: user }, function (data) {

        });
    }
}