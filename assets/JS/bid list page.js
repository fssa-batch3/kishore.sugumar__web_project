// -----------------------------read bid (buyer)--------------------------//

document.addEventListener("DOMContentLoaded", function bid_prod() {
const userEmail = JSON.parse(sessionStorage.getItem("email"));

if (!userEmail) {
  errorBox('User email is missing.');
} else {
  const proflieFetch = `http://localhost:8080/vanhaweb/home/listproduct?userEmail=${userEmail}`;

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
          console.log(errorMessage);
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

function displayProducts(element) {
  const box = document.querySelector(".box");

  if (element.length > 0) {
    element.forEach((productObj) => {
      const div_card = document.createElement("div");
      div_card.setAttribute("data-unique", productObj.productId);
      div_card.classList.add("content");

      const image = document.createElement("img");
      image.setAttribute("src", productObj.image);
      image.setAttribute("alt", `${productObj.name}Image`);
      image.classList.add("product-img");
      div_card.prepend(image);

      const h3 = document.createElement("h3");
      h3.setAttribute("class", "prod_name");
      h3.setAttribute("id", "prod_name");
      h3.textContent = productObj.name;
      div_card.append(h3);

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


const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  history.back()
});
