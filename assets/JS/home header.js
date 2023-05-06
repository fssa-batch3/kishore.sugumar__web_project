const myOrigin = window.location.origin;
const logoSrc = `${myOrigin}/assets/img/illustration/logo.png`;
const profilepage = `${myOrigin}/pages/buyer profile.html`;
const home = `${myOrigin}/index.html`;

const beforelogin = `
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
    <div  class="serc">
        <input type="search" id="searchFeild" class="search" placeholder="Search....">
        <button class="button4" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <div class="account-btn">
        <button class="button1" type="button" id="signin">
            sign in
        </button>
        <button class="button2" type="button" id="signup">
            sign up
        </button>
    </div>
`;

const AfterLogin = ` 
    <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
<div class="serc">
    <input type="search" id="searchFeild" class="search" placeholder="Search....">
    <button class="button4" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
<a href="${profilepage}"><img class="profile-img" id="profile-img"></a>
`;

function home_Header() {
  const userId = JSON.parse(localStorage.getItem("unique_id"));
  const logheader = document.getElementById("header");
  if (!userId) {
    logheader.innerHTML = beforelogin;
  } else {
    logheader.innerHTML = AfterLogin;

    const user_data = JSON.parse(localStorage.getItem("user_data"));

    const userImage = user_data.find((userid) => userid.email === userId);

    const photo = document.querySelector(".profile-img");

    photo.setAttribute("src", userImage.image);
    photo.setAttribute("alt", `${userImage.name}Image`);
  }
}

function signinOn() {
  document.getElementById("overlay").style.display = "block";
}

function signupOn() {
  document.getElementById("register").style.display = "block";
}

// ---------------------------------search--------------------------------//
function search() {
  const ProductArray = JSON.parse(localStorage.getItem("product_data"));
  const searchElement = document.getElementById("searchFeild").value.trim();

  if (searchElement === "") {
    return;
  }

  let product;

  const body = document.querySelector("body");
  const value = body.getAttribute("id");

  if (value === "home") {
    product = ProductArray.filter((u) => {
      const productName = u.name.toLowerCase();
      const category = u.category.toLowerCase();
      const searchWord = searchElement.toLowerCase();
      return productName.includes(searchWord) || category === searchWord;
    });
  }

  if (value === "Categorised") {
    const category_prod = new URLSearchParams(window.location.search).get(
      "Category"
    );
    const CategoryArray = ProductArray.filter((c) => {
      return c.category === category_prod; // add a return statement here
    });

    product = CategoryArray.filter((p) => {
      const productName = p.name.toLowerCase();
      const searchWord = searchElement.toLowerCase();
      return productName.includes(searchWord);
    });
  }

  const productBOx = document.querySelector("#SearchedProductArea");
  const searchedProductBox = document.querySelector("#SearchedProductBox");
  searchedProductBox.innerHTML = "";

  if (product.length === 0) {
    productBOx.setAttribute("style", "display:none");
    const result = document.querySelector("#result");
    result.className = "show";
    setTimeout(function setTimer() {
      result.className = result.className.replace("show", "");
    }, 2000);
  } else {
    productBOx.setAttribute("style", "display:block");

    product.forEach(function productCard(element) {
      const div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      const div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_detail.setAttribute("data-unique", element.unique);
      div_card.append(div_detail);

      const anch = document.createElement("a");
      anch.setAttribute(
        "href",
        `./pages/product page.html?product_id=${element.unique}`
      );
      div_detail.append(anch);

      const image = document.createElement("img");
      image.setAttribute("src", element.image);
      image.setAttribute("alt", `${element.name}Image`);
      image.setAttribute("id", element.unique);
      image.setAttribute("class", "product_img");
      anch.append(image);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = element.name;
      div_detail.append(h3);

      const div_price = document.createElement("div");
      div_price.setAttribute("class", "text-body");
      div_detail.append(div_price);

      const p_price = document.createElement("span");
      div_price.prepend(p_price);

      const p_bold = document.createElement("b");
      p_bold.innerText = "Price:";
      p_price.append(p_bold);

      const p_rate = document.createElement("span");
      p_rate.innerHTML = element.price;
      div_price.append(p_rate);

      const p_currency = document.createElement("span");
      p_currency.innerHTML = " (INR)";
      div_price.append(p_currency);

      searchedProductBox.append(div_card);
    });
  }
}
// --------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function openLoader() {
  home_Header();
  search();

  const signinButton = document.getElementById("signin");
  if (signinButton) {
    signinButton.addEventListener("click", signinOn);
  }

  const signupButton = document.getElementById("signup");
  if (signupButton) {
    signupButton.addEventListener("click", signupOn);
  }

  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", function searchFeat() {
    search();
  });
});
