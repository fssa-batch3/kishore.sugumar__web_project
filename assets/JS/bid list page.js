// -----------------------------read bid (buyer)--------------------------//
/**
 * This script is responsible for fetching and displaying products that a buyer can bid on.
 * It listens for the 'DOMContentLoaded' event and fetches the products associated with the user's email.
 * If products are found, it displays them. If no products are found, it displays a message.
 * This script also handles the 'Bid more' button click event.
 */

document.addEventListener("DOMContentLoaded", function bid_prod() {
  const userEmail = JSON.parse(sessionStorage.getItem("email"));

  if (!userEmail) {
    errorBox('User email is missing.');
  } else {
    const proflieFetch = `${serverPath}/home/listproduct?userEmail=${userEmail}`;

    fetch(proflieFetch, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      })
      .then((data) => {
        if (data.statusCode === 200) {
          displayProducts(data.data);
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
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }
});

/**
 * Display the list of products.
 * @param {Array} element - Array of product objects to display.
 */

function displayProducts(element) {
  const box = document.querySelector(".box");

  if (element.length > 0) {
    element.forEach((productObj) => {
      const div_card = document.createElement("div");
      div_card.setAttribute("data-unique", productObj.productId);
      div_card.classList.add("content");

      const image = document.createElement("img");
      if (productObj.image == null) {
        image.setAttribute("src", "https://iili.io/JJTtQaa.jpg");
      } else {
        image.setAttribute("src", productObj.image);
      }
      image.setAttribute("alt", `${productObj.name}Image`);
      image.classList.add("product-img");
      div_card.prepend(image);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "prod_name");
      h3.setAttribute("id", "prod_name");
      h3.textContent = productObj.name;
      div_card.append(h3);

      if (productObj.status === 'a') {
        const anch = document.createElement("a");
        anch.setAttribute(
          "href",
          `./product page.html?productId=${productObj.productId}`
        );
        div_card.append(anch);

        const button2 = document.createElement("button");
        button2.classList.add("button2", "algn");
        button2.textContent = "Bid more";
        button2.setAttribute("id", "Bid more");
        anch.append(button2);
      } else {
        const sold = document.createElement("p");
        sold.setAttribute("class", "sold");
        sold.textContent = "Product sold";
        div_card.append(sold);
      }

      box.append(div_card);
    });
  } else {
    box.classList.remove("box");
    box.classList.add("empty");

    const noProductMessage = document.createElement("h2");
    noProductMessage.setAttribute("class", "noProduct");
    noProductMessage.textContent = "Your bidlist is empty. 'Bid any product.'";
    box.append(noProductMessage);

    const image = document.createElement("img");
    image.setAttribute("src", "../assets/img/illustration/empty bidlist.png");
    image.setAttribute("alt", "illustration image");
    image.setAttribute("class", "illustration-image");
    box.append(image);
  }
}

// Event listener for the "Back" button
const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  history.back()
});
