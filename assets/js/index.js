//-----------------product card-----------------//
function product() {
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for (let i = 0; i < prod.length; i++) {
    if (unique != prod[i].user_id) {
      let div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      let div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_card.append(div_detail);

      let image = document.createElement("img");
      image.setAttribute("src", "");
      image.setAttribute("alt", "");
      image.setAttribute("class", "product_img");
      div_detail.append(image);

      let h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = prod[i].name;
      div_detail.append(h3);

      let unique = document.createElement("p");
      unique.setAttribute("class", "unique");
      unique.setAttribute("id", "unique");
      unique.innerHTML = prod[i].unique;
      div_detail.append(unique);

      let div_price = document.createElement("div");
      div_price.setAttribute("class", "text-body");
      div_detail.append(div_price);

      let p_price = document.createElement("span");
      div_price.prepend(p_price);

      let p_bold = document.createElement("b");
      p_bold.innerText = "Price:";
      p_price.append(p_bold);

      let p_rate = document.createElement("span");
      p_rate.innerHTML = prod[i].price;
      div_price.append(p_rate);

      let p_currency = document.createElement("span");
      p_currency.innerHTML = " (INR)";
      div_price.append(p_currency);

      document.body.appendChild(div_card);

      document.querySelector("div.grid-container").append(div_card);
    }
  }
}
//------------------------------------product card-------------------------------------------//
function card() {
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for (let i = 0; i < prod.length; i++) {
    if (unique != prod[i].user_id) {
      let div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      let div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_card.append(div_detail);

      let image = document.createElement("img");
      image.setAttribute("src", "");
      image.setAttribute("alt", "");
      image.setAttribute("class", "product_img");
      div_detail.append(image);

      let h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = prod[i].name;
      div_detail.append(h3);

      let unique = document.createElement("p");
      unique.setAttribute("class", "unique");
      unique.setAttribute("id", "unique");
      unique.innerHTML = prod[i].unique;
      div_detail.append(unique);

      let div_price = document.createElement("div");
      div_price.setAttribute("class", "text-body");
      div_detail.append(div_price);

      let p_price = document.createElement("span");
      div_price.prepend(p_price);

      let p_bold = document.createElement("b");
      p_bold.innerText = "Price:";
      p_price.append(p_bold);

      let p_rate = document.createElement("span");
      p_rate.innerHTML = prod[i].price;
      div_price.append(p_rate);

      let p_currency = document.createElement("span");
      p_currency.innerHTML = " (INR)";
      div_price.append(p_currency);

      document.body.appendChild(div_card);

      document.querySelector("#grid-container").append(div_card);
    }
  }
}
// -----------------------------------list-seller-----------------------------------------------//
function list(product) {
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for (let i = 0; i < prod.length; i++) {
    if (unique === prod[i].user_id) {
      {
        div_card = document.createElement("div");
        div_card.classList.add("content");

        image = document.createElement("img");
        image.setAttribute("src", "");
        image.setAttribute("alt", "");
        image.classList.add("product-img");
        div_card.prepend(image);

        h2 = document.createElement("h2");
        h2.setAttribute("class", "prod_name");
        h2.setAttribute("id", "prod_name");
        h2.textContent = prod[i]["name"];
        div_card.append(h2);

        let unique = document.createElement("p");
        unique.setAttribute("class", "unique");
        unique.setAttribute("id", "prod_id");
        unique.innerHTML = prod[i].unique;
        div_card.append(unique);

        button1 = document.createElement("button");
        button1.classList.add("button1", "algn");
        button1.textContent = "offers";
        button1.onclick = function () {
          window.location.href = "./accept offer.html";
        };
        div_card.append(button1);

        button3 = document.createElement("button");
        button3.classList.add("button2", "algn");
        button3.textContent = "Edit";
        button3.onclick = function (event) {
          editform_on();
          update_prod(event, prod[i].unique);
        }
        div_card.append(button3);

        button2 = document.createElement("button");
        button2.classList.add("button3", "algn");
        button2.textContent = "Remove";
        button2.setAttribute("id", "remove");
        button2.onclick = function (event) {
          remove_prod(event, prod[i].unique)
        }
        div_card.append(button2);

        document.querySelector("div.box").append(div_card);
      };
    }
  }
}
//---------------------------wish list--------------------------//
function wish() {
  div_card = document.createElement("div");
  div_card.classList.add("content");

  image = document.createElement("img");
  image.setAttribute("src", "");
  image.setAttribute("alt", "");
  image.classList.add("product-img");
  div_card.prepend(image);

  h1 = document.createElement("h1");
  h1.textContent = "";
  div_card.append(h1);

  button1 = document.createElement("button");
  button1.classList.add("button1", "algn");
  button1.textContent = "Bid";
  div_card.append(button1);

  button2 = document.createElement("button");
  button2.classList.add("button3", "algn");
  button2.textContent = "Remove";
  div_card.append(button2);

  document.querySelector("div.box").append(div_card);

}
//---------------------------bid list---------------------------//
function bid() {
  div_card = document.createElement("div");
  div_card.classList.add("content");

  image = document.createElement("img");
  image.setAttribute("src", "");
  image.setAttribute("alt", "");
  image.classList.add("product-img");
  div_card.prepend(image);

  h1 = document.createElement("h1");
  h1.textContent = "";
  div_card.append(h1);

  button2 = document.createElement("button");
  button2.classList.add("button2", "algn");
  button2.textContent = "Bid more";
  div_card.append(button2);

  document.querySelector("div.box").append(div_card);

}
//-----------------------home page-----------------------------------------//
function show_on() {
  document.getElementById("register").style.display = "block";
}
function show_off() {
  document.getElementById("register").style.display = "none";
}
function back() {
  window.location.href = "../index.html";
}
function profile() {
  let unique = JSON.parse(localStorage.getItem("unique_id"));
  if (!unique) {
    alert("There is no account 'Log in'")
  }
  else {
    window.location.href = "./pages/buyer profile.html";
  }
}
function product_detail() {
  window.location.href = "./pages/sub product list.html";
}
function about() {
  window.location.href = "./pages/about us.html";
}
function wishlist() {
  let unique = JSON.parse(localStorage.getItem("unique_id"));
  if (!unique) {
    alert("There is no account please 'Log in'")
  }
  else {
    window.location.href = "./pages/wish list.html";
  }
}
function bidlist() {
  let unique = JSON.parse(localStorage.getItem("unique_id"));
  if (!unique) {
    alert("There is no account please 'Log in'")
  }
  else {
    window.location.href = "./pages/bid list.html";
  }
}
function search() {

  console.log(document.getElementById("search").value)
  window.location.href = "./pages/Buyer/product_detail_index.html"
}
// ----------------------profile page----------------------//
function addprod() {
  location.href = "./add product.html";
}
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
function editform_on() {
  document.getElementById("prod_edit").style.display = "block";
}
function editform_off() {
  document.getElementById("prod_edit").style.display = "none";
}