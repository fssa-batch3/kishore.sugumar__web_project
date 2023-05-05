// ------------------------read whishlist---------------------------//
document.addEventListener("DOMContentLoaded", function wish_prod() {
  const prod_wish = JSON.parse(localStorage.getItem("wishlist"));
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const user_id = JSON.parse(localStorage.getItem("unique_id"));

  if (!prod_wish || prod_wish.length === 0) {
    const box = document.querySelector(".box");
    box.classList.remove("box");
    box.classList.add("empty");

    const noProductMessage = document.createElement("h2");
    noProductMessage.setAttribute("class", "noProduct");
    noProductMessage.textContent = "There are no products in your wishlist.";
    document.querySelector("#box").append(noProductMessage);

    const image = document.createElement("img");
    image.setAttribute("src", "../assets/img/illustration/empty wishlist.png");
    image.setAttribute("alt", "illustration image");
    image.setAttribute("class", "illustration-image");
    document.querySelector("#box").append(image);
  }

  if (prod_wish) {
    for (let i = 0; i < prod_wish.length; i++) {
      if (prod_wish[i].user_id === user_id) {
        const productObj = prod.find((p) => p.unique === prod_wish[i].product);
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

          const image = document.createElement("img");
          image.setAttribute("src", productObj.image);
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
      }
    }
  }
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
