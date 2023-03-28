//------------------------create product----------------------//
function active(e) {

  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("product_data")) || [];
  let user_id = JSON.parse(localStorage.getItem("unique_id"));

  let unique_id = crypto.randomUUID();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = year + "-" + month + "-" + day;

  const prodName = document.getElementById("prod_name").value;
  const description = document.getElementById("description").value;
  const prodPrice = document.getElementById("prod_price").value;
  const prodDate = document.getElementById("prod_date").value;
  const duration = document.getElementById("duration").value;
  const category = document.getElementById("category_title").textContent;

  let image;
  if(category == "Bike"){
    image =  "https://source.unsplash.com/featured/?motorcycle";
  }
  if(category == "Car"){
    image = "https://source.unsplash.com/featured/?car";
  }
  if(category == "Laptop-Desktop"){
    image =  "https://source.unsplash.com/featured/?laptop";
  }
  if(category == "Mobile"){
    image = "https://source.unsplash.com/featured/?mobile-phone";
  }

  if (prodName === "" || description === "" || prodPrice === "" || prodDate === "" || duration === "") {
    alert ("Please fill in all required fields");
    return;
  }


  const product = {
    unique: unique_id,
    name: prodName,
    description: description,
    price: prodPrice,
    date: prodDate,
    duration: duration,
    category: category,
    user_id: user_id,
    uploded_on: date,
    image:image
  };

  products.push(product);
  localStorage.setItem("product_data", JSON.stringify(products));
  document.getElementById("form").reset();
  window.location.href = "./buyer profile.html";
};
// ------------------------uplode image-------------------------//
// photoElements.forEach(function (photoElement) {
//   let inputElement = photoElement.querySelector('input[type="file"]');

//   inputElement.addEventListener('change', function (event) {
//     let image = new Image();
//     image.src = URL.createObjectURL(event.target.files[0]);

//     image.onload = function () {
//       photoElement.style.backgroundImage = "url(" + image.src + ")";
//       photoElement.style.width = "300px";
//       photoElement.style.height = "200px";
//       photoElement.style.backgroundSize = "contain";
//       photoElement.style.backgroundRepeat = "no-repeat";
//       photoElement.style.backgroundPosition = "center";
//     };
//   });
// });
//-------------------------read product(in edit form)-----------------//
function update_prod(e, uniqueId) {
  e.preventDefault();

  let stored_data = JSON.parse(localStorage.getItem("product_data"));

  let product = stored_data.find((prod) => prod.unique === uniqueId);

  document.getElementById("category").innerHTML = product.category;
  document.getElementById("uploded_on").innerHTML = product.uploded_on;
  document.getElementById("unique_id").innerHTML = product.unique;
  document.getElementById("user_id").innerHTML = product.user_id;
  document.getElementById("prod_name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("prod_price").value = product.price;
  document.getElementById("used_period").value = product.date;
}
//-------------------------edit product------------------------//
function edit_prod(e) {
  e.preventDefault();

  let category = document.getElementById("category").innerHTML;
  let user_id = document.getElementById("user_id").innerHTML;
  let prod_name = document.getElementById("prod_name").value;
  let description = document.getElementById("description").value;
  let prod_price = document.getElementById("prod_price").value;
  let used_period = document.getElementById("used_period").value;
  let duration = document.getElementById("duration").value;

  if (category === "" || user_id === "" || prod_name === "" || description === "" || prod_price === "" || used_period === "" || duration === "") {
    alert ("Please fill in all required fields");
    return;
  }

  let stored_data = JSON.parse(localStorage.getItem("product_data"));
  let unique = document.getElementById("unique_id").innerText;

  let prod_data = stored_data.find(product => product.unique === unique);

  if (prod_data) {
    prod_data.category = category;
    prod_data.user_id = user_id;
    prod_data.name = prod_name;
    prod_data.description = description;
    prod_data.price = prod_price;
    prod_data.date = used_period;
    prod_data.duration = duration;
  }

  localStorage.setItem("product_data", JSON.stringify(stored_data));
  window.location.reload();
}
//-------------------------delete product------------------------//
function remove_prod(e, uniqueId) {
  e.preventDefault();

  let stored_data = JSON.parse(localStorage.getItem("product_data"));
  let index = stored_data.findIndex((prod) => prod.unique === uniqueId);

  if (index !== -1) {
    if (confirm("Are you sure you want to remove your product")) {
      stored_data.splice(index, 1);
      localStorage.setItem("product_data", JSON.stringify(stored_data));
      window.location.reload();
    } else {
      return;
    }
  }
  window.location.reload();
}