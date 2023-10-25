// This event listener function is triggered when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", function product() {
  // Extract the 'id' parameter from the URL query string.
  const bidId = new URLSearchParams(window.location.search).get("id");

  // Construct the URL for fetching buyer details based on the 'bidId'.
  const buyerDetailUrl = `${serverPath}/home/profile/allbids/buyer?bidId=${bidId}`;

  // Fetch the buyer details from the server.
  fetch(buyerDetailUrl, {
    method: 'GET',
  })
    .then(response => {
      // Check if the network response is not OK (e.g., HTTP error).
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.statusCode === 200) {
        // Extract and display the product and buyer details.

        // Set the product image source and alt attribute.
        const productImage = document.getElementById("product_img");
        productImage.setAttribute("src", object.productImage);
        productImage.setAttribute("alt", `${object.productName} image`);
        
        // Set the product name and price.
        document.getElementById("product_name").innerHTML = object.productName;
        document.getElementById("prod_price").innerHTML = object.productPrice;

        // Set the buyer image source and alt attribute.
        const img = document.querySelector(".buyer");
        img.setAttribute("src", object.buyerImage);
        img.setAttribute("alt", `${object.buyerName} image`);
        
        // Set the buyer details.
        document.querySelector("#buyer_name").innerHTML = object.buyerName;
        document.querySelector("#buyer_email").innerHTML = object.buyerEmail;
        document.querySelector("#buyer_phone").innerHTML = object.buyerNumber;
        document.querySelector("#buyer_location").innerHTML = object.buyerLocation;

        // Check if the 'sold' parameter is present in the URL.
        const sold = new URLSearchParams(window.location.search).get("sold");
        if (sold) {
          // If sold, remove the 'sell' button.
          const alreadySold = document.getElementById("sell");
          alreadySold.remove();
        } else {
          // If not sold, set the 'reference' attribute for the 'sell' button.
          const ids = object.productId + "/" + bidId;
          const sellButton = document.getElementById("sell");
          sellButton.setAttribute("reference", ids);
        }
      } else if (data.statusCode === 500) {
        // Redirect to the 500 error page.
        window.location.href = "../error/500error.html";
      } else {
        // Handle other status codes and display an error message.
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

// Function for selling a product based on the 'ids' parameter.
function sell(ids) {
  const sellURL = `${serverPath}/home/profile/allbids/sell?refer=${ids}`;
  
  // Fetch the request to sell the product.
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
        // Handle a successful sale.
      } else if (data.statusCode === 500) {
        // Redirect to the 500 error page.
        window.location.href = "../error/500error.html";
      } else {
        // Handle other status codes and display an error message.
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

// Event listener for selling a product.
const sellProduct = document.getElementById("sell");
sellProduct.addEventListener("click", function () {
  let value = sellProduct.getAttribute("reference");
  // Call the 'sell' function and redirect to the sold page.
  sell(value);
  window.location.href = "./sold page.html";
});

// Event listener for navigating to the previous page.
const nextPageButton = document.getElementById("redirect");
nextPageButton.addEventListener("click", function redirect() {
  history.back()
});
