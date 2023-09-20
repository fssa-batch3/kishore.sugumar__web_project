// -------------------------------------------//
const userEmail = JSON.parse(sessionStorage.getItem("email"));

const proflieFetch = 'http://localhost:8080/vanhaweb/home/profile';

const headers = {
  'Content-Type': 'application/json',
};

if (userEmail) {
  headers['Authorization'] = `Bearer ${userEmail}`;
}


fetch(proflieFetch, {
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
    document.getElementById("user_name").innerHTML = data.user.name;
    document.getElementById("user_email").innerHTML = data.user.email;
    document.getElementById("user_phone").innerHTML = data.user.number;
    if (data.user.location === null) {
      document.getElementById("user_location").innerHTML = "Location";
    }
    if (data.user.location) {
      document.getElementById("user_location").innerHTML = data.user.location;
    }

    const profileImage = document.getElementById("user-img");
    if (data.user.image != null) {
      profileImage.setAttribute("src", data.user.image);
    } else {
      profileImage.setAttribute("src", "https://iili.io/JJHvWdu.png");
    }
    profileImage.setAttribute("alt", `${data.user.name} Image`);

    document.getElementById("name").value = data.user.name;
    document.getElementById("email").innerText = data.user.email;
    document.getElementById("phone").value = data.user.number;
    if (data.user.location === null) {
      document.getElementById("location").value = "";
    }
    if (data.user.location) {
      document.getElementById("location").value = data.user.location;
    }
    if (data.products != null) {
      let allProduct = data.products;
      allProduct.forEach(function everyProduct(elements) {
        const div_card = document.createElement("div");
        div_card.classList.add("content");

        const image = document.createElement("img");
        image.setAttribute("src", elements.asset);
        image.setAttribute("alt", `${elements.ProductName} Image`);
        image.classList.add("product-img");
        div_card.append(image);

        const h2 = document.createElement("h3");
        h2.setAttribute("class", "prod_name");
        h2.setAttribute("id", "prod_name");
        h2.textContent = elements.ProductName;
        div_card.append(h2);

        const anch = document.createElement("a");
        anch.setAttribute(
          "href",
          `./accept offer.html?product_id=${elements.productId}`
        );
        div_card.append(anch);

        const button1 = document.createElement("button");
        button1.classList.add("button1", "algn");
        button1.textContent = "offers";
        anch.append(button1);

        const anc = document.createElement("a");
        anc.setAttribute(
          "href",
          `./seller product.html?product_id=${elements.productId}`
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
        button2.setAttribute("product_id", elements.productId);
        button2.textContent = "Remove";
        button2.setAttribute("id", "remove");
        button2.addEventListener("click", async function () {
          const id = button2.getAttribute("product_id");
          await del(id);
        });

        button_remove.append(button2);

        document.querySelector("div.box").append(div_card);
      });

    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

//------------------------------------image--------------------------------//

const imageFileInput = document.getElementById('imageFile');
const imageUrlInput = document.getElementById('imageUrl');

imageFileInput.addEventListener('change', async () => {
  const selectedFile = imageFileInput.files[0];

  if (selectedFile) {
    handleFile(selectedFile);
    try {
      await uploadImage(selectedFile);
    } catch (error) {
      alert('Image upload failed. Please try again.');
    }
  } else {
    alert('Please select a file.');
  }
});

function handleFile(file) {
  if (window.FileReader) {
    const reader = new FileReader();
    reader.onload = function (event) {
      imageUrlInput.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

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
      const imageSrc = jsonResult.url+"";
      await changeImage(imageSrc);
    } else {
      console.error('HTTP error:', response.status);
    }
  } catch (error) {
    console.error(error);
  }
}


async function changeImage(image) {
  const updateImage = 'http://localhost:8080/vanhaweb//home/profile';

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

    if (data.data != null) {
      alert("Image changed");
      window.location.reload();
    } else {
      alert("Updation failed");
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

  console.log(user_detail);

  const updateUser = 'http://localhost:8080/vanhaweb/home/update';

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

    if (data.data != null) {
      alert("Edited Successfully");
      window.location.reload();
    } else {
      alert("Updation failed");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const updateButton = document.getElementById("update");
updateButton.addEventListener("click", async function () {
  await updateProfile();
});

// -------------------------delete profile-----------------------//

async function del(id) {

  const deleteProduct = 'http://localhost:8080/vanhaweb/home/profile/productdetail/delete';

  const headers = {
    'Content-Type': 'application/json',
  };

  if (id != null) {
    headers['Authorization'] = `Bearer ${id}`;
  }

  try {
    const response = await fetch(deleteProduct, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = response;

    if (data.data != 1) {
      window.location.reload();
    } else {
      alert("Deletion failed");
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

// // ------------------------------------------------------//

// const messageArray = JSON.parse(localStorage.getItem("messageArray"));
// const messager = JSON.parse(localStorage.getItem("unique_id"));
// const button = document.querySelector("#MessageButton");

// if (!messageArray) {
//   button.setAttribute("style", "display:none;");
// } else {
//   const productMessages = messageArray.filter((p) => p.buyerId === messager)

//   console.log(productMessages);

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