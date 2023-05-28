// -----------------------------read bid (buyer)--------------------------//
document.addEventListener("DOMContentLoaded", function bid_prod() {
  const user_id = JSON.parse(localStorage.getItem("unique_id"));
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const bid = JSON.parse(localStorage.getItem("bid")) || [];
  const imageArray = JSON.parse(localStorage.getItem("images"));

  const displayedProducts = [];

  for (let i = 0; i < bid.length; i++) {
    if (bid[i].buyer_id === user_id) {
      const productObj = prod.find((p) => p.unique === bid[i].productId);
      if (productObj && !displayedProducts.includes(productObj.unique)) {
        displayedProducts.push(productObj.unique);

        const div_card = document.createElement("div");
        div_card.setAttribute("data-unique", productObj.unique);
        div_card.classList.add("content");

        const productImage =  imageArray.find((i) => i.unique === productObj.unique)

        const image = document.createElement("img");
        image.setAttribute("src", productImage.image1);
        image.setAttribute("alt", `${productObj.name}Image`);
        image.classList.add("product-img");
        div_card.prepend(image);

        const h3 = document.createElement("h3");
        h3.setAttribute("class", "prod_name");
        h3.setAttribute("id", "prod_name");
        h3.textContent = productObj.name;
        div_card.append(h3);

        let maxBidPrice = 0;
        bid.forEach((bidItem2) => {
          if (bidItem2.productId === productObj.unique) {
            maxBidPrice = Math.max(maxBidPrice, Number(bidItem2.new_price));
          }
        });

        let h4 = document.createElement("h4");
        h4.setAttribute("class", "prod_name");
        h4.setAttribute("id", "prod_name");
        h4.textContent = `Maximum bid price: ${maxBidPrice} (INR)`;
        div_card.append(h4);

        const anch = document.createElement("a");
        anch.setAttribute(
          "href",
          `./product page.html?product_id=${productObj.unique}`
        );
        div_card.append(anch);

        const button2 = document.createElement("button");
        button2.classList.add("button2", "algn");
        button2.textContent = "Bid more";
        button2.setAttribute("id", "Bid more");
        anch.append(button2);

        document.querySelector("div.box").append(div_card);
      }
    }
  }
  if (bid.length === 0 || displayedProducts.length === 0) {
    const box = document.querySelector(".box");
    box.classList.remove("box");
    box.classList.add("empty");

    const noProductMessage = document.createElement("h2");
    noProductMessage.setAttribute("class", "noProduct");
    noProductMessage.textContent = "Your bidlist is empty. 'Bid any product.'";
    document.querySelector("#box").append(noProductMessage);

    const image = document.createElement("img");
    image.setAttribute("src", "../assets/img/illustration/empty bidlist.png");
    image.setAttribute("alt", "illustration image");
    image.setAttribute("class", "illustration-image");
    document.querySelector("#box").append(image);
  }
});

const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  window.location.href = `../index.html`;
});
