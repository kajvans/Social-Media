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
                let Likes = document.getElementById(`Likes ${id}`);
                var Count = Likes.value.split(" ");
                if(data == "1"){
                    Count[0] = parseInt(Count[0]) + 1;
                    console.log(Count[0]);
                    Likes.value = null;
                    Likes.value = Count[0] + ' likes';
                }

                else if(data == "2") {
                    Count[0] = parseInt(Count[0]) - 1;
                    console.log(Count[0]);
                    Likes.value = null;
                    Likes.value = Count[0] + ' likes';
                }
        });
    }
}