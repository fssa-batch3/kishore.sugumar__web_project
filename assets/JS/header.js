var myOrigin = window.location.origin;
var buyer_img = myOrigin + "/assets/img/buyer.png"
var logoSrc = myOrigin + "/assets/img/illustration/logo.png";
var profilepage = myOrigin + "/pages/buyer profile.html";

let beforelogin =
    `
    <img src="${logoSrc}" alt="logo" class="logo">
    <div>
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
<img src="${logoSrc}" alt ="logo" class="logo">
<div>
    <input type="search" id="search" class="search" placeholder="Search....">
    <button class="button4"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
<a href="${profilepage}"><img class="profile-img" id="profile-img"></a>
`;

let beforeloginNew = 
    `<img src="${logoSrc}" alt="logo" class="logo">
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
    <img src="${logoSrc}" alt ="logo" class="logo">
    <h2 class="web-name">V A N H A</h2>
    <a href="${profilepage}"><img class="profile-img"></a>
`;

function home_Header(){
    let userId = JSON.parse(localStorage.getItem("unique_id"));
    let logheader = document.getElementById('header');
    if (!userId) {
      logheader.innerHTML = beforelogin;
    }
    else {
      logheader.innerHTML = AfterLogin;
    }
}

function allheader(){
    let userId = JSON.parse(localStorage.getItem("unique_id"));
    let nextheader = document.getElementById('header');
    if (!userId) {
      nextheader.innerHTML = beforeloginNew;
    }
    else {
      nextheader.innerHTML = AfterLoginNew;
    }
}
