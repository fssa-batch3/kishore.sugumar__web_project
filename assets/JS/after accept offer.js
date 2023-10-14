document.addEventListener("DOMContentLoaded", function product() {
  const bidId = new URLSearchParams(window.location.search).get("id");

  const buyerDetailUrl = `${serverPath}/home/profile/allbids/buyer?bidId=${bidId}`;

  fetch(buyerDetailUrl, {
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
        const productImage = document.getElementById("product_img");
        productImage.setAttribute("src", object.productImage);
        productImage.setAttribute("alt", `${object.productName} image`);
        document.getElementById("product_name").innerHTML = object.productName;
        document.getElementById("prod_price").innerHTML = object.productPrice;

        const img = document.querySelector(".buyer");

        img.setAttribute("src", object.buyerImage);
        img.setAttribute("alt", `${object.buyerName}image`);

        document.querySelector("#buyer_name").innerHTML = object.buyerName;
        document.querySelector("#buyer_email").innerHTML = object.buyerEmail;
        document.querySelector("#buyer_phone").innerHTML = object.buyerNumber;
        document.querySelector("#buyer_location").innerHTML = object.buyerLocation;

        const sold = new URLSearchParams(window.location.search).get("sold");
        if (sold) {
          const alreadySold = document.getElementById("sell");
          alreadySold.remove();
        } else {
          const ids = object.productId + "/" + bidId;
          const sellButton = document.getElementById("sell");
          sellButton.setAttribute("reference", ids);
        }
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
});

// --------------------------------------------------------//


function sell(ids) {

  const sellURL = `${serverPath}/home/profile/allbids/sell?refer=${ids}`;

  fetch(sellURL, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.statusCode === 200 && data.message === "Sold successfully") {
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
}



const sellProduct = document.getElementById("sell");
sellProduct.addEventListener("click", function () {
  let value = sellProduct.getAttribute("reference");
  sell(value);
  window.location.href = "./sold page.html";
});

const nextPageButton = document.getElementById("redirect");
nextPageButton.addEventListener("click", function redirect() {
  history.back()
});
