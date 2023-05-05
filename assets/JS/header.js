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
  const userId = JSON.parse(localStorage.getItem("unique_id"));
  const nextheader = document.getElementById("header");
  if (!userId) {
    nextheader.innerHTML = beforeloginNew;
  } else {
    nextheader.innerHTML = AfterLoginNew;

    const user_data = JSON.parse(localStorage.getItem("user_data"));

    const userImage = user_data.find((userid) => userid.email === userId);

    const photo = document.querySelector(".profile-img");

    photo.setAttribute("src", userImage.image);
    photo.setAttribute("alt", `${userImage.name}Image`);
  }
}

document.addEventListener("DOMContentLoaded", function openLoader() {
  allheader();
});
