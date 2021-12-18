var lastcall = 0;
function PostLike(id) {
    var interval = 600;
    var user = sessionStorage.getItem("id");
    var now = Date.now()
    var user = sessionStorage.getItem("id");
    if (lastcall + interval < now) {
        lastcall = now;
        $.post("/Social/php/Like.php", { Id: id, User: user }, function (data) {

        });
    }
}