// ---------------------------------------------------------------------------------------------//
const productId = new URLSearchParams(window.location.search).get("product_id");

const prod_data = JSON.parse(localStorage.getItem("product_data"));

const product = prod_data.find((data) => {
  return data.unique === productId;
});

document.querySelector("#prod_name").innerHTML = product.name;
document.querySelector("#description").innerHTML = product.description;
document.querySelector("#prod_price").innerHTML = product.price;
document.querySelector("#prod_date").innerHTML = product.date;
document.querySelector("#duration").innerHTML = product.duration;

const image = document.querySelector("#imagebox");
image.setAttribute("src", product.image);
image.setAttribute("alt", `${product.name}image`);

for (let i = 0; i < 4; i++) {
  const product_image = document.createElement("img");
  product_image.setAttribute("src", product.image[i]);
  product_image.setAttribute("alt", `${product.name}image`);
  product_image.setAttribute("id", `sub_img${i}`);
  document.querySelector(".thumbnail-imgs").appendChild(product_image);
}

const user_data = JSON.parse(localStorage.getItem("user_data"));

const user = user_data.find((data) => {
  return data.email === product.user_id;
});

document.querySelector("#seller_name").innerHTML = user.name;
document.querySelector("#seller_phone").innerHTML = user.phone;
document.querySelector("#seller_location").innerHTML = user.location;
document.querySelector("#seller").innerHTML = user.name;
// -------------------------------other requests -----------------------------------------//
const bidArray = JSON.parse(localStorage.getItem("bid"));
const userArray = JSON.parse(localStorage.getItem("user_data"));
const container = document.querySelector(".allRequests");

const bids = bidArray.filter((b) => b.productId === productId);

if (bids.length === 0) {
  const noProductMessage = document.createElement("h2");
  noProductMessage.setAttribute("class", "noProduct");
  noProductMessage.textContent = "There are no requests for this product.";

  const noImage = document.createElement("img");
  noImage.setAttribute("src", "../assets/img/illustration/empty bidlist.png");
  noImage.setAttribute("alt", "illustration image");
  noImage.setAttribute("class", "illustration-image");

  container.append(noProductMessage);
  container.append(noImage);
}

bids.forEach(function bidRequest(element) {
  const userprofile = userArray.find((b) => b.email === element.buyer_id);

  const eachUserDiv = document.createElement("div");
  eachUserDiv.classList.add("eachUser");

  const ProfileImage = document.createElement("img");
  ProfileImage.src = userprofile.image;
  ProfileImage.classList.add("profileIMg");
  ProfileImage.alt = `${userprofile.name} Image`;

  const h4 = document.createElement("h4");
  h4.classList.add("price");
  h4.innerHTML = element.new_price;

  eachUserDiv.appendChild(ProfileImage);
  eachUserDiv.appendChild(h4);

  container.append(eachUserDiv);
});

// -----------------------------------similar prdocut----------------------------------------//

document.addEventListener("DOMContentLoaded", function similar() {
  const product_data = JSON.parse(localStorage.getItem("product_data"));
  const productid = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const userUnique = JSON.parse(localStorage.getItem("unique_id"));

  const prod_cate = product_data.find((pro) => pro.unique === productid);
  const type = prod_cate.category;
  const products = product_data.filter((cate) => cate.category === type);

  const similar_prod = products.filter(
    (findProduct) => findProduct.unique !== productid
  );

  while (similar_prod.length < 4) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    if (!similar_prod.includes(randomProduct)) {
      similar_prod.push(randomProduct);
    }
  }

  for (let i = 0; i < 4; i++) {
    const randomProduct = similar_prod[i];

    if (
      randomProduct.user_id !== userUnique &&
      randomProduct.unique !== productid
    ) {
      const div_card = document.createElement("div");
      div_card.setAttribute("class", "prod_card");
      div_card.setAttribute("data-unique", randomProduct.unique);
      div_card.onclick = function cardButton() {
        window.location.href = `./product page.html?product_id=${randomProduct.unique}`;
      };

      const div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_card.append(div_detail);

      const productImage = document.createElement("img");
      productImage.setAttribute("src", randomProduct.image);
      productImage.setAttribute("alt", `${randomProduct.name}Image`);
      productImage.setAttribute("class", "product_img");
      div_detail.append(productImage);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = randomProduct.name;
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
      p_rate.innerHTML = randomProduct.price;
      div_price.append(p_rate);

      const p_currency = document.createElement("span");
      p_currency.innerHTML = " (INR)";
      div_price.append(p_currency);

      document.body.appendChild(div_card);

      document.querySelector("section.similar_container").append(div_card);
    }
  }
});

