//-----------------product card-----------------//
function product(i) {
  let div_card = document.createElement("div");
  div_card.setAttribute("class", "card");

  let div_detail = document.createElement("div");
  div_detail.setAttribute("class", "card-details");
  div_card.append(div_detail);

  let image = document.createElement("img");
  // image.setAttribute("src", product_list[i].image.source);
  // image.setAttribute("alt", product_list[i].image.alt);
  image.setAttribute("class", "product_img");
  div_detail.append(image);

  let h3 = document.createElement("h3");
  h3.setAttribute("class", "text-title");
  // h3.innerHTML = product_list[i].name;
  div_detail.append(h3);

  let div_price = document.createElement("div");
  div_price.setAttribute("class", "text-body");
  div_detail.append(div_price);

  let p_price = document.createElement("span");
  div_price.prepend(p_price);

  let p_bold = document.createElement("b");
  p_bold.innerText = "Price:";
  p_price.append(p_bold);

  let p_rate = document.createElement("span");
  // p_rate.innerHTML = product_list[i].price;
  div_price.append(p_rate);

  let p_currency = document.createElement("span");
  p_currency.innerHTML = " (INR)";
  div_price.append(p_currency);

  document.body.appendChild(div_card);

  document.querySelector("div.grid-container").append(div_card);
}
// ---------------------uplode image-------------------------//

function addImagePreview(form) {

}
// -----------------------------------list-seller-----------------------------------------------//
function list(){
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
  button1.textContent = "offers";
  button1.onclick = function() {
  window.location.href="./accept offer.html";
  };
  div_card.append(button1);
  
  button2 = document.createElement("button");
  button2.classList.add("button3", "algn");
  button2.textContent = "Remove";
  button2.setAttribute("id", "remove");
  div_card.append(button2);

  document.querySelector("div.box").append(div_card);

}
//---------------------------wish list--------------------------//
function wish(){
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
function bid(){
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
// --------------------------login------------------------------//
function log_in(e) {
  e.preventDefault();
  let stored_data = JSON.parse(localStorage.getItem("user_data")) || [];

  let user_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  for (let i = 0; i < stored_data.length; i++) {
    if (user_data.email === stored_data[i].email && user_data.password === stored_data[i].password) {
      alert('Successfully logged in');
      localStorage.setItem("unique_id", JSON.stringify(user_data.unique_id))
      location.href = "./pages/buyer profile.html"
      return;
    }
  }
  alert('Not able to find the user')
}

//----------------------------overlay---------------------------//
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
// ------------------------edit profile--------------------------------------//
function update(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let location = document.getElementById("location").value;

  let user_data = get_object(unique_id, stored_data);

  if (user_data) {
    user_data.name = name;
    user_data.phone = phone;
    user_data.email = email;
    user_data.location = location;
  } else {
    user_data = {
      "name": name,
      "email": email,
      "phone": phone,
      "location": location,
    };
    stored_data.push(user_data);
  }

  localStorage.setItem("user_data", JSON.stringify(stored_data));
}
// -----------------------------delete profile--------------------------------------//

function del(event) {
  if (confirm("Are you sure you want to delete your profile")) {
    let users = JSON.parse(localStorage.getItem('user_data'));
    let unique_id = JSON.parse(localStorage.getItem('unique'));

    function profile_data(e) {
      return e.email == unique_id;
    }

    let user_data = users.find(profile_data);
    let i_User = users.indexOf(user_data);
    console.log(i_User);
    users.splice(i_User, 1);
    localStorage.setItem("user_data", JSON.stringify(users));
    delete localStorage.unique;
    location.href = "../index.html"
  }
}
//----------------------------------------------------------------//
function back(){
  window.location.href = "../index.html";
}
function profile() {
  window.location.href = "./pages/buyer profile.html";
}
function product_detail() {
  window.location.href = "./pages/sub product list.html";
}
function about() {
  window.location.href = "./pages/about us.html";
}
function wishlist() {
  window.location.href = "./pages/wish list.html";
}
function bidlist() {
  window.location.href = "./pages/bid list.html";
}
function search() {

  console.log(document.getElementById("search").value)
  window.location.href = "./pages/Buyer/product_detail_index.html"
}

function signup() {
  location.href = "./pages/register.html";
}
