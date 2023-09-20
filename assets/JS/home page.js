// --------------------product card -------------------//

const uri = 'http://localhost:8080/vanhaweb/home';

const user = sessionStorage.getItem('email');
const headers = {
  'Content-Type': 'application/json',
};

if (user) {
  headers['Authorization'] = `Bearer ${user}`;
}

fetch(uri, {
  method: 'GET',
  headers: headers,
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const loadData = data["data"];

    function createProductCard(product) {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardDetails = document.createElement("div");
      cardDetails.classList.add("card-details");
      cardDetails.setAttribute("data-unique", product.productId);
      card.appendChild(cardDetails);

      const productLink = document.createElement("a");
      productLink.href = `./pages/product page.html?productId=${product.productId}`;
      cardDetails.appendChild(productLink);

      const productImage = document.createElement("img");
      productImage.src = product.asset;
      productImage.alt = `${product.ProductName} Image`;
      productImage.classList.add("product_img");
      productLink.appendChild(productImage);

      const productName = document.createElement("h3");
      productName.classList.add("text-title");
      productName.textContent = product.ProductName;
      cardDetails.appendChild(productName);

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("text-body");
      cardDetails.appendChild(priceDiv);

      const priceSpan = document.createElement("span");
      priceDiv.appendChild(priceSpan);

      const priceBold = document.createElement("b");
      priceBold.textContent = "Price:";
      priceSpan.appendChild(priceBold);

      const priceValue = document.createElement("span");
      priceValue.innerHTML = `${product.price} (INR)`;
      priceDiv.appendChild(priceValue);

      const locationDiv = document.createElement("div");
      locationDiv.classList.add("text-body");
      cardDetails.appendChild(locationDiv);

      const locationSpan = document.createElement("div");
      locationDiv.appendChild(locationSpan);

      const sellerInfo = document.createElement("div");
      sellerInfo.classList.add("sellerInfo");
      card.appendChild(sellerInfo);

      const sellerImage = document.createElement("img");
      sellerImage.src = product.SellerImage;
      sellerImage.alt = `${product.sellerName} Image`;
      sellerImage.classList.add("seller_img");
      sellerInfo.appendChild(sellerImage);

      const sellerDetails = document.createElement("div");
      sellerInfo.appendChild(sellerDetails);

      const sellerNameSpan = document.createElement("div");
      sellerNameSpan.innerHTML = `<b>Seller:</b> ${product.sellerName}`;
      sellerDetails.appendChild(sellerNameSpan);

      const sellerLocationSpan = document.createElement("div");
      sellerLocationSpan.innerHTML = `<b>Location:</b> ${product.sellerLocation}`;
      sellerDetails.appendChild(sellerLocationSpan);

      document.querySelector("div.grid-container").appendChild(card);
    }

    loadData.forEach(createProductCard);
  })

// --------------category---------//
const links = document.querySelectorAll(
  'a[href^="./pages/sub product list.html?Category="]'
);

links.forEach((link) => {
  const category = link.querySelector("p").getAttribute("value");
  const url = `./pages/sub product list.html?Category=${category}`;
  link.setAttribute("href", url);
});

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

// ---------------------------load more---------------------------//
const cards = document.getElementsByClassName("card");
const loadMoreBtn = document.getElementById("loadmore");
let currentIndex = 8;

