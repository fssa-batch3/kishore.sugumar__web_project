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

const buyerDetail = buyer.find((item) => item.email === buyerId);

const img = document.querySelector(".buyer");
img.setAttribute("src", buyerDetail.image);
img.setAttribute("alt", `${buyerDetail.name}image`);

document.querySelector("#buyer_name").innerHTML = buyerDetail.name;
document.querySelector("#buyer_phone").innerHTML = buyerDetail.phone;
document.querySelector("#buyer_location").innerHTML = buyerDetail.location;

const sellProduct = document.getElementById("sell");
sellProduct.addEventListener("click", function sell() {
  window.location.href = "./sold page.html";
});

const nextPageButton = document.getElementById("redirect");
nextPageButton.addEventListener("click", function redirect() {
  history.back()
});
