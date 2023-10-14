
//----------------------------error message-----------------------//
function errorBox(errorMessage) {
  var snackArea = document.getElementById("error");
  snackArea.className = "show";
  var message = document.getElementsByClassName("messSpan")[0];
  message.textContent = errorMessage;
  setTimeout(function () {
    snackArea.className = snackArea.className.replace("show", "");
  }, 3000);
}
// -------------------------------------------//
const userEmail = JSON.parse(sessionStorage.getItem("email"));

if (!userEmail) {
  errorBox('User email is missing.');
} else {
  const proflieFetch = `${serverPath}/home/profile?userEmail=${userEmail}`;

  fetch(proflieFetch, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    })
    .then((data) => {
      if (data.statusCode === 200) {
        updateUserInfo(data.data.user);
        updateProductList(data.data.products);
      } else if (data.statusCode === 500) {
        window.location.href = "../error/500error.html";
      } else {
        let errorMessage = '';
        if (data.statusCode === 400) {
          errorMessage = data.message;
          errorBox(errorMessage);
        } else {
          errorMessage = 'An unknown error occurred.';
        }
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}


function updateUserInfo(user) {
  document.getElementById("user_name").textContent = user.name;
  document.getElementById("user_email").textContent = user.email;
  document.getElementById("user_phone").textContent = user.number;
  document.getElementById("user_location").textContent = user.location || "Location";

  const profileImage = document.getElementById("user-img");
  profileImage.setAttribute("src", user.image || "https://iili.io/JH5FmAJ.jpg");
  profileImage.setAttribute("alt", `${user.name} Image`);

  document.getElementById("name").value = user.name;
  document.getElementById("email").innerText = user.email;
  document.getElementById("phone").value = user.number;
  document.getElementById("location").value = user.location || "";
}

function updateProductList(products) {
  if (products != null) {
    const productContainer = document.querySelector("div.box");
    products.forEach(function (element) {
      if (element.status == 'a') {
        let div_card = createProductCard(element);
        productContainer.append(div_card);
      } else {
        let div_card = soldProductCard(element);
        productContainer.append(div_card);
      }
    });
  }
}

function createProductCard(element) {
  const div_card = document.createElement("div");
  div_card.classList.add("content");

  const image = document.createElement("img");
  if (element.asset != null) {
    image.setAttribute("src", element.asset);
  } else {
    image.setAttribute("src", "https://iili.io/JJTtQaa.jpg");
  }
  image.setAttribute("alt", `${element.ProductName} Image`);
  image.classList.add("product-img");
  div_card.append(image);

  const h2 = document.createElement("h3");
  h2.setAttribute("class", "prod_name");
  h2.setAttribute("id", "prod_name");
  h2.textContent = element.ProductName;
  div_card.append(h2);

  const anch = document.createElement("a");
  anch.setAttribute(
    "href",
    `./accept offer.html?product_id=${element.productId}`
  );
  div_card.append(anch);

  const button1 = document.createElement("button");
  button1.classList.add("button1", "algn");
  button1.textContent = "offers";
  anch.append(button1);

  const anc = document.createElement("a");
  anc.setAttribute(
    "href",
    `./seller product.html?product_id=${element.productId}`
  );
  div_card.append(anc);

  const button3 = document.createElement("button");
  button3.classList.add("button2", "algn");
  button3.textContent = "View";
  anc.append(button3);

  const button_remove = document.createElement("div");
  div_card.append(button_remove);

  const button2 = document.createElement("button");
  button2.classList.add("button3", "remo");
  button2.setAttribute("product_id", element.productId);
  button2.textContent = "Remove";
  button2.setAttribute("id", "remove");
  button2.setAttribute("type", "button");
  button2.addEventListener("click", async function () {
    if (window.confirm("Do you want to delete your product")) {
      const id = button2.getAttribute("product_id");
      await del(id);
    } else {
      return;
    }
  });

  button_remove.append(button2);
  return div_card;
}

function soldProductCard(element) {
  const div_card = document.createElement("div");
  div_card.classList.add("content");

  const image = document.createElement("img");
  if (element.asset != null) {
    image.setAttribute("src", element.asset);
  } else {
    image.setAttribute("src", "https://iili.io/JJTtQaa.jpg");
  }
  image.setAttribute("alt", `${element.ProductName} Image`);
  image.classList.add("product-img");
  div_card.append(image);

  const h2 = document.createElement("h3");
  h2.setAttribute("class", "prod_name");
  h2.setAttribute("id", "prod_name");
  h2.textContent = element.ProductName;
  div_card.append(h2);

  const sold = document.createElement("p");
  sold.setAttribute("class", "sold");
  sold.textContent = "SOLD";
  div_card.append(sold);

  const anc = document.createElement("a");
  anc.setAttribute(
    "href",
    `./after accept offer.html?id=${element.bid_id}&sold=yes`
  );
  div_card.append(anc);

  const button3 = document.createElement("button");
  button3.classList.add("button2", "remo");
  button3.textContent = "View Buyer";
  anc.append(button3);

  return div_card;
}



//------------------------------------image--------------------------------//

const imageFileInput = document.getElementById('imageFile');
const imageUrlInput = document.getElementById('imageUrl');

imageFileInput.addEventListener('change', async () => {
  const selectedFile = imageFileInput.files[0];

  if (selectedFile) {
    try {
      await uploadImage(selectedFile);
    } catch (error) {
      alert('Image upload failed. Please try again.');
    }
  } else {
    alert('Please select a file.');
  }
});


async function uploadImage(imageFile) {
  const url = 'https://image-cdn.p.rapidapi.com/upload?async=true&allow-webp=true&compression=auto';
  const data = new FormData();
  data.append('image', imageFile);

  const options = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': '4e4971d5femsh15cccdf4ec7e51ep156636jsn8731acf769c2',
      'X-RapidAPI-Host': 'image-cdn.p.rapidapi.com'
    },
    body: data
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const jsonResult = await response.json();
      const imageSrc = jsonResult.url + "";
      await changeImage(imageSrc);
    } else {
      console.error('HTTP error:', response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

async function changeImage(image) {
  const updateImage = `${serverPath}/home/profile`;

  const email = JSON.parse(sessionStorage.getItem("email"));

  try {
    const response = await fetch(updateImage, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, email }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.statusCode === 200) {
      alert("Image changed");
      sessionStorage.setItem("image", json.stringify(image));
      window.location.reload();
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//------------------------edit profile--------------------------------------//

function nameValidation(name) {
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  return nameRegex.test(name);
}

function numberValidation(phone) {
  const phoneRegex = /[6-9]\d{9}/;
  return phoneRegex.test(phone);
}

async function updateProfile() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").innerText;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;

  if (name === "" || phone === "" || location === "") {
    alert("Fill all the fields");
    return;
  }

  if (!nameValidation(name)) {
    return alert("Use only alphabets");
  }

  if (!numberValidation(phone)) {
    return alert("Invalid phone number format (Use only number and number should start with (6,7,8,9).)");
  }

  const user_detail = {
    name: name,
    email: email,
    number: parseInt(phone, 10),
    location: location,
  };

  const updateUser = `${serverPath}/home/update`;

  try {
    const response = await fetch(updateUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_detail),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.statusCode === 200) {
      alert("Edited Successfully");
      window.location.reload();
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const updateButton = document.getElementById("update");
updateButton.addEventListener("click", async function () {
  await updateProfile();
});

// -------------------------delete product-----------------------//

async function del(id) {

  const deleteProduct = `${serverPath}/home/profile/productdetail/delete?productId=${id}`;

  try {
    const response = await (
      fetch(deleteProduct, {
        method: 'GET',
      })
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    if (result.statusCode === 200) {
      window.location.reload();
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


// -------------------------log out profile-----------------------//
function logout() {
  const response = window.confirm("Do you want to log out?");
  if (response) {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("image");
    window.location.href = "../index.html";
  }
}

window.addEventListener("load", function exit() {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", logout);
});
// ------------------------------------//

const addProdBtn = document.getElementById("addprod");
addProdBtn.addEventListener("click", function addprod() {
  window.location.href = "./add product.html";
});

const formOnBtn = document.getElementById("form_on");
formOnBtn.addEventListener("click", function form_on() {
  document.getElementById("overlay").style.display = "block";
});

const formOffBtn = document.getElementById("form_off");
formOffBtn.addEventListener("click", function form_off() {
  document.getElementById("overlay").style.display = "none";
});

//--------------------------------------------------------------//
function showRequirement(inputId) {
  const requirementMessage = getRequirementMessage(inputId);
  const requirementElement = document.getElementById(inputId + '-requirement');
  if (requirementElement) {
    requirementElement.textContent = requirementMessage;
  }
}

function clearRequirement() {
  const requirements = document.querySelectorAll('.requirement');
  requirements.forEach((requirement) => {
    requirement.textContent = '';
  });
}

function getRequirementMessage(inputId) {

  if (inputId === 'name') {
    return 'Use only alphabets. eg( Joe )';
  } else if (inputId === 'number') {
    return 'Use only number.';
  } else if (inputId === 'location') {
    return 'Enter your location.';
  }
}
// // ------------------------------------------------------//

// const messageArray = JSON.parse(localStorage.getItem("messageArray"));
// const messager = JSON.parse(localStorage.getItem("unique_id"));
// const button = document.querySelector("#MessageButton");

// if (!messageArray) {
//   button.setAttribute("style", "display:none;");
// } else {
//   const productMessages = messageArray.filter((p) => p.buyerId === messager)

//   if (productMessages.length > 0) {
//     button.setAttribute("style", "display:block;");
//   } else {
//     button.setAttribute("style", "display:none;");
//   }
// }

// // ------------------------------------------------------//

// const messageButton = document.getElementById("MessageButton");
// messageButton.addEventListener("click", function MessageButton() {
//   const messagesArray = JSON.parse(localStorage.getItem("message"));
//   const messagerId = JSON.parse(localStorage.getItem("unique_id"));
//   const productData = JSON.parse(localStorage.getItem("product_data"));
//   const imageArray= JSON.parse(localStorage.getItem("images"));
//   const messageBox = document.querySelector(".messegedProductBox");
//   messageBox.setAttribute("style", "display:block");
//   button.setAttribute("style", "display:none");

//   const productMessages = messageArray.filter((p) => p.buyerId === messager)

//   const MessageBoxHeading = document.createElement("h1");
//   if (productMessages !== []) {
//     MessageBoxHeading.innerHTML = "Your messages";
//   }
//   messageBox.append(MessageBoxHeading);

//   const messageArea = document.createElement("div");
//   messageArea.setAttribute("class", "messageBox");
//   messageBox.append(messageArea);

//   productMessages.forEach((element) => {
//     const product = productData.find((p) => p.unique === element.productId);
//     const div_card = document.createElement("div");
//     div_card.setAttribute("data-unique", product.unique);
//     div_card.classList.add("content");

//     const productImage = imageArray.find((i) => i.unique === product.unique);

//     const image = document.createElement("img");
//     image.setAttribute("src", productImage.image1);
//     image.setAttribute("alt", `${product.name} Image`);
//     image.classList.add("product-img");
//     div_card.append(image);

//     const h2 = document.createElement("h2");
//     h2.setAttribute("class", "prod_name");
//     h2.setAttribute("id", "prod_name");
//     h2.textContent = product.name;
//     div_card.append(h2);

//     const anch = document.createElement("a");
//     anch.setAttribute(
//       "href",
//       `./product page.html?product_id=${product.unique}`
//     );
//     div_card.append(anch);

//     const button1 = document.createElement("button");
//     button1.classList.add("button1", "button");
//     button1.textContent = "Message";
//     anch.append(button1);

//     document.querySelector("div.messageBox").append(div_card);
//   });
// });

// -------------------------delete profile-----------------------//
// const deleteButton = document.getElementById("del");
// deleteButton.addEventListener("click", function del() {
//   const users = JSON.parse(localStorage.getItem("user_data"));
//   const unique = JSON.parse(localStorage.getItem("unique_id"));
//   const productArray = JSON.parse(localStorage.getItem("product_data"));
//   const wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
//   const bid = JSON.parse(localStorage.getItem("bid"));

//   const index = users.findIndex((user) => user.email === unique);
//   if (index !== -1) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete your account"
//     );
//     if (confirmed) {
//       users.splice(index, 1);
//       localStorage.setItem("user_data", JSON.stringify(users));

//       const filterProducts = products.filter(
//         (product) => product.user_id !== unique
//       );
//       localStorage.setItem("product_data", JSON.stringify(filterProducts));

//       if (wishlistArray) {
//         const wish_list = wishlistArray.filter(
//           (wishlistData) => wishlistData.user_id !== unique
//         );
//         localStorage.setItem("wishlist", JSON.stringify(wish_list));
//       }
//       if (bid) {
//         const bid_list = bid.filter(
//           (bidListData) => bidListData.buyer_id !== unique
//         );
//         localStorage.setItem("bid", JSON.stringify(bid_list));
//       }

//       localStorage.removeItem("unique_id");

//       window.location.href = "../index.html";
//     }
//   }
// });