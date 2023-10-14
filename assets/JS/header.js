//--------------header-------------//
const myOrigin = window.location.origin;
const logoSrc = `${myOrigin}/assets/img/illustration/logo.png`;
const profilepage = `${myOrigin}/pages/buyer profile.html`;
const home = `${myOrigin}/index.html`;

const beforeloginNew = `<a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <h2 class="web-name">V A N H A</h2>
    <div class="account-btn">
    <a href="${home}"><button class="button1" onclick="moveIn()">
            sign in
        </button></a>
    <a href="${home}"><button class="button2" onclick="moveUp()">
            sign up
        </button></a>
    </div>
`;
const AfterLoginNew = ` 
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <h2 class="web-name">V A N H A</h2>
    <a href="${profilepage}"><img class="profile-img"></a>
`;

function allheader() {
  const user = JSON.parse(sessionStorage.getItem("email"));
  const image = JSON.parse(sessionStorage.getItem("image"));
  const nextheader = document.getElementById("header");
  if (!user) {
    nextheader.innerHTML = beforeloginNew;
  } else {
    nextheader.innerHTML = AfterLoginNew;

    if(image === "null" | image === null){
      const photo = document.querySelector(".profile-img");
      photo.setAttribute("src", "https://iili.io/JH5FmAJ.jpg");
      photo.setAttribute("alt", `your Image`);
    }else{
    const photo = document.querySelector(".profile-img");
    photo.setAttribute("src", image);
    photo.setAttribute("alt", `your Image`);
    }
  }
}

document.addEventListener("DOMContentLoaded", function openLoader() {
  allheader();
});
