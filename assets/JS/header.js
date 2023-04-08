var myOrigin = window.location.origin;
var buyer_img = myOrigin + "/assets/img/buyer.png"
var logoSrc = myOrigin + "/assets/img/illustration/logo.png";
var profilepage = myOrigin + "/pages/buyer profile.html";
var home = myOrigin + "/index.html";


let beforelogin =
    `
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <div  class="serc">
        <input type="search" id="search" class="search" placeholder="Search....">
        <button class="button4"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <div class="account-btn">
        <button class="button1" onclick="on()">
            sign in
        </button>
        <button class="button2" onclick="show_on()">
            sign up
        </button>
    </div>
`;

let AfterLogin =
    ` 
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
<div class="serc">
    <input type="search" id="search" class="search" placeholder="Search....">
    <button class="button4"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
<a href="${profilepage}"><img class="profile-img" id="profile-img"></a>
`;

let beforeloginNew =
    `<a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <h2 class="web-name">V A N H A</h2>
    <div class="account-btn">
        <button class="button1" onclick="on()">
            sign in
        </button>
        <button class="button2" onclick="show_on()">
            sign up
        </button>
    </div>
`;
let AfterLoginNew =
    ` 
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <h2 class="web-name">V A N H A</h2>
    <a href="${profilepage}"><img class="profile-img"></a>
`;
function home_Header() {
    let userId = JSON.parse(localStorage.getItem("unique_id"));
    let logheader = document.getElementById('header');
    if (!userId) {
        logheader.innerHTML = beforelogin;
    }
    else {
        logheader.innerHTML = AfterLogin;

        let user_data = JSON.parse(localStorage.getItem("user_data"));

        let userImage = user_data.find((userid) => userid.email === userId);

        let photo = document.querySelector(".profile-img");

        photo.setAttribute("src", userImage.image);
        photo.setAttribute("alt", userImage.name + "Image");
    }
}

function allheader() {
    let userId = JSON.parse(localStorage.getItem("unique_id"));
    let nextheader = document.getElementById("header");
    if (!userId) {
        nextheader.innerHTML = beforeloginNew;
    } else {
        nextheader.innerHTML = AfterLoginNew;

        let user_data = JSON.parse(localStorage.getItem("user_data"));

        let userImage = user_data.find((userid) => userid.email === userId);

        let photo = document.querySelector(".profile-img");

        photo.setAttribute("src", userImage.image);
        photo.setAttribute("alt", userImage.name + "Image");
    }
}
