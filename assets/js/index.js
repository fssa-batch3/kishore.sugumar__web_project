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
      div_detail.setAttribute("data-unique", prod[i].unique);
      div_card.append(div_detail);

      let anch = document.createElement("a");
      anch.setAttribute("href", "./pages/product page.html?product_id=" + prod[i].unique);
      div_detail.append(anch);

      let image = document.createElement("img");
      image.setAttribute("src", prod[i].image);
      image.setAttribute("alt", prod[i].name + "Image");
      image.setAttribute("id", prod[i].unique)
      image.setAttribute("class", "product_img");
      anch.append(image);

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
function card() {
  const category_prod = new URLSearchParams(window.location.search).get('Category');
  let prod = JSON.parse(localStorage.getItem("product_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));

  for (let i = 0; i < prod.length; i++) {
    if (category_prod === prod[i].category && unique !== prod[i].user_id) {
      let div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      let div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_detail.setAttribute("data-unique", prod[i].unique);
      div_card.append(div_detail);

      let anch = document.createElement("a");
      anch.setAttribute("href", "./product page.html?product_id=" + prod[i].unique);
      div_detail.append(anch);

      let image = document.createElement("img");
      image.setAttribute("src", prod[i].image);
      image.setAttribute("alt", prod[i].name  + "Image");
      image.setAttribute("class", "product_img");
      anch.append(image);

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

  let products = prod.filter(p => p.user_id === unique);

  let reverse = products.slice().reverse();

  reverse.forEach(function(elements) {
    div_card = document.createElement("div");
          div_card.setAttribute("data-unique", elements.unique);
          div_card.classList.add("content");
  
          image = document.createElement("img");
          image.setAttribute("src",elements.image);
          image.setAttribute("alt", elements["name"]  + " Image");
          image.classList.add("product-img");
          div_card.append(image);
  
          h2 = document.createElement("h2");
          h2.setAttribute("class", "prod_name");
          h2.setAttribute("id", "prod_name");
          h2.textContent = elements["name"];
          div_card.append(h2);
  
          let anch = document.createElement("a");
          anch.setAttribute("href", "./accept offer.html?product_id=" + elements.unique);
          div_card.append(anch);
  
          button1 = document.createElement("button");
          button1.classList.add("button1", "algn");
          button1.textContent = "offers";
          anch.append(button1);
          
          let anc = document.createElement("a");
          anc.setAttribute("href", "./seller product.html?product_id=" + elements.unique);
          div_card.append(anc);
  
          button3 = document.createElement("button");
          button3.classList.add("button2", "algn");
          button3.textContent = "View";
          anc.append(button3);
  
          let button_remove = document.createElement("div");
          div_card.append(button_remove);
  
          button2 = document.createElement("button");
          button2.classList.add("button3", "remo");
          button2.textContent = "Remove";
          button2.setAttribute("id", "remove");
          button2.onclick = function (event) {
            remove_prod(event, elements.unique)
          }
          button_remove.append(button2);
  
          document.querySelector("div.box").append(div_card);
  });
}

//-----------------------------------similar prdocut----------------------------------------//
function similar() {
  const prod_data = JSON.parse(localStorage.getItem("product_data"));
  const productId = new URLSearchParams(window.location.search).get("product_id");
  const user = JSON.parse(localStorage.getItem("unique_id"));

  const prod_cate = prod_data.find(pro => pro.unique === productId);
  const type = prod_cate.category;
  const products = prod_data.filter(cate => cate.category === type);

  let similar_prod = products.filter(product => product.unique !== productId);


  while (similar_prod.length < 4) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    if (!similar_prod.includes(randomProduct)) {
      similar_prod.push(randomProduct);
    }
  }

  for (let i = 0; i < 4; i++) {


    const randomProduct = similar_prod[i];

    if(randomProduct.user_id !== user && randomProduct.unique !== productId){
    let div_card = document.createElement("div");
    div_card.setAttribute("class", "prod_card");
    div_card.setAttribute("data-unique", randomProduct.unique);
    div_card.onclick = function (event) {
      window.location.href = "./product page.html?product_id=" + randomProduct.unique;
    }

    let div_detail = document.createElement("div");
    div_detail.setAttribute("class", "card-details");
    div_card.append(div_detail);

    let image = document.createElement("img");
    image.setAttribute("src", randomProduct.image);
    image.setAttribute("alt", randomProduct.name + "Image");
    image.setAttribute("class", "product_img");
    div_detail.append(image);

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "text-title");
    h3.innerHTML = randomProduct.name;
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
    p_rate.innerHTML = randomProduct.price;
    div_price.append(p_rate);

    let p_currency = document.createElement("span");
    p_currency.innerHTML = " (INR)";
    div_price.append(p_currency);

    document.body.appendChild(div_card);

    document.querySelector("section.similar_container").append(div_card);
  }
  }
}

//-----------------------home page-----------------------------------------//
function over() {
  show_on();
  off();
}
function user() {
  let login = JSON.parse(localStorage.getItem("unique_id"));
  if (login) {

  }
}
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
// -------------------------product page------------------------//
function img(thumb) {
  var main_image = document.getElementById("imagebox");
  main_image.src = thumb.src
}
function seller_off() {
  document.getElementById("overlay").style.display = "none";
}
function seller_on() {
  let user = JSON.parse(localStorage.getItem("unique_id"));
  if (!user) {
    alert("There is no account please 'Log in'")
  }
  else {
    document.getElementById("overlay").style.display = "block";
  }
}
function message() {
  let user = JSON.parse(localStorage.getItem("unique_id"));
  if (!user) {
    alert("There is no account please 'Log in'")
  }
  else {
    window.location.href = "./chat box.html?product_id=" + productId;
  }
}
// ---------------------------------------------------------------//
