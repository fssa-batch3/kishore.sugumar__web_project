const category = new URLSearchParams(window.location.search).get("Category");

document.querySelector("#cate_name").innerHTML = category;
// ------------------------------------product card-------------------------------------------//

const uri = `http://localhost:8080/vanhaweb/home/categroyproduct?Category=${category}`;

fetch(uri, {
  method: 'GET',
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data);
    const loadData = data["data"]; 

    function createProductCard(product) {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardDetails = document.createElement("div");
      cardDetails.classList.add("card-details");
      card.appendChild(cardDetails);

      const productLink = document.createElement("a");
      productLink.href = `./product page.html?productId=${product.productId}`;
      cardDetails.appendChild(productLink);

      const productImage = document.createElement("img");
      productImage.src = product.asset;
      productImage.alt = `${product.ProductName} Image`;
      productImage.classList.add("product_img");
      productLink.appendChild(productImage);

      const productName = document.createElement("h3");
      productName.classList.add("text-title");
      productName.textContent = product.ProductName;
      cardDetails.appendChild(productName);

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("text-body");
      cardDetails.appendChild(priceDiv);

      const priceSpan = document.createElement("span");
      priceDiv.appendChild(priceSpan);

      const priceBold = document.createElement("b");
      priceBold.textContent = "Price:";
      priceSpan.appendChild(priceBold);

      const priceValue = document.createElement("span");
      priceValue.innerHTML = `${product.price} (INR)`;
      priceDiv.appendChild(priceValue);

      const locationDiv = document.createElement("div");
      locationDiv.classList.add("text-body");
      cardDetails.appendChild(locationDiv);

      const locationSpan = document.createElement("div");
      locationDiv.appendChild(locationSpan);

      const sellerInfo = document.createElement("div");
      sellerInfo.classList.add("sellerInfo");
      card.appendChild(sellerInfo);

      const sellerImage = document.createElement("img");
      sellerImage.src = product.SellerImage;
      sellerImage.alt = `${product.sellerName} Image`;
      sellerImage.classList.add("seller_img");
      sellerInfo.appendChild(sellerImage);

      const sellerDetails = document.createElement("div");
      sellerInfo.appendChild(sellerDetails);

      const sellerNameSpan = document.createElement("div");
      sellerNameSpan.innerHTML = `<b>Seller:</b> ${product.sellerName}`;
      sellerDetails.appendChild(sellerNameSpan);

      const sellerLocationSpan = document.createElement("div");
      sellerLocationSpan.innerHTML = `<b>Location:</b> ${product.sellerLocation}`;
      sellerDetails.appendChild(sellerLocationSpan);

      document.querySelector("#grid-container").appendChild(card);
    }

    loadData.forEach(createProductCard);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
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
  for (let i = currentIndex; i < currentIndex + 12; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
  currentIndex += 12;
  if (currentIndex >= cards.length) {
    loadMoreBtn.style.display = "none";
  }
});
