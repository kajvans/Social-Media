function GetProfile(id) {
    $.post("/Social/php/GetProfile.php", { User: id }, function (data) {
        //TODO create new html file for the profile page
        document.getElementById("Posts").innerHTML = "";
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            var Date = data[i].created;

            let Main = document.createElement("div");
            Main.id = "post " + data[i].id;
            document.getElementById("Posts").appendChild(Main);

            let info = document.createElement("div");
            info.id = "Post Info " + i;
            document.getElementById("post " + data[i].id).appendChild(info);

            info.innerHTML = `<button class='SameLine' id='NameDisplay' onclick='ShowProfilePage(${data[i].user})'>${data[i].name}</button> 
            <span class='SameLine' id='TimePassed'>`

            if (Date >= 60) {
                Date = Math.floor(Date / 60);
                if (Date >= 24) {
                    Date = Math.floor(Date / 24)
                    info.innerHTML += `&nbsp; ${Date} days ago</span> <br><br>`
                }

                else {
                    info.innerHTML += `&nbsp; ${Date} hours ago</span> <br><br>`
                }
            }

            else {
                if (Date < 1) {
                    info.innerHTML += `&nbsp; less than a minutes ago</span> <br><br>`
                }

                else {
                    info.innerHTML += `&nbsp; ${Date} minutes ago</span> <br><br>`
                }
            }

            let content = document.createElement("div");
            content.id = "Content " + i;
            content.innerHTML = `<p id="Header" style="text-align: left; font-size: 110%; font-weight: 110%;">${data[i].content}</p>`
            document.getElementById("post " + data[i].id).appendChild(content);

            let buttons = document.createElement("div");
            buttons.id = "Buttons " + i;
            buttons.innerHTML = `<input type="button" id="Likes" value="${data[i].likes} likes" onclick="Like(${data[i].id})">
            <input type="button" id="Dislike" value="${data[i].dislikes} dislikes" onclick="Dislike(${data[i].id})">
            <input type="button" id="Comment" value="${data[i].comments} comments" onclick="BeginComment(${data[i].id})">
            <hr>`
            document.getElementById("post " + data[i].id).appendChild(buttons);
        }
    });
}