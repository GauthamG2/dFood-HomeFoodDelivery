$(document).ready(function() {
    //debugger
    console.log(sessionStorage);
    var fullName = JSON.parse(sessionStorage.getItem('userobj')).fullName;
    $('#name').text(fullName);
    var email = JSON.parse(sessionStorage.getItem('userobj')).email;
    $('#email').text(email);
    var birthday = JSON.parse(sessionStorage.getItem('userobj')).birthday;
    $('#birthday').text(birthday);
    var phonenumber = JSON.parse(sessionStorage.getItem('userobj')).phonenumber;
    $('#phonenumber').text(phonenumber);
});