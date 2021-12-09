function PostLike(id){
    var user = sessionStorage.getItem("id");
    $.post("/Social/php/Like.php", { Id: id, User: user}, function (data) {
        console.log(data);
    });  
}