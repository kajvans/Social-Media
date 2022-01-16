var lastcall = 0;
function PostDislike(id) {
    var interval = 600;
    var user = sessionStorage.getItem("id");
    var now = Date.now()
    var user = sessionStorage.getItem("id");
    if (lastcall + interval < now) {
        lastcall = now;
        $.post("/Social/php/Dislike.php", { Id: id, User: user }, function (data) {
            let Dislikes = document.getElementById(`Dislike ${id}`);
            let Likes = document.getElementById(`Likes ${id}`);
            var Count = Dislikes.value.split(" ");
            var CountLik = Likes.value.split(" ");
            if(data == "1"){
                Count[0] = parseInt(Count[0]) + 1;
                Dislikes.value = null;
                Dislikes.value = Count[0] + ' dislikes';
            }

            else if(data == "2") {
                Count[0] = parseInt(Count[0]) + 1;
                Dislikes.value = null;
                Dislikes.value = Count[0] + ' dislikes';

                CountLik[0] = parseInt(CountLik[0]) - 1;
                Likes.value = null;
                Likes.value = Count[0] + ' likes';
            }

            else {
                Count[0] = parseInt(Count[0]) - 1;
                Likes.value = null;
                Likes.value = Count[0] + ' likes';
            }
        });
    }
}