// -----------------------------create bid--------------------------//
function bid() {
  const amount = document.getElementById("bid_amount").value;
  const productid = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const buyer_id = JSON.parse(localStorage.getItem("unique_id"));

  const bid_array = JSON.parse(localStorage.getItem("bid")) || [];

  if (!productid) {
    alert("There is no account 'Log in'");
    return;
  }
  if (amount === "") {
    alert("Quote any amount");
    return;
  }

  const bid_amount = {
    productId,
    buyer_id,
    new_price: amount,
  };

  for (let i = 0; i < bid_array.length; i++) {
    if (
      productId === bid_array[i].productId &&
      bid_array[i].buyer_id === buyer_id &&
      bid_array[i].new_price === amount
    ) {
      alert('This amount is already bided. "Bid More"');
      return;
    }
  }
  bid_array.unshift(bid_amount);
  localStorage.setItem("bid", JSON.stringify(bid_array));

  const vara = document.getElementById("snackbar");
  vara.className = "show";

  setTimeout(function extraTime() {
    vara.className = vara.className.replace("show", "");
    window.location.reload();
  }, 2000);
}

document.getElementById("bid_button").addEventListener("click", bid);
// ------------------------create wishlist---------------------------//
function addToWishlist(event) {
  event.preventDefault();

  const productUnique = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const userId = JSON.parse(localStorage.getItem("unique_id"));

  if (!userId) {
    alert("Please log in to add to wishlist");
    return;
  }

  const wishlistArray = JSON.parse(localStorage.getItem("wishlist")) || [];

  for (let i = 0; i < wishlistArray.length; i++) {
    if (
      wishlistArray[i].product === productUnique &&
      wishlistArray[i].user_id === userId
    ) {
      alert("This item is already in your wishlist!");
      return;
    }
  }

  const prod = {
    product: productUnique,
    user_id: userId,
  };

  wishlistArray.unshift(prod);
  localStorage.setItem("wishlist", JSON.stringify(wishlistArray));

  const wishnote = document.getElementById("snackbar1");
  wishnote.className = "show";

  setTimeout(function setTime() {
    wishnote.className = wishnote.className.replace("show", "");
  }, 3000);
}

document.getElementById("wish_button").addEventListener("click", addToWishlist);

// -------------------------------------------------//

function img(thumb) {
  const main_image = document.getElementById("imagebox");
  main_image.src = thumb.src;
}

const thumbnail_image1 = document.getElementById(`sub_img0`);
const thumbnail_image2 = document.getElementById(`sub_img1`);
const thumbnail_image3 = document.getElementById(`sub_img2`);
const thumbnail_image4 = document.getElementById(`sub_img3`);

thumbnail_image1.addEventListener("click", function thumbImg1() {
  img(thumbnail_image1);
});
thumbnail_image2.addEventListener("click", function thumbImg2() {
  img(thumbnail_image2);
});
thumbnail_image3.addEventListener("click", function thumbImg3() {
  img(thumbnail_image3);
});
thumbnail_image4.addEventListener("click", function thumbImg4() {
  img(thumbnail_image4);
});

const closeSellerInfo = document.getElementById("seller_off");
closeSellerInfo.addEventListener("click", function seller_off() {
  document.getElementById("lay").style.display = "none";
});

const openSellerInfo = document.getElementById("seller_on");
openSellerInfo.addEventListener("click", function seller_on() {
  const user_unique = JSON.parse(localStorage.getItem("unique_id"));
  if (!user_unique) {
    alert("There is no account please 'Log in'");
  } else {
    document.getElementById("lay").style.display = "block";
  }
});

const messagePageButton = document.getElementById("message");
messagePageButton.addEventListener("click", function message() {
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const userUnique = JSON.parse(localStorage.getItem("unique_id"));
  if (!userUnique) {
    alert("There is no account please 'Log in'");
  } else {
    window.location.href = `./chat box.html?product_id=${product_id}`;
  }
});
