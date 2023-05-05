// ---------------------------------------------------------//
const backButton = document.getElementById("back");
backButton.addEventListener("click", function back() {
  window.location.href = "./buyer profile.html";
});
// --------------------------------------------------------//

// let photoElements = document.querySelectorAll('.photo');

document.addEventListener("DOMContentLoaded", function allCategory() {
  const bike = document.getElementById("bike");
  const car = document.getElementById("car");
  const laptop = document.getElementById("laptop");
  const mobile = document.getElementById("mobile");

  bike.addEventListener("click", function bIkeCategory() {
    const title = document.querySelector("#category_title");
    title.innerHTML = "Bike";
  });

  car.addEventListener("click", function carCategory() {
    const title = document.querySelector("#category_title");
    title.innerHTML = "Car";
  });

  laptop.addEventListener("click", function laptopCategory() {
    const title = document.querySelector("#category_title");
    title.innerHTML = "Laptop-Desktop";
  });

  mobile.addEventListener("click", function mobileCategory() {
    const title = document.querySelector("#category_title");
    title.innerHTML = "Mobile";
  });
});

// ------------------------create product----------------------//
const addProduct = document.getElementById("add_product");
addProduct.addEventListener("click", function active() {
  const products = JSON.parse(localStorage.getItem("product_data")) || [];
  const user_id = JSON.parse(localStorage.getItem("unique_id"));

  const unique_id = crypto.randomUUID();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}-${month}-${day}`;

  const prodName = document.getElementById("prod_name").value;
  const description = document.getElementById("description").value;
  const prodPrice = document.getElementById("prod_price").value;
  const prodDate = document.getElementById("prod_date").value;
  const duration = document.getElementById("duration").value;
  const category = document.getElementById("category_title").textContent;

  let image;
  if (category === "Bike") {
    image = "https://source.unsplash.com/featured/?motorcycle";
  }
  if (category === "Car") {
    image = "https://source.unsplash.com/featured/?car";
  }
  if (category === "Laptop-Desktop") {
    image = "https://source.unsplash.com/featured/?laptop";
  }
  if (category === "Mobile") {
    image = "https://source.unsplash.com/featured/?mobile-phone";
  }

  if (
    prodName === "" ||
    description === "" ||
    prodPrice === "" ||
    prodDate === "" ||
    duration === ""
  ) {
    alert("Please fill in all required fields");
    return;
  }

  const product = {
    unique: unique_id,
    name: prodName,
    description,
    price: prodPrice,
    date: prodDate,
    duration,
    category,
    user_id,
    uploded_on: date,
    image: [image],
  };

  products.unshift(product);
  localStorage.setItem("product_data", JSON.stringify(products));
  document.getElementById("form").reset();
  window.location.href = "./buyer profile.html";
});

// ----------------------------overlay---------------------------//
function formon() {
  document.getElementById("overlay").style.display = "block";
}

const openBikeForm = document.getElementById("bike");
openBikeForm.addEventListener("click", formon);

const openCarForm = document.getElementById("car");
openCarForm.addEventListener("click", formon);

const openLaptopForm = document.getElementById("laptop");
openLaptopForm.addEventListener("click", formon);

const openMobileForm = document.getElementById("mobile");
openMobileForm.addEventListener("click", formon);

const closeForm = document.getElementById("formOff");
closeForm.addEventListener("click", function off() {
  document.getElementById("overlay").style.display = "none";
});
