// ------------------------register-----------------------------//
function register(e) {
  e.preventDefault();
  let password = document.getElementById("regi_password").value;
  let c_password = document.getElementById("c_password").value;

  if (password !== c_password) {
    alert("Passwords do not match");
    return;
  }

  let user_detail = {
    name: document.getElementById("regi_name").value,
    email: document.getElementById("regi_email").value,
    phone: document.getElementById("regi_phone").value,
    password: password,
  };

  let stored_data = JSON.parse(localStorage.getItem("user_data")) || [];
  let idExist = false;

  for (let i = 0; i < stored_data.length; i++) {
    if (user_detail.email === stored_data[i].email) {
      idExist = true;
      break;
    }
  }
  if (idExist) {
    alert('This email is already registered');
    return;
  }

  stored_data.push(user_detail);
  localStorage.setItem("user_data", JSON.stringify(stored_data));
  localStorage.setItem("unique_id", JSON.stringify(user_detail.email));
  window.location.href = "../index.html";
}
// --------------------------login------------------------------//
function log_in(e) {
  e.preventDefault();
  let stored_data = JSON.parse(localStorage.getItem("user_data")) || [];

  let user_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  for (let i = 0; i < stored_data.length; i++) {
    if (user_data.email === stored_data[i].email && user_data.password === stored_data[i].password) {
      alert('Successfully logged in');
      localStorage.setItem("unique_id", JSON.stringify(user_data.email))
      window.location.reload();
      return;
    }
  }
  alert('Not able to find the user')
}

//----------------------------overlay---------------------------//
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
// ------------------------edit profile--------------------------------------//
function update(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let location = document.getElementById("location").value;

  let user_data = get_object(email, stored_data);

  if (user_data) {
    user_data.name = name;
    user_data.phone = phone;
    user_data.email = email;
    user_data.location = location;
  } else {
    user_data = {
      "name": name,
      "email": email,
      "phone": phone,
      "location": location,
    };
    stored_data.push(user_data);
  }

  localStorage.setItem("user_data", JSON.stringify(stored_data));
  window.location.reload();
  return;
}
// -----------------------------delete profile--------------------------------------//

//   function del(event) {
//     if (confirm("Are you sure you want to delete your profile")) {
//       let users = JSON.parse(localStorage.getItem('user_data'));
//       let unique_id = JSON.parse(localStorage.getItem('unique'));

//       function profile_data(e) {
//         return e.email == unique_id;
//       }

//       let user_data = users.find(profile_data);
//       let i_User = users.indexOf(user_data);
//       console.log(i_User);
//       users.splice(i_User, 1);
//       localStorage.setItem("user_data", JSON.stringify(users));
//       delete localStorage.unique;
//       location.href = "../index.html"
//     }
//   }
// -------------------------delete profile-----------------------//
function del(event) {
  event.preventDefault();

  let users = JSON.parse(localStorage.getItem("user_data"));
  let unique = JSON.parse(localStorage.getItem("unique_id"));
  let products = JSON.parse(localStorage.getItem("product_data"));

  products = products.filter((product) => product.user_id !== unique);
  localStorage.setItem("product_data", JSON.stringify(products));

  let index = users.findIndex((user) => user.email === unique);
  if (index !== -1) {
    if (confirm("Are you sure you want to delete your account")) {
      users.splice(index, 1);
      localStorage.setItem("user_data", JSON.stringify(users));

      products = products.filter((product) => product.user_id !== unique);
      localStorage.setItem("product_data", JSON.stringify(products));

      localStorage.removeItem("unique_id");

      location.href = "../index.html";
    }
    else {
      return;
    }
  }
}