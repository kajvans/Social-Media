$(document).ready(function () {
    var data = [];
    $.get("/Social/php/GetPost.php", function (data) {
        data = JSON.parse(data);

        for (let i = 0; i < data.length; i++) {
            var Date = data[i].created;

            let Button = document.createElement("div");
            Button.id = "But " + data[i].id;
            Button.className = "PostButton";
            Button.onclick = function (){event.stopPropagation(window.location.href=`Post?/${data[i].name}/${data[i].id}`)}
            document.getElementById("Posts").appendChild(Button);

            let Main = document.createElement("div");
            Main.id = "post " + data[i].id;
            document.getElementById(`But ${data[i].id}`).appendChild(Main);

            let info = document.createElement("div");
            info.id = "Post Info " + i;
            document.getElementById("post " + data[i].id).appendChild(info);

            info.innerHTML = `<button class='SameLine' id='NameDisplay' onclick="event.stopPropagation(window.location.href='Profile?${data[i].name}')">${data[i].name}</button>`

            calculateDate(Date, info);
            SetContent(i, data);
        }
    });
});

function calculateDate(Date, info){
    if (Date >= 60) {
        Date = Math.floor(Date / 60);
        if (Date >= 24) {
            Date = Math.floor(Date / 24);
            console.log(Date);
            if(Date >= 30){
                Date = Math.floor(Date / 30);

                if(Date > 365){
                    Date = Math.floor(Date / 365);
                    if(Date < 2){
                        info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} year ago</span> <br><br>`
                    }

                    else {
                        info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} years ago</span> <br><br>`
                    }
                }

                else if(Date < 2){
                    info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} month ago</span> <br><br>`
                }
    
                else  {
                    info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} months ago</span> <br><br>`
                }
            }

            else if(Date < 2){
                info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} day ago</span> <br><br>`
            }

            else  {
                info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} days ago</span> <br><br>`
            }

        }

        else {
            if(Date < 2){
                info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} hours ago</span> <br><br>`
            }

            else {
                info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} hour ago</span> <br><br>`
            }
        }
    }

    else {
        if (Date < 1) {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; less than a minute ago</span> <br><br>`
        }

        else if(Date = 1) {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} minute ago</span> <br><br>`
        }

        else {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} minutes ago</span> <br><br> `
        }
    }
}

function SetContent(i, data){
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
    buttons.innerHTML = `<input type="button" id="Likes ${data[i].id}" value="${data[i].likes} likes" onclick="event.stopPropagation(PostLike(${data[i].id}))">
    <input type="button" id="Dislike ${data[i].id}" value="${data[i].dislikes} dislikes" onclick="event.stopPropagation(PostDislike(${data[i].id}))">
    <input type="button" id="Comment ${data[i].id}" value="${data[i].comments} comments" onclick="event.stopPropagation(PostComment(${data[i].id}))">`
    if(data[i].Owner == 1){
        buttons.innerHTML += `<input type="button" style="float: right;" id="Delete ${data[i].id}" value="Delete Post" onclick="event.stopPropagation(PostDelete(${data[i].id}))">`
    }

    buttons.innerHTML += `<hr>`
    document.getElementById("post " + data[i].id).appendChild(buttons);
}