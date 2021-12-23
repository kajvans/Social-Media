$(document).ready(function () {
if(sessionStorage.getItem("id") == null){
    //TODO create pop up for login and register
    location.href = '/Social/html/login'
}
});