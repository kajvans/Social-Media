var lastcall = 0;
function PostLike(id) {
    var interval = 800;
    var user = sessionStorage.getItem("id");
    var now = Date.now()
    console.log(lastcall + interval);
    if (lastcall + interval < now) {
        lastcall = now;
        $.post("/Social/php/Like.php", { Id: id, User: user }, function (data) {

        });
    }
}