var lastcall = 0;
function PostDislike(id) {
    var interval = 800;
    var user = sessionStorage.getItem("id");
    var now = Date.now()
    var user = sessionStorage.getItem("id");
    if (lastcall + interval < now) {
        lastcall = now;
        $.post("/Social/php/Dislike.php", { Id: id, User: user }, function (data) {

        });
    }
}