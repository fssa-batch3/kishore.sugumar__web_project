// ------------------------read whishlist---------------------------//
document.addEventListener("DOMContentLoaded", function wish_prod() {
  const prod_wish = JSON.parse(localStorage.getItem("wishlist"));
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const imageArray = JSON.parse(localStorage.getItem("images"));
  const user_id = JSON.parse(localStorage.getItem("unique_id"));

  const box = document.querySelector(".box");
  box.classList.remove("box");
  box.classList.add("empty");

  const noProductMessage = document.createElement("h2");
  noProductMessage.setAttribute("class", "noProduct");
  noProductMessage.textContent = "There are no products in your wishlist.";

  const noImage = document.createElement("img");
  noImage.setAttribute("src", "../assets/img/illustration/empty wishlist.png");
  noImage.setAttribute("alt", "illustration image");
  noImage.setAttribute("class", "illustration-image");

  if (!prod_wish || prod_wish.length === 0) {
    document.querySelector("#box").append(noProductMessage);
    document.querySelector("#box").append(noImage);
  }
    let wishedProduct = prod_wish.filter((p) => p.user_id === user_id);
    if(wishedProduct.length === 0){
      document.querySelector("#box").append(noProductMessage);
      document.querySelector("#box").append(noImage);
    }

    wishedProduct.forEach(function wished(data){
      const productObj = prod.find((p) => p.unique === data.product);
      if (productObj) {
              const div_card = document.createElement("div");
              div_card.setAttribute("data-unique", productObj.unique);
              div_card.classList.add("content");
    
              const anch = document.createElement("a");
              anch.setAttribute(
                "href",
                `./product page.html?product_id=${productObj.unique}`
              );
              div_card.append(anch);

              const productImage = imageArray.find((p) => p.unique === productObj.unique);
    
              const image = document.createElement("img");
              image.setAttribute("src", productImage.image1);
              image.setAttribute("alt", `${productObj.name} Image`);
              image.classList.add("product-img");
              anch.prepend(image);
    
              const h3 = document.createElement("h3");
              h3.setAttribute("class", "prod_name");
              h3.setAttribute("id", "prod_name");
              h3.textContent = productObj.name;
              div_card.append(h3);
    
              const button2 = document.createElement("button");
              button2.classList.add("button3", "algn");
              button2.textContent = "Remove";
              button2.setAttribute("id", "remove");
              div_card.append(button2);
    
              document.querySelector("#box").append(div_card);
    }

  })
});

// -------------------------delete whishlist-----------------------//
const box = document.querySelector("#box");
box.addEventListener("click", function erase(e) {
  if (e.target && e.target.matches("#remove")) {
    e.preventDefault();

    const uniqueid = e.target.parentNode.getAttribute("data-unique");
    const wish = JSON.parse(localStorage.getItem("wishlist"));
    const user_id = JSON.parse(localStorage.getItem("unique_id"));

    const index = wish.findIndex(
      (item) => item.product === uniqueid && item.user_id === user_id
    );

    if (index !== -1) {
      if (window.confirm("Are you sure you want to remove your product")) {
        wish.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wish));
        window.location.reload();
      }
    }
  }
});

const backButton = document.getElementById("back");
backButton.addEventListener("click", function back() {
  window.location.href = "../index.html";
});
