$(document).ready(function () {
    var data = [];
    $.get("/Social/php/GetPost.php", function (data) {
        //location.reload();
        data = JSON.parse(data);

        for (let i = 0; i < data.length; i++) {
            let Main = document.createElement("div");
            Main.id = "post " + data[i].id;
            document.getElementById("Posts").appendChild(Main);

            let info = document.createElement("div");
            info.id = "Post Info " + i;
            document.getElementById("post " + data[i].id).appendChild(info);

            info.innerHTML = `<span class='SameLine' id='NameDisplay'> <a>${data[i].name}</a> 
            </span> <span class='SameLine' id='TimePassed'> 
            &nbsp; ${data[i].created}</span> <br><br>`

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
});