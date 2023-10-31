/**
 * This JavaScript file handles the functionality for the home page of a website.
 * It includes functions for rendering the header based on user login status,
 * handling sign-in and sign-up actions, and implementing a search feature.
 */

// Define global constants for URLs
const myOrigin = window.location.origin;
const logoSrc = `${myOrigin}/assets/img/illustration/logo.png`;
const profilepage = `${myOrigin}/pages/buyer profile.html`;
const home = `${myOrigin}/index.html`;

// Define HTML templates for the header before and after login
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

/**
 * Updates the header of the home page based on user login status.
 */
function home_Header() {
    // Retrieve user information from session storage
  const user = JSON.parse(sessionStorage.getItem("email"));
  const image = sessionStorage.getItem("image");
  const nextheader = document.getElementById("header");
   // Check if the user is logged in
  if (!user) {
     // User is not logged in, display the "beforelogin" header
    nextheader.innerHTML = beforelogin;
  } else {
        // User is logged in, display the "AfterLogin" header

    // Check if a user profile image is available
    nextheader.innerHTML = AfterLogin;


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

/**
 * Displays the sign-in overlay.
 */
function signinOn() {
  document.getElementById("overlay").style.display = "block";
}

/**
 * Displays the sign-up form.
 */
function signupOn() {
  document.getElementById("register").style.display = "block";
}

// ---------------------------------search--------------------------------//
/**
 * Perform a search based on user input and update the product list.
 */
function search() {
  const ProductArray = JSON.parse(localStorage.getItem("product_data"));
  const imageArray = JSON.parse(localStorage.getItem("images"));
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
      return c.category === category_prod;
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
      if (value === "home") {
        anch.setAttribute(
          "href",
          `./pages/product page.html?product_id=${element.unique}`
        );
      }
      if (value === "Categorised") {
        anch.setAttribute(
          "href",
          `./product page.html?product_id=${element.unique}`
        );
      }
      div_detail.append(anch);

      const productImage = imageArray.find((i) => i.unique === element.unique)

      const image = document.createElement("img");
      if(productImage.image1 === undefined){
        image.setAttribute("src", "https://iili.io/JH5FmAJ.jpg");
      }else{
      image.setAttribute("src", productImage.image1);
      }
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

      const locationDiv = document.createElement("div");
      locationDiv.setAttribute("class", "text-body");
      div_detail.append(locationDiv);

      const LocationSpan = document.createElement("span");
      locationDiv.prepend(LocationSpan);

      const locationHeading = document.createElement("b");
      locationHeading.innerText = "Location:";
      LocationSpan.append(locationHeading);

      const sellerId = userArray.find((u) => u.email === element.user_id);

      const LocationBuyer = document.createElement("span");
      LocationBuyer.innerHTML = sellerId.location;
      locationDiv.append(LocationBuyer);

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
