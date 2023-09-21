// ---------------------------------------------------------//
const backButton = document.getElementById("back");
backButton.addEventListener("click", function back() {
  window.location.href = "./buyer profile.html";
});

// ------------------------create product----------------------//
const addProduct = document.getElementById("add_product");
addProduct.addEventListener("click", function active() {
  const products = JSON.parse(localStorage.getItem("product_data")) || [];
  const user_id = JSON.parse(localStorage.getItem("unique_id"));

  const unique_id = crypto.randomUUID();

  const now = new Date();

  const prodName = document.getElementById("prod_name").value;
  const description = document.getElementById("description").value;
  const prodPrice = document.getElementById("prod_price").value;
  const prodDate = document.getElementById("prod_date").value;
  const duration = document.getElementById("duration").value;
  const category = document.getElementById("category_title").textContent;
  const lowPrice = document.getElementById("lowPrice").value;

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
    duration === "" ||
    lowPrice === ""
  ) {
    alert("Please fill in all required fields");
    return;
  }

  if(lowPrice >= prodPrice){
    alert("Minimum price must lower then the original price");
    return;
  }

  if(prodPrice > lowPrice){

  const product = {
    unique: unique_id,
    name: prodName,
    description,
    price: prodPrice,
    minimumPrice: lowPrice,
    date: prodDate,
    duration,
    category,
    user_id,
    uploded_on: now.getTime(),
    image: [image],
  };

  products.unshift(product);
  localStorage.setItem("product_data", JSON.stringify(products));
  document.getElementById("form").reset();
  window.location.href = "./buyer profile.html";
}
});

