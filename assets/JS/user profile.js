// -------------------------------------------//
const userEmail = JSON.parse(localStorage.getItem("unique_id"));
const profileImage = document.getElementById("user-img");
const stored_data = JSON.parse(localStorage.getItem("user_data")) || [];

const data = stored_data.find(function findUser(userObject) {
  return userObject.email === userEmail;
});

profileImage.setAttribute("src", data.image);
profileImage.setAttribute("alt", `${data.name} Image`);

document.getElementById("user_name").innerText = data.name;
document.getElementById("user_email").innerText = data.email;
document.getElementById("user_phone").innerText = data.phone;
if (!data.location) {
  document.getElementById("user_location").innerText = "Location";
}
if (data.location) {
  document.getElementById("user_location").innerText = data.location;
}

document.getElementById("name").value = data.name;
document.getElementById("email").innerHTML = data.email;
document.getElementById("phone").value = data.phone;
if (!data.location) {
  document.getElementById("location").value = "";
}
if (data.location) {
  document.getElementById("location").value = data.location;
}
// ------------------------------------------------------//

const messageArray = JSON.parse(localStorage.getItem("message"));
const messager = JSON.parse(localStorage.getItem("unique_id"));
const button = document.querySelector(".messageButton");

if (!messageArray) {
  button.setAttribute("style", "display:none;");
} else {
  const productMessages = messageArray.filter((p) =>
    p.content.some((c) => c.user === messager)
  );

  if (productMessages.length > 0) {
    button.setAttribute("style", "display:block;");
  } else {
    button.setAttribute("style", "display:none;");
  }
}
// ------------------------------------------------------//
const messageButton = document.getElementById("MessageButton");
messageButton.addEventListener("click", function MessageButton() {
  const messagesArray = JSON.parse(localStorage.getItem("message"));
  const messagerId = JSON.parse(localStorage.getItem("unique_id"));
  const productData = JSON.parse(localStorage.getItem("product_data"));
  const messageBox = document.querySelector(".messegedProductBox");
  messageBox.setAttribute("style", "display:block");
  button.setAttribute("style", "display:none");

  const productMessages = messagesArray.filter((p) =>
    p.content.some((c) => c.user === messagerId)
  );

  const MessageBoxHeading = document.createElement("h1");
  if (productMessages !== []) {
    MessageBoxHeading.innerHTML = "Your messages";
  }
  messageBox.append(MessageBoxHeading);

  const messageArea = document.createElement("div");
  messageArea.setAttribute("class", "messageBox");
  messageBox.append(messageArea);

  productMessages.forEach((element) => {
    const product = productData.find((p) => p.unique === element.productId);
    const div_card = document.createElement("div");
    div_card.setAttribute("data-unique", product.unique);
    div_card.classList.add("content");

    const image = document.createElement("img");
    image.setAttribute("src", product.image);
    image.setAttribute("alt", `${product.name} Image`);
    image.classList.add("product-img");
    div_card.append(image);

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "prod_name");
    h2.setAttribute("id", "prod_name");
    h2.textContent = product.name;
    div_card.append(h2);

    const anch = document.createElement("a");
    anch.setAttribute(
      "href",
      `./product page.html?product_id=${product.unique}`
    );
    div_card.append(anch);

    const button1 = document.createElement("button");
    button1.classList.add("button1", "button");
    button1.textContent = "Message";
    anch.append(button1);

    document.querySelector("div.messageBox").append(div_card);
  });
});

// -----------------------------------list-seller-----------------------------------------------//

