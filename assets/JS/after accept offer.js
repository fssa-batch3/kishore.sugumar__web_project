document.addEventListener("DOMContentLoaded", function productt() {
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const productArray = JSON.parse(localStorage.getItem("product_data"));
  const imageArray = JSON.parse(localStorage.getItem("images"));
  const image = imageArray.find((i) => i.unique === product_id);

  const product = productArray.find((p) => p.unique === product_id);

  const productImage = document.getElementById("product_img");
  productImage.setAttribute("src", image.image1);
  productImage.setAttribute("alt", `${product.name} image`);
  document.getElementById("product_name").innerHTML = product.name;
  document.getElementById("prod_price").innerHTML = product.price;
});

// --------------------------------------------------------//

const product = JSON.parse(localStorage.getItem("product_data"));
const buyer = JSON.parse(localStorage.getItem("user_data"));

const productId = new URLSearchParams(window.location.search).get("product_id");
const buyerId = new URLSearchParams(window.location.search).get("buyer_id");

const product_i = product.findIndex((item) => item.unique === productId);
const buyer_i = buyer.findIndex((item) => item.email === buyerId);

const img = document.querySelector("#product_img");
img.setAttribute("src", product[product_i].image);
img.setAttribute("alt", `${product[product_i].name}image`);

document.querySelector("#product_name").innerHTML = product[product_i].name;
document.querySelector("#prod_price").innerHTML = product[product_i].price;
document.querySelector("#buyer_name").innerHTML = buyer[buyer_i].name;
document.querySelector("#buyer_phone").innerHTML = buyer[buyer_i].phone;
document.querySelector("#buyer_location").innerHTML = buyer[buyer_i].location;

const sellProduct = document.getElementById("sell");
sellProduct.addEventListener("click", function sell() {
  window.location.href = "./sold page.html";
});

const nextPageButton = document.getElementById("redirect");
nextPageButton.addEventListener("click", function redirect() {
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  window.location.href = `./accept offer.html?product_id=${product_id}`;
});
