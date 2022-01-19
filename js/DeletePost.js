function PostDelete(id) {
    $(document).ready(function () {
            $.post("/Social/php/DeletePost.php", { Id: id }, function (data) {
                document.getElementById(`But ${id}`).remove();
            });
    });
}
