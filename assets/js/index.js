//-----------------product card-----------------//
function product() {
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for(let i=0; i<prod.length; i++){
    if(unique != prod[i].user_id)
    {
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
function card(){
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for(let i=0; i<prod.length; i++){
    if(unique != prod[i].user_id)
    {
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
function list(product){
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for(let i=0; i<prod.length; i++){
    if(unique === prod[i].user_id)
    {
      {
        div_card = document.createElement("div");
        div_card.classList.add("content");
        
        image = document.createElement("img");
        image.setAttribute("src", "");
        image.setAttribute("alt", "");
        image.classList.add("product-img");
        div_card.prepend(image);
        
        h2 = document.createElement("h2");
        h2.setAttribute("class", "prod_name")
        h2.textContent = prod[i]["name"];
        div_card.append(h2);
        
        button1 = document.createElement("button");
        button1.classList.add("button1", "algn");
        button1.textContent = "offers";
        button1.onclick = function() {
        window.location.href="./accept offer.html";
        };
        div_card.append(button1);
      
        button3 = document.createElement("button");
        button3.classList.add("button2", "algn");
        button3.textContent = "Edit";
        button3.onclick = function(){
          show_on()
        }
        div_card.append(button3);
        
        button2 = document.createElement("button");
        button2.classList.add("button3", "algn");
        button2.textContent = "Remove";
        button2.setAttribute("id", "remove");
        div_card.append(button2);
      
        document.querySelector("div.box").append(div_card);
      };
    }
  }
}
// ------------------------uplode image-------------------------//
// photoElements.forEach(function (photoElement) {
//   let inputElement = photoElement.querySelector('input[type="file"]');

//   inputElement.addEventListener('change', function (event) {
//     let image = new Image();
//     image.src = URL.createObjectURL(event.target.files[0]);

//     image.onload = function () {
//       photoElement.style.backgroundImage = "url(" + image.src + ")";
//       photoElement.style.width = "300px";
//       photoElement.style.height = "200px";
//       photoElement.style.backgroundSize = "contain";
//       photoElement.style.backgroundRepeat = "no-repeat";
//       photoElement.style.backgroundPosition = "center";
//     };
//   });
// });
//---------------------------add product----------------------//
// function active(category){
//   document.getElementById("add_product").addEventListener("click", function addProduct(e) {
//     e.preventDefault();

//     let unique_id = uuidv4();

//     let product_detail = {
//       unique_id: unique_id,
//       prod_name: document.getElementById("prod_name").value,
//       description: document.getElementById("description").value,
//       prod_price: document.getElementById("prod_price").value,
//       prod_rupee: document.getElementById("rupee").value,
//       prod_date: document.getElementById("prod_date").value,
//       prod_duration: document.getElementById("duration").value,
//       user_id: document.getElementById("user_name").innerText
//     };

//     if (!product_detail.prod_name || !product_detail.description || !product_detail.prod_price || !product_detail.prod_rupee || !product_detail.prod_date || !product_detail.prod_duration) {
//       alert('One or more input elements is missing!');
//       return;
//     }

//     let product_data = JSON.parse(localStorage.getItem('product_data')) || {"bike":[], "car":[], "laptop&desktop":[], "mobile":[]};

//     let category = document.getElementById("category").value;
//     if (product_data.hasOwnProperty(category)) {
//       product_data[category].push(product_detail);
//     } else {
//       product_data[category] = [product_detail];
//     }

//     localStorage.setItem('product_data', JSON.stringify(product_data));

//     let uniqueIds = JSON.parse(localStorage.getItem(unique_id)) || [];

//     uniqueIds.push(unique_id);
//     localStorage.setItem('unique_ids', JSON.stringify(uniqueIds));

//     document.getElementById("form").reset();
//     alert("Product Created successfully")
//     window.location.href = "./buyer profile.html";
// })
// };

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
// ------------------------register-----------------------------//
function register(e) {
  e.preventDefault();
  let password = document.getElementById("regi_password").value;
  let c_password = document.getElementById("c_password").value;

  if (password !== c_password) {
    alert("Passwords do not match");
    return;
  }

  let user_detail = {
    name: document.getElementById("regi_name").value,
    email: document.getElementById("regi_email").value,
    phone: document.getElementById("regi_phone").value,
    password: password,
  };

  let stored_data = JSON.parse(localStorage.getItem("user_data")) || [];
  let idExist = false;

  for (let i = 0; i < stored_data.length; i++) {
    if (user_detail.email === stored_data[i].email) {
      idExist = true;
      break;
    }
  }
  if (idExist) {
    alert('This email is already registered');
    return;
  }
  
  stored_data.push(user_detail);
  localStorage.setItem("user_data", JSON.stringify(stored_data));
  localStorage.setItem("unique_id",JSON.stringify(user_detail.email));
  window.location.href ="../index.html";
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
      localStorage.setItem("unique_id", JSON.stringify(user_data.email))
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

  let user_data = get_object(email, stored_data);

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
  window.location.reload();
  return;
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
//-----------------------home page-----------------------------------------//
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
