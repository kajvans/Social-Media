$(document).ready(function () {
    $("#SubmitMain").click(function () {
        var content = $("#content").val();
        $.post("/Social/php/CreatePost.php", { Content: content }, function (data) {
            //location.reload();
            $("#content").value = '';
            data = JSON.parse(data);
            CreatePost(data);
        });
    });

    $("#Submit").click(function () {
        var content = $("#content").val();
        $.post("/Social/php/CreatePost.php", { Content: content }, function (data) {
            //location.reload();
            $("#content").value = '';
        });
    });
});

function CreatePost(data){
    i = 0;
    var Date = data[i].created;

    let Button = document.createElement("div");
    Button.id = "But " + data[i].id;
    Button.className = "PostButton";
    Button.onclick = function (){event.stopPropagation(window.location.href=`Post?/${data[i].name}/${data[i].id}`)}
    document.getElementById("Posts").prepend(Button);

    let Main = document.createElement("div");
    Main.id = "post " + data[i].id;
    document.getElementById(`But ${data[i].id}`).appendChild(Main);

    let info = document.createElement("div");
    info.id = "Post Info " + i;
    document.getElementById("post " + data[i].id).appendChild(info);

    info.innerHTML = `<button class='SameLine' id='NameDisplay' onclick="event.stopPropagation(window.location.href='Profile?${data[i].name}')">${data[i].name}</button>`

    if (Date >= 60) {
        Date = Math.floor(Date / 60);
        if (Date >= 24) {
            Date = Math.floor(Date / 24)
            info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} days ago</span> <br><br>`
            if(Date >= 30){
                Date = Math.floor(Date / 30)
                info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} months ago</span> <br><br>`
            }
        } else {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} hours ago</span> <br><br>`
        }
    } else {
        if (Date < 1) {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; less than a minutes ago</span> <br><br>`
        } else {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} minutes ago</span> <br><br>`
        }
    }

    let content = document.createElement("div");
    content.id = "Content " + i;
    document.getElementById("post " + data[i].id).appendChild(content);
    let text = document.createElement("p");
    text.id = "Header";
    text.style = "text-align: left; font-size: 110%; font-weight: 110%;";
    text.innerText = `${data[i].content}`;
    document.getElementById("Content " + i).appendChild(text);

    let buttons = document.createElement("div");
    buttons.id = "Buttons " + i;
    buttons.innerHTML = `<input type="button" id="Likes ${data[i].id}" value="${data[i].likes} likes" onclick="event.stopPropagation(Like(${data[i].id}))">
    <input type="button" id="Dislike ${data[i].id}" value="${data[i].dislikes} dislikes" onclick="event.stopPropagation(Dislike(${data[i].id}))">
    <input type="button" id="Comment ${data[i].id}" value="${data[i].comments} comments" onclick="event.stopPropagation(BeginComment(${data[i].id}))">
    <hr>`
    document.getElementById("post " + data[i].id).appendChild(buttons);
}