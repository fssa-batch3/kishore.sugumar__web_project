// ---------------------------------------------------------//
const backButton = document.getElementById("back");
backButton.addEventListener("click", function back() {
  window.location.href = "./buyer profile.html";
});


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

// ------------------------create product----------------------//
const addProduct = document.getElementById("add_product");
addProduct.addEventListener("click", async function active() {
  const user_id = sessionStorage.getItem("email");

  const unique_id = crypto.randomUUID();

  const prodName = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const prodPrice = document.getElementById("price").value;
  const prodDate = document.getElementById("period").value;
  const duration = document.getElementById("duration").value;
  const category = document.getElementById("category").value;
  const lowPrice = document.getElementById("min_price").value;


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

  if (parseInt(prodPrice) <= parseInt(lowPrice)) {
    alert("Minimum price "+lowPrice+" must lower then the product price "+prodPrice);
    return;
  } else {

    const product = {
      unique: unique_id,
      name: prodName,
      description: description,
      price: parseInt(prodPrice),
      minimumPrice: parseInt(lowPrice),
      date: prodDate,
      duration: duration,
      category: category,
      user_id: user_id,
    };

    const createProduct = 'http://localhost:8080/vanhaweb/home/create';

  try {
    const response = await fetch(createProduct, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.statusCode === 200) {
      alert("Created Successfully");
      window.location.href="./buyer profile.html";
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
  } catch (error) {
    console.error('Error:', error);
  }
  }
});

//------------------------------------------//
function showRequirement(inputId) {
  const requirementMessage = getRequirementMessage(inputId);
  const requirementElement = document.getElementById(inputId + '-requirement');
  if (requirementElement) {
    requirementElement.textContent = requirementMessage;
  }
}

function clearRequirement() {
  const requirements = document.querySelectorAll('.requirement');
  requirements.forEach((requirement) => {
    requirement.textContent = '';
  });
}

function getRequirementMessage(inputId) {
  
  if (inputId === 'name') {
    return 'Enter your product name.';
  } else if (inputId === 'price') {
    return "Price should not exceed 1 crore Rs and not less than 10 Rs.";
  }else if (inputId === 'min_price') {
    return 'Minimum price should be lesser then price.';
  }else if (inputId === 'description') {
    return 'Give your description in points.';
  }else if (inputId === 'period') {
    return 'Give number of year or month.';
  }

}