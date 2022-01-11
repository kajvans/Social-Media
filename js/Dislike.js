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
            let Count = Dislikes.value;
            if(data == "1"){
                Count[0] = parseInt(Count[0]) + 1;
                console.log(Count[0]);
                Dislikes.value = null;
                Dislikes.value = Count[0] + ' dislikes';
            }

            else {
                Count[0] = parseInt(Count[0]) - 1;
                console.log(Count[0]);
                Dislikes.value = null;
                Dislikes.value = Count[0] + ' dislikes';
            }
        });
    }
}