document.addEventListener("DOMContentLoaded", function sellerProduct() {
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const unique = JSON.parse(localStorage.getItem("unique_id"));

  const products = prod.filter((p) => p.user_id === unique);

  const reverse = products.slice().reverse();

  reverse.forEach(function everyProduct(elements) {
    const div_card = document.createElement("div");
    div_card.setAttribute("data-unique", elements.unique);
    div_card.classList.add("content");

    const image = document.createElement("img");
    image.setAttribute("src", elements.image);
    image.setAttribute("alt", `${elements.name} Image`);
    image.classList.add("product-img");
    div_card.append(image);

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "prod_name");
    h2.setAttribute("id", "prod_name");
    h2.textContent = elements.name;
    div_card.append(h2);

    const anch = document.createElement("a");
    anch.setAttribute(
      "href",
      `./accept offer.html?product_id=${elements.unique}`
    );
    div_card.append(anch);

    const button1 = document.createElement("button");
    button1.classList.add("button1", "algn");
    button1.textContent = "offers";
    anch.append(button1);

    const anc = document.createElement("a");
    anc.setAttribute(
      "href",
      `./seller product.html?product_id=${elements.unique}`
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
    button2.textContent = "Remove";
    button2.setAttribute("id", "remove");
    button_remove.append(button2);

    document.querySelector("div.box").append(div_card);
  });

  document.addEventListener("click", function remove(event) {
    if (event.target.classList.contains("remo")) {
      const uniqueId =
        event.target.parentNode.parentNode.getAttribute("data-unique");
      const storedData = JSON.parse(localStorage.getItem("product_data"));
      const index = storedData.findIndex(
        (productIndex) => productIndex.unique === uniqueId
      );

      if (index !== -1) {
        if (window.confirm("Are you sure you want to remove your product")) {
          storedData.splice(index, 1);
          localStorage.setItem("product_data", JSON.stringify(storedData));
          window.location.reload();
        } else {
          return;
        }
      }
      window.location.reload();
    }
  });
});

// ------------------------edit profile--------------------------------------//
const updateButton = document.getElementById("update");
updateButton.addEventListener("click", function update() {
  const userArray = JSON.parse(localStorage.getItem("user_data"));

  const name = document.getElementById("name").value;
  const user_email = document.getElementById("email").innerText;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;

  let user_data = userArray.find(function findUser(userIndex) {
    return userIndex.email === user_email;
  });

  if (user_data) {
    user_data.name = name;
    user_data.phone = phone;
    user_data.email = user_email;
    user_data.location = location;
  } else {
    user_data = {
      name,
      user_email,
      phone,
      location,
    };
    userArray.push(user_data);
  }

  if (name === "" || user_email === "" || phone === "" || location === "") {
    window.alert("Please fill in all required fields");
    return;
  }

  localStorage.setItem("user_data", JSON.stringify(userArray));
  window.location.reload();
});
// -------------------------delete profile-----------------------//
const deleteButton = document.getElementById("del");
deleteButton.addEventListener("click", function del() {
  const users = JSON.parse(localStorage.getItem("user_data"));
  const unique = JSON.parse(localStorage.getItem("unique_id"));
  const productArray = JSON.parse(localStorage.getItem("product_data"));
  const wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
  const bid = JSON.parse(localStorage.getItem("bid"));

  const products = productArray.filter((product) => product.user_id !== unique);
  localStorage.setItem("product_data", JSON.stringify(products));

  const index = users.findIndex((user) => user.email === unique);
  if (index !== -1) {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account"
    );
    if (confirmed) {
      users.splice(index, 1);
      localStorage.setItem("user_data", JSON.stringify(users));

      const filterProducts = products.filter(
        (product) => product.user_id !== unique
      );

      if (wishlistArray) {
        const wish_list = wishlistArray.filter(
          (wishlistData) => wishlistData.user_id !== unique
        );
        localStorage.setItem("wishlist", JSON.stringify(wish_list));
      }
      if (bid) {
        const bid_list = bid.filter(
          (bidListData) => bidListData.buyer_id !== unique
        );
        localStorage.setItem("bid", JSON.stringify(bid_list));
      }

      localStorage.setItem("product_data", JSON.stringify(filterProducts));

      localStorage.removeItem("unique_id");

      window.location.href = "../index.html";
    }
  }
});
// -------------------------log out profile-----------------------//
function logout() {
  const response = window.confirm("Do you want to log out?");
  if (response) {
    localStorage.removeItem("unique_id");
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
