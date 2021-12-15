$(document).ready(function () {
    $('#UserSearchBar').bind('input', function() { 
        var content = $("#UserSearchBar").val();
        console.log(content);
        // $.post("/Social/php/Search.php", { Searchuser: content }, function (data) {
        //     data = JSON.parse(data);
        //     //location.reload();
        //     console.log(data);
            
        //     for (let i = 0; i < data.length; i++) {
        //         let Main = document.createElement("li");
        //         Main.id = "SearchHit" + (i + 1);
        //         Main.innerHTML = data[i].name;
        //         document.getElementById("SearchResults").appendChild(Main);
        //     }
        // });
    });
});