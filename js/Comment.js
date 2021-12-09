function PostComment(id, comment){
    $(document).ready(function () {
        var user = sessionStorage.getItem("id");
        $.post("/Social/php/Comment.php", { Content: comment, id: user, Postid: id }, function (data) {
            //location.reload();
            console.log(data);
        });
    });
}
