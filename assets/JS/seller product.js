
// ------------------------- read product(in seller page)-----------------//

document.addEventListener("DOMContentLoaded", function update_prod() {

  const productId = new URLSearchParams(window.location.search).get("product_id");

  const sellerProductUri = `http://localhost:8080/vanhaweb/home/profile/productdetail?productId=${productId}`;


  fetch(sellerProductUri, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const object = data.data;
      console.log(object);
      document.querySelector("#prod_name").innerHTML = object.productName;
      document.querySelector("#description").innerHTML = object.description;
      document.querySelector("#prod_price").innerHTML = object.price;
      document.querySelector("#prod_date").innerHTML = object.usedPeriod;
      document.querySelector("#duration").innerHTML = object.usedDuration;

      for (let i = 0; i < 4; i++) {
        const img = document.createElement("img");
        if (object.assets[i] != null) {
          img.setAttribute("src", object.assets[i]["value"]);
        } else {
          img.setAttribute("src", "../assets/img/illustration/blank.jpg");
        }
        img.setAttribute("alt", `${object.productName} image`);
        img.setAttribute("id", `sub_img${i}`);
        img.setAttribute("class", `product_img`);
        img.setAttribute("onclick", "img(this)");
        document.querySelector(".images").appendChild(img);
      }

      //--------------------Edit from-------------------------//

      document.querySelector("#edit_name").value = object.productName;
      document.querySelector("#edit_description").value = object.description;
      document.querySelector("#edit_price").value = object.price;
      document.querySelector("#edit_period").value = object.usedPeriod;
      document.querySelector("#edit_min_price").value = object.minPrice;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
})

//------------------------edit profile--------------------------------------//

function nameValidation(prod_name) {
  const nameRegex = /^(?!\s)[a-zA-Z\s\d/]+$/;
  return nameRegex.test(prod_name);
}

function descriptionValidation(description) {
  const nameRegex = /^(?!\s)/;
  return nameRegex.test(description);
}

async function updateProduct() {

  const id = new URLSearchParams(window.location.search).get("product_id");
  const prod_name = document.querySelector("#edit_name").value;
  const description = document.querySelector("#edit_description").value;
  const prod_price = document.querySelector("#edit_price").value;
  const min_price = document.querySelector("#edit_min_price").value;
  const used_period = document.querySelector("#edit_period").value;
  const duration = document.querySelector("#edit_duration").value;

  if (prod_name === "" || description === "" || location === "") {
    alert("Fill all the fields");
    return;
  }

  if (!nameValidation(prod_name)) {
    return alert("Use only alphabets");
  }

  if (!descriptionValidation(description)) {
    return alert("Give proper message");
  }

  if (prod_price <= 0) {
    return alert("Product price cannot be 0");
  }

  if (min_price <= 0) {
    return alert("Minimum price cannot be 0");
  }

  if (used_period <= 0) {
    return alert("Used period cannot cannot be 0");
  }

  if (duration != "month" && duration != "year") {
    return alert("Duration should be year or month no other than this");
  }

  if (prod_price < min_price) {
    return alert("Minimum price should greater than tha actual price");
  }

  const product_detail = {
    productId: id,
    name: prod_name,
    description: description,
    price: prod_price,
    min_price: min_price,
    usedPeriod: used_period,
    usedDuration: duration,
  };

  console.log(product_detail);

  const updateProduct = 'http://localhost:8080/vanhaweb/home/profile/productdetail/update';

  fetch(updateProduct, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product_detail),
  })

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

    .then(responseText => {
      console.log(responseText);
      if (responseText.data === 1) {
        alert("Edited Successfully");
        window.location.reload();
      } else {
        alert("Updation failed");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const updateButton = document.getElementById("editProduct");
updateButton.addEventListener("click", async function () {
  await updateProduct();
});

// ------------------------------------------------------------------ //
const editFormOffBtn = document.getElementById("editform_off");
editFormOffBtn.addEventListener("click", function editform_off() {
  document.getElementById("prod_edit").style.display = "none";
});

const editFormOnBtn = document.getElementById("editform_on");
editFormOnBtn.addEventListener("click", function editform_on() {
  document.getElementById("prod_edit").style.display = "block";
});

const backPage = document.getElementById("back");
backPage.addEventListener("click", function back() {
  window.location.href = "buyer profile.html";
});
// // -----------------------------------seller read other's chat-------------------------------//

// document.addEventListener("DOMContentLoaded", function messageAlert() {
//   const unique = new URLSearchParams(window.location.search).get("product_id");
//   const messageArray = JSON.parse(localStorage.getItem("messageArray"));
//   const buyerArray = JSON.parse(localStorage.getItem("user_data"));

//   if (!messageArray) {
//     return;
//   }

//   const buyerIndex = messageArray.filter((m) => m.productId === unique);
//   if (!buyerIndex) {
//     const display = document.querySelector("section.message-box");
//     display.setAttribute("style", "display:none");
//   }
//   else{
//     buyerIndex.forEach(function userMessage(buyer) {
//       let buyerIndex = buyerArray.find((b) => b.email === buyer.buyerId)
//       const div_card = document.createElement("span");
//       div_card.setAttribute("data-unique", buyerIndex.email);
//       div_card.setAttribute("class", "messager-list");

//       const image = document.createElement("img");
//       image.setAttribute("src", buyerIndex.image);
//       image.setAttribute("alt", `${buyerIndex.name} Image`);
//       image.classList.add("messager-img");
//       div_card.append(image);

//       const h2 = document.createElement("h2");
//       h2.setAttribute("class", "messager-name");
//       h2.textContent = buyerIndex .name;
//       div_card.append(h2);

//       document.querySelector("div.messager").append(div_card);
//       }
//     );
//   }
// });

// // ------------------------------------- seller read chats --------------------------------------//

// document.addEventListener("DOMContentLoaded", function sellerRead() {
//   const cards = document.querySelectorAll(".messager-list");
//   cards.forEach(function eachCard(card) {
//     card.addEventListener("click", function showMessage() {
//       const unique = new URLSearchParams(window.location.search).get(
//         "product_id"
//       );
//       const cardId = this.getAttribute("data-unique");

//       sessionStorage.setItem("cardId", JSON.stringify(cardId));
//       const messageArray = JSON.parse(localStorage.getItem("messageArray"));
//       const textArray = JSON.parse(localStorage.getItem("textArray"));
//       const seller = JSON.parse(localStorage.getItem("unique_id"));

//       if (!messageArray) {
//         return;
//       }

//       const parentMessage = document.querySelector(".messages");
//       parentMessage.setAttribute("style", "");

//       const messageArea = document.querySelector(".chat-box");

//       messageArea.innerHTML = "";

//       const message = messageArray.filter(
//         (findMessage) =>
//           findMessage.productId === unique
//       );

//       const findMessageId = message.find((m) => m.buyerId === cardId);

//       const messages = textArray.filter(
//         (text) =>
//           text.productId === unique && text.messageId === findMessageId.messageId
//       );


//       messages.forEach(function messageSeperator(text) {
//         const messageContainer = document.createElement("div");
//         messageContainer.classList.add("message-container");

//         const messageContent = document.createElement("span");
//         if (text.messagerId === seller) {
//           messageContent.classList.add("sent");
//         } else {
//           messageContent.classList.add("other-message");
//         }
//         messageContent.innerHTML = text.message;
//         messageContainer.appendChild(messageContent);

//         const messageTimestamp = document.createElement("div");
//         const timestamp = new Date(text.timestamp);
//         if (text.messagerId === seller) {
//           messageTimestamp.classList.add("time");
//         } else {
//           messageTimestamp.classList.add("other-time");
//         }
//         messageTimestamp.innerHTML = timestamp.toLocaleString();
//         messageContainer.appendChild(messageTimestamp);

//         messageArea.append(messageContainer);
//       });
//     });
//   });
// });

// // ------------------------------------ buyer replay to the chat ----------------------------//

// const sellerReplayBox = document.getElementById("sellerReplay");
// sellerReplayBox.addEventListener("click", function sellerReplay(event) {
//   event.preventDefault();

//   const seller = JSON.parse(localStorage.getItem("unique_id"));
//   const other = JSON.parse(sessionStorage.getItem("cardId"));
//   const product = new URLSearchParams(window.location.search).get("product_id");
//   const messageArray = JSON.parse(localStorage.getItem("messageArray"));
//   const textArray = JSON.parse(localStorage.getItem("textArray"));
//   const text = document.getElementById("text").value.trim();
//   const now = new Date();

//   if (text === "") {
//     return;
//   }

//   let findMessageId = textArray.find((id) => id.MessagerId === other && id.productId === product);
//   console.log(findMessageId.messageId);

//       let content = {
//       messagerId : seller,
//       messageId : findMessageId.messageId,
//       message : text,
//       productId : product,
//       timestamp : now.getTime(),
//       reciverId : other,
//     }

//     textArray.push(content);
//     localStorage.setItem("textArray", JSON.stringify(textArray));
//     window.location.reload();
// });

// // --------------------------------------------//

// const closeButton = document.querySelector("#close");
// closeButton.addEventListener("click", function close_button() {
//   const dialogueBox = document.querySelector(".messages");
//   dialogueBox.setAttribute("style", "display:none;");
// });

// // ----------------------------------------scroll down------------------------------------//

// let messageArea = document.querySelector(".chat-box");
// let messageContainer = document.querySelector(".message-container");
// document.addEventListener("DOMContentLoaded", function() {
//   messageArea.scrollTop = messageArea.scrollHeight;
// });
// function scrollToBottom() {
//   messageArea.scrollTop = messageArea.scrollHeight;
// }
// messageArea.append(messageContainer);
// scrollToBottom();