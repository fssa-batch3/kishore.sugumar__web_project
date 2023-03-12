//------------------------create product----------------------//
function active(e) {

  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("product_data")) || [];
  let user_id = JSON.parse(localStorage.getItem("unique_id"));

  let unique_id = uuidv4();

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

  const product = {
    unique: unique_id,
    name: prodName,
    description: description,
    price: prodPrice,
    date: prodDate,
    duration: duration,
    category: category,
    user_id: user_id,
    uploded_on: date
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

  let stored_data = JSON.parse(localStorage.getItem("product_data"));
  let unique = document.getElementById("unique_id").innerHTML;
  console.log(unique)
  let prod_data = stored_data.find(product => product.unique === unique);
  console.log(prod_data)
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
  //---------------------------add product----------------------//
// function active(category){
//   document.getElementById("add_product").addEventListener("click", function addProduct(e) {
//     e.preventDefault();

//     let unique_id = uuidv4();

//     let product_detail = {
//       unique_id: unique_id,
//       prod_name: document.getElementById("prod_name").value,
//       description: document.getElementById("description").value,
//       prod_price: document.getElementById("prod_price").value,
//       prod_rupee: document.getElementById("rupee").value,
//       prod_date: document.getElementById("prod_date").value,
//       prod_duration: document.getElementById("duration").value,
//       user_id: document.getElementById("user_name").innerText
//     };

//     if (!product_detail.prod_name || !product_detail.description || !product_detail.prod_price || !product_detail.prod_rupee || !product_detail.prod_date || !product_detail.prod_duration) {
//       alert('One or more input elements is missing!');
//       return;
//     }

//     let product_data = JSON.parse(localStorage.getItem('product_data')) || {"bike":[], "car":[], "laptop&desktop":[], "mobile":[]};

//     let category = document.getElementById("category").value;
//     if (product_data.hasOwnProperty(category)) {
//       product_data[category].push(product_detail);
//     } else {
//       product_data[category] = [product_detail];
//     }

//     localStorage.setItem('product_data', JSON.stringify(product_data));

//     let uniqueIds = JSON.parse(localStorage.getItem(unique_id)) || [];

//     uniqueIds.push(unique_id);
//     localStorage.setItem('unique_ids', JSON.stringify(uniqueIds));

//     document.getElementById("form").reset();
//     alert("Product Created successfully")
//     window.location.href = "./buyer profile.html";
// })
// };