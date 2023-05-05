document.querySelector("#cate_name").innerHTML = new URLSearchParams(
  window.location.search
).get("Category");

// ------------------------------------product card-------------------------------------------//

document.addEventListener("DOMContentLoaded", function card() {
  const category_prod = new URLSearchParams(window.location.search).get(
    "Category"
  );
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const unique = JSON.parse(localStorage.getItem("unique_id"));

  for (let i = 0; i < prod.length; i++) {
    if (category_prod === prod[i].category && unique !== prod[i].user_id) {
      const div_card = document.createElement("div");
      div_card.setAttribute("class", "card");

      const div_detail = document.createElement("div");
      div_detail.setAttribute("class", "card-details");
      div_detail.setAttribute("data-unique", prod[i].unique);
      div_card.append(div_detail);

      const anch = document.createElement("a");
      anch.setAttribute(
        "href",
        `./product page.html?product_id=${prod[i].unique}`
      );
      div_detail.append(anch);

      const image = document.createElement("img");
      image.setAttribute("src", prod[i].image);
      image.setAttribute("alt", `${prod[i].name}Image`);
      image.setAttribute("class", "product_img");
      anch.append(image);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "text-title");
      h3.innerHTML = prod[i].name;
      div_detail.append(h3);

      const productUnique = document.createElement("p");
      productUnique.setAttribute("class", "unique");
      productUnique.setAttribute("id", "unique");
      productUnique.innerHTML = prod[i].unique;
      div_detail.append(productUnique);

      const div_price = document.createElement("div");
      div_price.setAttribute("class", "text-body");
      div_detail.append(div_price);

      const p_price = document.createElement("span");
      div_price.prepend(p_price);

      const p_bold = document.createElement("b");
      p_bold.innerText = "Price:";
      p_price.append(p_bold);

      const p_rate = document.createElement("span");
      p_rate.innerHTML = prod[i].price;
      div_price.append(p_rate);

      const p_currency = document.createElement("span");
      p_currency.innerHTML = " (INR)";
      div_price.append(p_currency);

      document.body.appendChild(div_card);

      document.querySelector("#grid-container").append(div_card);
    }
  }
});

// ---------load more--------//

const cards = document.getElementsByClassName("card");
const loadMoreBtn = document.getElementById("loadmore");
let currentIndex = 12;

for (let i = 0; i < cards.length; i++) {
  if (i >= currentIndex) {
    cards[i].style.display = "none";
  }
}
loadMoreBtn.addEventListener("click", function loader() {
  for (let i = currentIndex; i < currentIndex + 8; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
  currentIndex += 8;
  if (currentIndex >= cards.length) {
    loadMoreBtn.style.display = "none";
  }
});
