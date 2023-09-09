// --------------category---------//
const links = document.querySelectorAll(
  'a[href^="./pages/sub product list.html?Category="]'
);

links.forEach((link) => {
  const category = link.querySelector("p").getAttribute("value");
  const url = `./pages/sub product list.html?Category=${category}`;
  link.setAttribute("href", url);
});


// ------------------------register-----------------------------//
function register(event) {
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

  const now = new Date();

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&amp;*_=+-]).{8,24}$/;
    if (!passwordRegex.test(applicantpassword)) {
      alert("Password must contain at least one uppercase, one lowercase, one special character, and numbers. It should contain 8 characters (e.g., ABde12!#)");
      return false;
    }
    return true;
  }

  if (
    !nameValidation(applicantName) ||
    !emailValidation(applicantemail) ||
    !numberValidation(applicantnumber) ||
    !passwordValidation(applicantpassword)
  ) {
    return;
  }

  const user_detail = {
    name: applicantName,
    email: applicantemail,
    phone: applicantnumber,
    applicantpassword,
    image: "https://source.unsplash.com/featured/200x200?people",
    registeredOn: now.getTime(),
    logedOn: now.getTime(),
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

  let time = new Date();

  const user_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  for (let i = 0; i < stored_data.length; i++) {
    if (
      user_data.email === stored_data[i].email &&
      user_data.password === stored_data[i].password
    ) {
      if (stored_data[i].logedOn) {
        stored_data[i].logedOn = time.getTime();
      }
      localStorage.setItem("user_data", JSON.stringify(stored_data));
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

// --------------------product card -------------------//

const uri = 'http://localhost:8080/vanhaweb/home';

fetch(uri, {
  method: 'GET',
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Assuming the response is in JSON format
  })
  .then(data => {
    const loadData = data["data"]; // Assign the JSON data to the loadData variable
    // Handle the JSON data here
    console.log(loadData);

    // Iterate through the data and create product cards
    loadData.forEach(function createProductCard(element) {
      const div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      const div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_detail.setAttribute("data-unique", element.productId);
      div_card.append(div_detail);

      const anch = document.createElement("a");
      anch.setAttribute(
        "href",
        `./pages/product page.html?product_id=${element.productId}`
      );
      div_detail.append(anch);

      const image = document.createElement("img");
      image.setAttribute("src", element.asset);
      image.setAttribute("alt", `${element.ProductName} Image`);
      image.setAttribute("id", element.productId);
      image.setAttribute("class", "product_img");
      anch.append(image);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = element.ProductName;
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

      const LocationSeller = document.createElement("span");
      LocationSeller.innerHTML = element.sellerLocation;
      locationDiv.append(LocationSeller);

      document.querySelector("div.grid-container").append(div_card);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });





// ---------load more--------//
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

// ---------------------------------Image---------------------------------//
const uploadImageButton = document.getElementById("uploadImageButton");
const submitButton = document.getElementById("submitButton");
const imageFileInput = document.getElementById("imageFile");
const imageUrlInput = document.getElementById("imageUrl");
uploadImageButton.addEventListener("click", () => {
  const imageFile = imageFileInput.files[0];
  if (imageFile) {
    uploadImage(imageFile);
  } else {
    alert("Please select an image file.");
  }
});
function uploadImage(imageFile) {
  const url = 'https://image-cdn.p.rapidapi.com/upload?async=true&allow-webp=true&compression=auto';
  const data = new FormData();
  data.append('image', imageFile);
  const options = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': 'your api key',
      'X-RapidAPI-Host': 'image-cdn.p.rapidapi.com'
    },
    body: data
  };
  fetch(url, options)
    .then(response => response.text())
    .then(result => {
      const data = JSON.parse(result);
      const url_value = data['url'];
      imageUrlInput.value = url_value;
      console.log(imageUrlInput);
      console.log(url_value);
      console.log(data);
      submitButton.disabled = false;
    })
    .catch((error) => {
      // Handle any errors here
      console.error('API Error:', error);
    });
} 