function PostDislike(id){
    var user = sessionStorage.getItem("id");
    $.post("/Social/php/Dislike.php", { Id: id, User: user}, function (data) {
        console.log(data);
    });  
}