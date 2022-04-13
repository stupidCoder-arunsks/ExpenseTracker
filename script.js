var x = document.getElementById("login");
var y = document.getElementById("signup");
var z = document.getElementById("btn");

function signup() {
    x.style.display="none";
    y.style.display="block";
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    // x.style.background= "linear-gradient(to right,#ff105f,#ffad06)";

    x.style.display="block";
    y.style.display="none";
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
}