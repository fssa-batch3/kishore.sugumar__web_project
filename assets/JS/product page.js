const productId = new URLSearchParams(window.location.search).get("productId");

const uri = `http://localhost:8080/vanhaweb/home/productdetail?productId=${productId}`;

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

    const object = data.data;
    document.querySelector("#prod_name").innerHTML = object.productName;
    document.querySelector("#description").innerHTML = object.description;
    document.querySelector("#prod_price").innerHTML = object.price;
    document.querySelector("#prod_date").innerHTML = object.usedPeriod;
    document.querySelector("#duration").innerHTML = object.usedDuration;
    document.querySelector("#seller_name").innerHTML = object.sellerName;
    document.querySelector("#seller_location").innerHTML = object.SellerLocation;
    let seller_image = document.querySelector("#seller_img");
    seller_image.setAttribute("src", object.sellerImage);
    seller_image.setAttribute("alt", `${object.productName} Image`);

    let image = document.querySelector("#imagebox");
    image.setAttribute("src", object.assets[0]["value"]);
    image.setAttribute("alt", `${object.productName} image`)

    for (let i = 0; i < 4; i++) {
      const product_image = document.createElement("img");
      if (object.assets[i] != null) {
        product_image.setAttribute("src", object.assets[i]["value"]);
      } else {
        product_image.setAttribute("src", "../assets/img/illustration/blank.jpg");
      }
      product_image.setAttribute("alt", `${object.productName} image`);
      product_image.setAttribute("id", `sub_img${i}`);
      product_image.setAttribute("onclick", "img(this)");
      document.querySelector(".thumbnail-imgs").appendChild(product_image);
    }


    const container = document.querySelector(".allRequests");
    if (object.bids.length == 0) {
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
    else {

      const bidsArray = object.bids;
      const container = document.querySelector(".allRequests");

      for (let i = 0; i < bidsArray.length; i++) {
        const bid = bidsArray[i];

        const lineDiv = document.createElement("div");
        lineDiv.classList.add("bidblock");

        const paragraph = document.createElement("p");

        const buyerNameText = document.createTextNode(bid.buyerName);
        paragraph.appendChild(buyerNameText);

        const amountSpan = document.createElement("span");
        amountSpan.textContent = bid.amount;
        paragraph.appendChild(amountSpan);

        const buyerImage = document.createElement("img");
        buyerImage.src = bid.buyerImage;
        buyerImage.alt = `${bid.buyerName} Image`;
        buyerImage.classList.add("buyer_img");
        paragraph.appendChild(buyerImage);

        lineDiv.appendChild(paragraph);

        container.appendChild(lineDiv);
      }
    }

  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// -----------------------------------similar prdocut----------------------------------------//

// document.addEventListener("DOMContentLoaded", function similar() {
//   const product_data = JSON.parse(localStorage.getItem("product_data"));
//   const imageArray = JSON.parse(localStorage.getItem("images"));
//   const productid = new URLSearchParams(window.location.search).get(
//     "product_id"
//   );
//   const userUnique = JSON.parse(localStorage.getItem("unique_id"));

//   const prod_cate = product_data.find((pro) => pro.unique === productid);
//   const type = prod_cate.category;
//   const products = product_data.filter((cate) => cate.category === type);

//   const similar_prod = products.filter(
//     (findProduct) => findProduct.unique !== productid
//   );

//   while (similar_prod.length < 4) {
//     const randomIndex = Math.floor(Math.random() * products.length);
//     const randomProduct = products[randomIndex];
//     if (!similar_prod.includes(randomProduct)) {
//       similar_prod.push(randomProduct);
//     }
//   }

//   for (let i = 0; i < 4; i++) {
//     const randomProduct = similar_prod[i];

//     if (
//       randomProduct.user_id !== userUnique &&
//       randomProduct.unique !== productid
//     ) {
//       const div_card = document.createElement("div");
//       div_card.setAttribute("class", "prod_card");
//       div_card.setAttribute("data-unique", randomProduct.unique);
//       div_card.onclick = function cardButton() {
//         window.location.href = `./product page.html?product_id=${randomProduct.unique}`;
//       };

//       const div_detail = document.createElement("div");
//       div_detail.setAttribute("class", "card-details");
//       div_card.append(div_detail);

//       const product_image = imageArray.find((i) => i.unique === randomProduct.unique);

//       const productImage = document.createElement("img");
//       productImage.setAttribute("src", product_image.image1);
//       productImage.setAttribute("alt", `${randomProduct.name}Image`);
//       productImage.setAttribute("class", "product_img");
//       div_detail.append(productImage);

//       const h3 = document.createElement("h3");
//       h3.setAttribute("class", "text-title");
//       h3.innerHTML = randomProduct.name;
//       div_detail.append(h3);

//       const div_price = document.createElement("div");
//       div_price.setAttribute("class", "text-body");
//       div_detail.append(div_price);

//       const p_price = document.createElement("span");
//       div_price.prepend(p_price);

//       const p_bold = document.createElement("b");
//       p_bold.innerText = "Price:";
//       p_price.append(p_bold);

//       const p_rate = document.createElement("span");
//       p_rate.innerHTML = randomProduct.price;
//       div_price.append(p_rate);

//       const p_currency = document.createElement("span");
//       p_currency.innerHTML = " (INR)";
//       div_price.append(p_currency);

//       document.body.appendChild(div_card);

//       document.querySelector("section.similar_container").append(div_card);
//     }
//   }
// });

// -----------------------------create bid--------------------------//
async function bid(event) {
  event.preventDefault();
  const userUnique = JSON.parse(sessionStorage.getItem("email"));
  if (!userUnique) {
    alert("There is no account please 'Log in'");
  } else {

    const amount = document.getElementById("bid_amount").value;
    const productid = new URLSearchParams(window.location.search).get(
      "productId"
    );
    const buyer = JSON.parse(sessionStorage.getItem("email"));
    const bid = 'http://localhost:8080/vanhaweb/home/productdetail/bid';

    const requestBody = {
      buyer: buyer,
      amount: amount,
      productid: productid
    };
    try {
      const response = await fetch(bid, {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(requestBody).toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.data === 1) {
        const vara = document.getElementById("snackbar");
        vara.className = "show";
        setTimeout(function setTimer() {
          vara.className = vara.className.replace("show", "");
          window.location.reload();
        }, 2000);
      } else {
        alert("Bid failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}


document.getElementById("bid_button").addEventListener("click", bid);
// ------------------------create wishlist---------------------------//
// function addToWishlist(event) {
//   event.preventDefault();

//   const productUnique = new URLSearchParams(window.location.search).get(
//     "product_id"
//   );
//   const userId = JSON.parse(localStorage.getItem("unique_id"));

//   if (!userId) {
//     alert("Please log in to add to wishlist");
//     return;
//   }

//   const wishlistArray = JSON.parse(localStorage.getItem("wishlist")) || [];

//   for (let i = 0; i < wishlistArray.length; i++) {
//     if (
//       wishlistArray[i].product === productUnique &&
//       wishlistArray[i].user_id === userId
//     ) {
//       alert("This item is already in your wishlist!");
//       return;
//     }
//   }

//   const prod = {
//     product: productUnique,
//     user_id: userId,
//   };

//   wishlistArray.unshift(prod);
//   localStorage.setItem("wishlist", JSON.stringify(wishlistArray));

//   const wishnote = document.getElementById("snackbar1");
//   wishnote.className = "show";

//   setTimeout(function setTime() {
//     wishnote.className = wishnote.className.replace("show", "");
//   }, 3000);
// }

// document.getElementById("wish_button").addEventListener("click", addToWishlist);

// --------------------------message button---------------------------------

// const messagePageButton = document.getElementById("message");
// messagePageButton.addEventListener("click", function message() {
//   const product_id = new URLSearchParams(window.location.search).get(
//     "product_id"
//   );
//   const userUnique = JSON.parse(localStorage.getItem("unique_id"));
//   if (!userUnique) {
//     alert("There is no account please 'Log in'");
//   } else {
//     window.location.href = `./chat box.html?product_id=${product_id}`;
//   }
// });

//---------------------------------image change-----------------------------------------//
// function img(thumb) {
//   const main_image = document.getElementById("imagebox");
//   main_image.src = thumb.src;

//   const thumbnail_image1 = document.querySelector("#sub_img0");
//   const thumbnail_image2 = document.querySelector("#sub_img1");
//   const thumbnail_image3 = document.querySelector("#sub_img2");
//   const thumbnail_image4 = document.querySelector("#sub_img3");

//   thumbnail_image1.addEventListener("click", function () {
//     console.log("clicked");
//     img(thumbnail_image1);
//   });

//   thumbnail_image2.addEventListener("click", function () {
//     img(thumbnail_image2);
//   });

//   thumbnail_image3.addEventListener("click", function () {
//     img(thumbnail_image3);
//   });

//   thumbnail_image4.addEventListener("click", function () {
//     img(thumbnail_image4);
//   });
// }