for (let i = 0; i < cards.length; i++) {
  if (i >= currentIndex) {
    cards[i].style.display = "none";
  }
}
loadMoreBtn.addEventListener("click", function loader() {
  for (let i = currentIndex; i < currentIndex + 8; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
  currentIndex += 8;
  if (currentIndex >= cards.length) {
    loadMoreBtn.style.display = "none";
  }
});
// -----------------------------show password-----------------------------//
const passwordInput = document.getElementById('password');
const newpPassword = document.getElementById('regi_password');
const confirmPassword = document.getElementById('c_password');
const showPasswordSignup = document.getElementById('showPassword1');
const showPasswordLogin = document.getElementById('showPassword2');

showPasswordSignup.addEventListener('change', function () {
  if (showPasswordSignup.checked || showPasswordLogin.checked) {
    newpPassword.type = 'text';
    confirmPassword.type = 'text';
  } else {
    newpPassword.type = 'password';
    confirmPassword.type = 'password';
  }
});

showPasswordLogin.addEventListener('change', function () {
  if (showPasswordLogin.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

// --------------------------login------------------------------//


async function log_in(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginUrl = 'http://localhost:8080/vanhaweb/home/login';

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      console.log(response);
    }

    const data = await response.json();

    if (data.data != null) {
      const vara = document.getElementById("snackbar");
      vara.className = "show";
      setTimeout(function setTimer() {
        vara.className = vara.className.replace("show", "");
        window.location.reload();
      }, 2000);

      console.log(JSON.stringify(data.data));

      if(JSON.stringify(data.data.image) === "null"){
        sessionStorage.setItem("image", null);   
      }else{
      sessionStorage.setItem("image", JSON.stringify(data.data.image));
      }
      sessionStorage.setItem("email", JSON.stringify(data.data.email));
      window.location.reload();
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById("login_form").addEventListener("click", log_in);

// ------------------------register-----------------------------//
async function register(event) {
  event.preventDefault();
  const applicantpassword = document.getElementById("regi_password").value;
  const c_password = document.getElementById("c_password").value;

  if (applicantpassword !== c_password) {
    alert("Passwords do not match");
    return;
  }

  const applicantName = document.getElementById("regi_name").value;
  const applicantemail = document.getElementById("regi_email").value
  const applicantnumber = document.getElementById("regi_phone").value
  const applicantlocation = document.getElementById("regi_location").value

  function nameValidation(applicantName) {
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (!nameRegex.test(applicantName)) {
      alert("Use only alphabets");
      return false;
    }
    return true;
  }

  function emailValidation(applicantemail) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(applicantemail)) {
      alert("Use proper email");
      return false;
    }
    return true;
  }

  function numberValidation(applicantnumber) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(applicantnumber)) {
      alert("Invalid phone number format (Use only number and number should start with (6,7,8,9).)");
      return false;
    }
    return true;
  }

  function passwordValidation(applicantpassword) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+\-]).{8,24}$/;
    if (!passwordRegex.test(applicantpassword)) {
      alert("Password must contain at least one uppercase, one lowercase, one special character, and numbers. It should contain 8 characters (e.g., ABde12!#)");
      return false;
    }
    return true;
  }

  function locationValidation(applicantlocation) {
    const locationRegex =
      /^[A-Za-z0-9\s,'.-]+$/;
    if (!locationRegex.test(applicantlocation)) {
      alert("User proper location (e.g., NewYork, USA)");
      return false;
    }
    return true;
  }

  if (
    !nameValidation(applicantName) ||
    !emailValidation(applicantemail) ||
    !numberValidation(applicantnumber) ||
    !passwordValidation(applicantpassword) ||
    !locationValidation(applicantlocation)
  ) {
    return;
  }

  const user_detail = {
    name: applicantName,
    email: applicantemail,
    number: parseInt(applicantnumber, 10),
    password: applicantpassword,
    location: applicantlocation,
  };

  console.log(user_detail);


  const registerUser = 'http://localhost:8080/vanhaweb/home/user/create';

  try {
    const response = await fetch(registerUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_detail),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      console.log(response);
    }

    const data = await response.json();

    console.log(data);
    if (data.data != null) {
      sessionStorage.setItem("email", JSON.stringify(data.data.email));
      sessionStorage.setItem("image", null);
      alert("Register Successfully");
      window.location.reload();
    } else {
      alert("Register failed");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById("registerForm").addEventListener("submit", register);

//--------------------------------------------------------------------------//