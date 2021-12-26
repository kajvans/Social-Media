$(document).ready(function () {
    $('#UserSearchBar').bind('input', function () {
        var content = $("#UserSearchBar").val();

        if (content != "") {
            $.post("/Social/php/Search.php", { Searchuser: content }, function (data) {

                document.getElementById("SearchResults").innerHTML = '';
                if (data != "") {
                    data = JSON.parse(data);
                    for (let i = 0; i < data.length; i++) {
                        let Main = document.createElement("li");
                        Main.id = "SearchHit" + (i + 1);
                        Main.innerHTML = `<button id='NameDisplay' onclick='ShowProfilePage(${data[i].id})'> ${data[i].name} </button>`;
                        document.getElementById("SearchResults").appendChild(Main);
                    }
                }

                else {
                    let Main = document.createElement("li");
                    Main.id = "SearchHit";
                    Main.innerHTML = "No users with that name";
                    document.getElementById("SearchResults").appendChild(Main);
                }

            });
        }
        else {
            document.getElementById("SearchResults").innerHTML = '';
        }
    });
});