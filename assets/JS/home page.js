// --------------category---------//
const links = document.querySelectorAll(
  'a[href^="./pages/sub product list.html?Category="]'
);

links.forEach((link) => {
  const category = link.querySelector("p").getAttribute("value");
  const url = `./pages/sub product list.html?Category=${category}`;
  link.setAttribute("href", url);
});
// --------------------product card -------------------//
const prod = JSON.parse(localStorage.getItem("product_data")).reverse();
const unique = JSON.parse(localStorage.getItem("unique_id"));

const product = prod.filter((u) => u.user_id !== unique);

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

  document.querySelector("div.grid-container").append(div_card);
});

// ---------load more--------//
const cards = document.getElementsByClassName("card");
const loadMoreBtn = document.getElementById("loadmore");
let currentIndex = 6;

for (let i = 0; i < cards.length; i++) {
  if (i >= currentIndex) {
    cards[i].style.display = "none";
  }
}
loadMoreBtn.addEventListener("click", function loader() {
  for (let i = currentIndex; i < currentIndex + 6; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
  currentIndex += 6;
  if (currentIndex >= cards.length) {
    loadMoreBtn.style.display = "none";
  }
});

// ------------------------register-----------------------------//
function register(event) {
  event.preventDefault();
  const password = document.getElementById("regi_password").value;
  const c_password = document.getElementById("c_password").value;

  if (password !== c_password) {
    alert("Passwords do not match");
    return;
  }

  const user_detail = {
    name: document.getElementById("regi_name").value,
    email: document.getElementById("regi_email").value,
    phone: document.getElementById("regi_phone").value,
    password,
    image: "https://source.unsplash.com/featured/200x200?people",
  };

  const stored_data = JSON.parse(localStorage.getItem("user_data")) || [];
  let idExist = false;

  for (let i = 0; i < stored_data.length; i++) {
    if (user_detail.email === stored_data[i].email) {
      idExist = true;
      break;
    }
  }
  if (idExist) {
    alert("This email is already registered");
    return;
  }

  stored_data.push(user_detail);
  localStorage.setItem("user_data", JSON.stringify(stored_data));
  localStorage.setItem("unique_id", JSON.stringify(user_detail.email));
  window.location.href = "../index.html";
}
document.getElementById("registerForm").addEventListener("submit", register);
// --------------------------login------------------------------//

function log_in(event) {
  event.preventDefault();
  const stored_data = JSON.parse(localStorage.getItem("user_data")) || [];

  const user_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  for (let i = 0; i < stored_data.length; i++) {
    if (
      user_data.email === stored_data[i].email &&
      user_data.password === stored_data[i].password
    ) {
      localStorage.setItem("unique_id", JSON.stringify(user_data.email));
      const vara = document.getElementById("snackbar");
      vara.className = "show";
      setTimeout(function setTimer() {
        vara.className = vara.className.replace("show", "");
        window.location.reload();
      }, 2000);

      return;
    }
  }
  alert("Not able to find the user");
}

document.getElementById("login_form").addEventListener("click", log_in);
// --------------------------------------------//

const signUpForm = document.getElementById("over");
signUpForm.addEventListener("click", function openRegisterPage(event) {
  event.preventDefault();
  document.getElementById("overlay").style.display = "none";
  document.getElementById("register").style.display = "block";
});

const registerPageOff = document.getElementById("show_off");
registerPageOff.addEventListener("click", function show_off(event) {
  event.preventDefault();
  document.getElementById("register").style.display = "none";
});

const aboutPage = document.getElementById("about");
aboutPage.addEventListener("click", function about(event) {
  event.preventDefault();
  window.location.href = "./pages/about us.html";
});

const wishlistLink = document.getElementById("wishlist-link");
wishlistLink.addEventListener("click", function wishlist(event) {
  event.preventDefault();

  const user_unique = JSON.parse(localStorage.getItem("unique_id"));
  if (!user_unique) {
    alert("There is no account please 'Log in'");
  } else {
    window.location.href = "./pages/wish list.html";
  }
});

const bidlistPage = document.getElementById("bidlist");
bidlistPage.addEventListener("click", function bidlist(event) {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem("unique_id"));
  if (!user) {
    alert("There is no account please 'Log in'");
  } else {
    window.location.href = "./pages/bid list.html";
  }
});

const closeButton = document.getElementById("off");
closeButton.addEventListener("click", function off() {
  document.getElementById("overlay").style.display = "none";
});
