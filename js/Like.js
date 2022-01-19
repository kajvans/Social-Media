var lastcall = 0;
function PostLike(id) {
    var interval = 600;
    var userid = sessionStorage.getItem("id");
    var user = sessionStorage.getItem("user");
    var now = Date.now()
    var user = sessionStorage.getItem("id");
    if (lastcall + interval < now) {
        lastcall = now;
        console.log(id);
        $.post("/Social/php/Like.php", { Id: id, Userid: userid, User: user }, function (data) {
                let Likes = document.getElementById(`Likes ${id}`);
                let Dislikes = document.getElementById(`Dislike ${id}`);
                console.log(Dislikes);
                var Count = Likes.value.split(" ");
                var CountDis = Dislikes.value.split(" ");
                console.log(data);
                if(data == "1"){
                    Count[0] = parseInt(Count[0]) + 1;
                    Likes.value = null;
                    Likes.value = Count[0] + ' likes';
                }

                else if(data == "2") {
                    Count[0] = parseInt(Count[0]) + 1;
                    Likes.value = null;
                    Likes.value = Count[0] + ' likes';

                    CountDis[0] = parseInt(CountDis[0]) - 1;
                    Dislikes.value = null;
                    Dislikes.value = CountDis[0] + ' dislikes';
                    console.log(Dislikes.value);
                }

                else {
                    Count[0] = parseInt(Count[0]) - 1;
                    Likes.value = null;
                    Likes.value = Count[0] + ' likes';
                }
        });
    }
}