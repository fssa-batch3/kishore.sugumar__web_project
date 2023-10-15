
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
//----------------------------------------------------------------//
const productId = new URLSearchParams(window.location.search).get("productId");

const uri = `${serverPath}/home/productdetail?productId=${productId}`;

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

    if (data.statusCode === 200) {
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

        const table = document.createElement("table");
        
        const headerRow = document.createElement("tr");
        const headerCells = ["No", "Buyer", "Amount", "Date"];
        
        headerCells.forEach((cellText) => {
          const headerCell = document.createElement("th");
          headerCell.textContent = cellText;
          headerRow.appendChild(headerCell);
        });
        
        table.appendChild(headerRow);
        
        const  user = JSON.parse(sessionStorage.getItem("email"));

        for (let i = 0; i < bidsArray.length; i++) {
          const bid = bidsArray[i];
        
          const dataRow = document.createElement("tr");

          if(bid.buyerEmail === user){
            dataRow.setAttribute("class", "my");
          }
        
          const listNoCell = document.createElement("td");
          listNoCell.textContent = bid.listNo;
        
          const buyerCell = document.createElement("td");
          const buyerImage = document.createElement("img");
          buyerImage.src = bid.buyerImage;
          buyerImage.alt = `${bid.buyerName} Image`;
          buyerImage.classList.add("buyer_img");
          buyerCell.setAttribute("class", "aling");
          buyerCell.appendChild(buyerImage);
          const name = document.createElement("span");
          name.innerHTML = bid.buyerName;
          buyerCell.appendChild(name);
        
          const amountCell = document.createElement("td");
          amountCell.setAttribute("class", "amount");
          amountCell.textContent = `${bid.amount} ₹`;
        
          const dateCell = document.createElement("td");
          dateCell.setAttribute("class", "date");
          dateCell.textContent = formatDateTime(bid.date);
        
          dataRow.appendChild(listNoCell);
          dataRow.appendChild(buyerCell);
          dataRow.appendChild(amountCell);
          dataRow.appendChild(dateCell);
        
          table.appendChild(dataRow);
        }
        
        container.appendChild(table);
      }        
      const user = JSON.parse(sessionStorage.getItem("email"));
      console.log(object.category, user);
      similar(object.category, user);
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }

  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// -----------------------------------similar prdocut----------------------------------------//

function similar(category, user){

  var similarURL;
  if(user != null){
  similarURL = `${serverPath}/home/categroyproduct?Category=${category}&email=${user}`;
  }else{
  similarURL = `${serverPath}/home/categroyproduct?Category=${category}`; 
  }

  fetch(similarURL, {
    method: 'GET',
    headers : {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
  
    })
    .then(data => {
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
        if(product.asset == undefined){
          productImage.src = "https://iili.io/JJTtQaa.jpg";
        }else{
        productImage.src = product.asset;
        }
        productImage.alt = `${product.ProductName} Image`;
        productImage.classList.add("similar_img");
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
        sellerImage.classList.add("other_seller_img");
        sellerInfo.appendChild(sellerImage);
  
        const sellerDetails = document.createElement("div");
        sellerInfo.appendChild(sellerDetails);
  
        const sellerNameSpan = document.createElement("div");
        sellerNameSpan.innerHTML = `<b>Seller:</b> ${product.sellerName}`;
        sellerNameSpan.classList.add("other_seller_name");
        sellerDetails.appendChild(sellerNameSpan);
  
        const sellerLocationSpan = document.createElement("div");
        sellerLocationSpan.innerHTML = `<b>Location:</b> ${product.sellerLocation}`;
        sellerLocationSpan.classList.add("other_seller_location");
        sellerDetails.appendChild(sellerLocationSpan);
  
        document.querySelector(".similar_container").appendChild(card);
      }

      if (data.statusCode === 200) {
        if (loadData != null) {
          loadData.forEach(createProductCard);
        } else {
          let noSimilar = document.getElementById("similar");
          noSimilar.remove();
        }
      }
       else if (data.statusCode === 500) {
        window.location.href = "../error/500error.html";
      } else {
        let errorMessage = '';
        if (data.statusCode === 400) {
          errorMessage = data.message;
          errorBox(errorMessage);
        } else {
          errorMessage = 'An unknown error occurred.';
        }
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
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

//---------------------------time formatter------------------------//
function getMonthAbbreviation(monthNumber) {
  switch (monthNumber) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
    default:
      return "Invalid Month";
  }
}

function getAmOrPm(hour) {
  var time = Number(hour);
  if (time >= 0 && time < 12) {
    return "AM";
  } else {
    return "PM";
  }
}

function formatDateTime(dateTimeString) {
  var date = dateTimeString;
  var year = date.substring(0, 4);
  let num = date.substring(5, 7);
  var month = getMonthAbbreviation(num);
  var day = date.substring(8, 10);
  var time = date.substring(11, 16);
  var std = getAmOrPm(date.substring(11, 13));
  return day + " " + month + " " + year + " " + time + " " + std;
}

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
    const bid = `${serverPath}/home/productdetail/bid`;

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

      if (data.statusCode === 200) {
        const vara = document.getElementById("snackbar");
        vara.className = "show";
        setTimeout(function setTimer() {
          vara.className = vara.className.replace("show", "");
          window.location.reload();
        }, 2000);
      } else if (data.statusCode === 500) {
        window.location.href = "../error/500error.html";
      } else {
        let errorMessage = '';
        if (data.statusCode === 400) {
          errorMessage = data.message;
          errorBox(errorMessage);
        } else {
          errorMessage = 'An unknown error occurred.';
        }
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
function img(thumb) {
  const main_image = document.getElementById("imagebox");
  main_image.src = thumb.src;

  const thumbnail_image1 = document.querySelector("#sub_img0");
  const thumbnail_image2 = document.querySelector("#sub_img1");
  const thumbnail_image3 = document.querySelector("#sub_img2");
  const thumbnail_image4 = document.querySelector("#sub_img3");

  thumbnail_image1.addEventListener("click", function () {
    img(thumbnail_image1);
  });

  thumbnail_image2.addEventListener("click", function () {
    img(thumbnail_image2);
  });

  thumbnail_image3.addEventListener("click", function () {
    img(thumbnail_image3);
  });

  thumbnail_image4.addEventListener("click", function () {
    img(thumbnail_image4);
  });
}
