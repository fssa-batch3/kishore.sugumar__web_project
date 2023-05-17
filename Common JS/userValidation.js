function UserValidation(event) {

  const nameErrorMessage = document.querySelector("p.nameError");
  const emailErrorMessage = document.querySelector("p.emailError");
  const numberErrorMessage = document.querySelector("p.numberError");
  const passwordErrorMessage = document.querySelector("p.passwordError");
  const confirmErrorMessage = document.querySelector("p.confirmError");

  const userName = document.getElementById("regi_name").value;
  const userEmail = document.getElementById("regi_email").value;
  const userNumber = document.getElementById("regi_phone").value;
  const userPassword = document.getElementById("regi_password").value;
  const confirmPassword = document.getElementById("c_password").value;


  if (userPassword !== confirmPassword) {
    confirmErrorMessage.innerHTML = "Passwords do not match";
    return;
  }


  function nameValidation(name) {
    const nameRegex = /^[A-Za-z]+(?:[^\W\d_ ]+[A-Za-z])*$/g;
    if (!nameRegex.test(name)) {
      nameErrorMessage.innerHTML = "Invalid name format (Use only alphabets)";
      return;
    }
  }

  function emailValidation(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailErrorMessage.innerHTML = "Invalid email format (Use proper email)";
      return;
    }
  }

  function numberValidation(number) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      numberErrorMessage.innerHTML =
        "Invalid phone number format (Use only number and number should start with (6,7,8,9).)";
      return;
    }
  }

  function passwordValidation(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/;
    if (!passwordRegex.test(password)) {
      passwordErrorMessage.innerHTML =
        "Invalid password format (password must contain atleast one uppercase, one lower, one special character and numbers. It should contain 8 characters eg:ABde12!#)";
      return;
    }
  }

  nameValidation(userName);
  emailValidation(userEmail);
  numberValidation(userNumber);
  passwordValidation(userPassword);

  event.preventDefault();
}

document
  .getElementById("registerForm")
  .addEventListener("submit", UserValidation);
