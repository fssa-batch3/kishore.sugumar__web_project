
//----------------------------error message-----------------------//
function errorBox(errorMessage) {
  var snackArea = document.getElementById("error");
  snackArea.className = "show";
  var message = document.getElementsByClassName("messSpan")[0];
  message.textContent = errorMessage;
  setTimeout(function () {
    snackArea.className = snackArea.className.replace("show", "");
  }, 3000);
}

//-----------------------------------------------------------------//

const productId = new URLSearchParams(window.location.search).get("product_id");

console.log(productId);

const viewBids = `http://localhost:8080/vanhaweb/home/profile/allbids?productId=${productId}`;

fetch(viewBids, {
  method: 'GET',
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const object = data.data;
    const Image = document.getElementById("product_img");
    Image.setAttribute("src", object.productImage);
    Image.setAttribute("alt", `${object.productName} image`);
    document.getElementById("product_name").innerHTML = object.productName;
    document.getElementById("prod_price").innerHTML = object.productPrice;

    const container = document.getElementById("bid-list");

    if (data.statusCode === 200) {
      if (object.bids.length === 0) {
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
      } else {
        let allBids = object.bids;
        allBids.forEach(function everyProduct(elements) {
          const div = document.createElement("div");
          div.classList.add("content");

          const img = document.createElement("img");
          img.src = elements.buyerImage;
          img.alt = `${elements.buyerName} image`;
          img.classList.add("buyer_img");
          div.appendChild(img);

          const name = document.createElement("h4");
          name.classList.add("buyer_name");
          name.textContent = elements.buyerName;
          div.appendChild(name);

          const rate = document.createElement("div");
          rate.classList.add("title");
          rate.textContent = "Price : ";
          div.appendChild(rate);

          const rateDiv = document.createElement("div");
          rateDiv.classList.add("price");
          rateDiv.textContent = elements.amount;
          div.appendChild(rateDiv);

          const anch = document.createElement("a");
          // anch.setAttribute(
          //   "href",
          //   `./after accept offer.html?buyer_id=${bid_array[i].buyer_id}&product_id=${productId}`
          // );
          div.append(anch);

          const sellButton = document.createElement("button");
          sellButton.classList.add("button2", "algn");
          sellButton.textContent = "sell";
          anch.appendChild(sellButton);

          container.appendChild(div);
        });
      }
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        console.log(errorMessage);
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

//------------------------back button----------------------//

const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  history.back()
});
