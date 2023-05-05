document.addEventListener("DOMContentLoaded", function productt() {
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const productArray = JSON.parse(localStorage.getItem("product_data"));

  const product = productArray.find((p) => p.unique === product_id);

  const productImage = document.getElementById("product_img");
  productImage.setAttribute("src", product.image);
  productImage.setAttribute("alt", `${product.name} image`);
  document.getElementById("product_name").innerHTML = product.name;
  document.getElementById("prod_price").innerHTML = product.price;
});

// --------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function buyerBidList() {
  const bid_array = JSON.parse(localStorage.getItem("bid"));
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const user = JSON.parse(localStorage.getItem("user_data"));

  const container = document.getElementById("bid-list");

  const productExist = bid_array.filter((p) => p.productId === productId);

  if (!bid_array || bid_array.length === 0 || productExist.length === 0) {
    const div = document.createElement("div");

    const name = document.createElement("h3");
    name.innerText = "There is no Offers";
    div.appendChild(name);

    const image = document.createElement("img");
    image.setAttribute("src", "../assets/img/illustration/no result.png");
    image.setAttribute("alt", "no result found");
    image.setAttribute("class", "illuimg");
    div.appendChild(image);

    container.appendChild(div);
    return;
  }

  if (bid_array.length !== 0) {
    for (let i = 0; i < bid_array.length; i++) {
      const index = user.findIndex(
        (item) => item.email === bid_array[i].buyer_id
      );
      const buyer = user[index];
      if (
        productId === bid_array[i].productId &&
        bid_array[i].buyer_id === buyer.email
      ) {
        const div = document.createElement("div");
        div.classList.add("content");

        const img = document.createElement("img");
        img.src = "../assets/img/buyer.png";
        img.alt = "buyer_img";
        img.classList.add("buyer_img");
        div.appendChild(img);

        const name = document.createElement("h4");
        name.classList.add("buyer_name");
        name.textContent = buyer.name;
        div.appendChild(name);

        const rate = document.createElement("div");
        rate.classList.add("title");
        rate.textContent = "Price : ";
        div.appendChild(rate);

        const rateDiv = document.createElement("div");
        rateDiv.classList.add("price");
        rateDiv.textContent = bid_array[i].new_price;
        div.appendChild(rateDiv);

        const anch = document.createElement("a");
        anch.setAttribute(
          "href",
          `./after accept offer.html?buyer_id=${bid_array[i].buyer_id}&product_id=${productId}`
        );
        div.append(anch);

        const sellButton = document.createElement("button");
        sellButton.classList.add("button2", "algn");
        sellButton.textContent = "sell";
        anch.appendChild(sellButton);

        container.appendChild(div);
      }
    }
  }
});

const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  window.location.href = `./buyer profile.html`;
});
