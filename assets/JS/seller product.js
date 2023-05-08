// -------------------------read product(in edit form)-----------------//

document.addEventListener("DOMContentLoaded", function e_prod() {
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );

  const prod_data = JSON.parse(localStorage.getItem("product_data"));

  const product = prod_data.find((data) => {
    return data.unique === productId;
  });

  document.querySelector("#edit_name").value = product.name;
  document.querySelector("#edit_description").value = product.description;
  document.querySelector("#edit_price").value = product.price;
  document.querySelector("#edit_period").value = product.date;
});

// -------------------------edit product------------------------//

const edit_product = document.getElementById("editProduct");
edit_product.addEventListener("click", function edit_prod() {
  const prod_name = document.querySelector("#edit_name").value;
  const description = document.querySelector("#edit_description").value;
  const prod_price = document.querySelector("#edit_price").value;
  const used_period = document.querySelector("#edit_period").value;
  const duration = document.querySelector("#edit_duration").value;

  if (
    prod_name === "" ||
    description === "" ||
    prod_price === "" ||
    used_period === "" ||
    duration === ""
  ) {
    alert("Please fill in all required fields");
    return;
  }

  const stored_data = JSON.parse(localStorage.getItem("product_data"));
  const unique = new URLSearchParams(window.location.search).get("product_id");

  const prod_data = stored_data.find((product) => product.unique === unique);

  if (prod_data) {
    prod_data.name = prod_name;
    prod_data.description = description;
    prod_data.price = prod_price;
    prod_data.date = used_period;
    prod_data.duration = duration;
  }

  localStorage.setItem("product_data", JSON.stringify(stored_data));
  window.location.reload();
});

// ------------------------- read product(in seller page)-----------------//

document.addEventListener("DOMContentLoaded", function update_prod() {
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );

  const prod_data = JSON.parse(localStorage.getItem("product_data"));

  const product = prod_data.find((data) => {
    return data.unique === productId;
  });

  document.querySelector("#prod_name").innerHTML = product.name;
  document.querySelector("#description").innerHTML = product.description;
  document.querySelector("#prod_price").innerHTML = product.price;
  document.querySelector("#prod_date").innerHTML = product.date;
  document.querySelector("#duration").innerHTML = product.duration;
  for (let i = 0; i < 4; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", product.image[i]);
    img.setAttribute("alt", `${product.name} image`);
    img.setAttribute("id", `sub_img${i}`);
    img.setAttribute("class", `product_img`);
    img.setAttribute("onclick", "img(this)");
    document.querySelector(".images").appendChild(img);
  }
});

// -----------------------------------seller read other's chat-------------------------------//

document.addEventListener("DOMContentLoaded", function messageAlert() {
  const unique = new URLSearchParams(window.location.search).get("product_id");
  const messageArray = JSON.parse(localStorage.getItem("message"));
  const buyerArray = JSON.parse(localStorage.getItem("user_data"));

  if (!messageArray) {
    return;
  }

  const productIndex = messageArray.find((m) => m.productId === unique);

  if (!productIndex) {
    const display = document.querySelector("section.message-box");
    display.setAttribute("style", "display:none");
  } else {
    productIndex.content.forEach(function userMessage(buyer) {
      const buyerDetail = buyerArray.find(
        (messager) => messager.email === buyer.user
      );

      const div_card = document.createElement("span");
      div_card.setAttribute("data-unique", buyerDetail.email);
      div_card.setAttribute("class", "messager-list");

      const image = document.createElement("img");
      image.setAttribute("src", buyerDetail.image);
      image.setAttribute("alt", `${buyerDetail.name} Image`);
      image.classList.add("messager-img");
      div_card.append(image);

      const h2 = document.createElement("h2");
      h2.setAttribute("class", "messager-name");
      h2.textContent = buyerDetail.name;
      div_card.append(h2);

      document.querySelector("div.messager").append(div_card);
    });
  }
});

// ------------------------------------- seller read chats --------------------------------------//

document.addEventListener("DOMContentLoaded", function sellerRead() {
  const cards = document.querySelectorAll(".messager-list");
  cards.forEach(function eachCard(card) {
    card.addEventListener("click", function showMessage() {
      const unique = new URLSearchParams(window.location.search).get(
        "product_id"
      );
      const cardId = this.getAttribute("data-unique");
      const messageArray = JSON.parse(localStorage.getItem("message"));
      const seller = JSON.parse(localStorage.getItem("unique_id"));

      if (!messageArray) {
        return;
      }

      sessionStorage.setItem("messager", JSON.stringify(cardId));

      const parentMessage = document.querySelector(".messages");
      parentMessage.setAttribute("style", "");

      const messageArea = document.querySelector(".chat-box");

      messageArea.innerHTML = "";

      const message = messageArray.find(
        (findMessage) => findMessage.productId === unique
      );

      const messager = message.content.find((buyer) => buyer.user === cardId);

      messager.messages.forEach(function messageSeperator(text) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const messageContent = document.createElement("span");
        if (text.messager === seller) {
          messageContent.classList.add("sent");
        } else {
          messageContent.classList.add("other-message");
        }
        messageContent.innerHTML = text.text;
        messageContainer.appendChild(messageContent);

        const messageTimestamp = document.createElement("div");
        const timestamp = new Date(text.timestamp);
        if (text.messager === seller) {
          messageTimestamp.classList.add("time");
        } else {
          messageTimestamp.classList.add("other-time");
        }
        messageTimestamp.innerHTML = timestamp.toLocaleString();
        messageContainer.appendChild(messageTimestamp);

        messageArea.append(messageContainer);
      });
    });
  });
});

// ------------------------------------ buyer replay to the chat ----------------------------//

const sellerReplayBox = document.getElementById("sellerReplay");
sellerReplayBox.addEventListener("click", function sellerReplay(event) {
  event.preventDefault();

  const seller = JSON.parse(localStorage.getItem("unique_id"));
  const other = JSON.parse(sessionStorage.getItem("messager"));
  const product = new URLSearchParams(window.location.search).get("product_id");
  const messageArray = JSON.parse(localStorage.getItem("message"));
  const text = document.getElementById("text").value.trim();
  const now = new Date();

  const message = messageArray.find(
    (findMessage) => findMessage.productId === product
  );

  const messager = message.content.find((buyer) => buyer.user === other);

  if (text === "") {
    /* empty */
  } else {
    const replay = {
      messager: seller,
      text,
      timestamp: now.getTime(),
    };

    messager.messages.push(replay);
    localStorage.setItem("message", JSON.stringify(messageArray));
    window.location.reload();
  }
});
// --------------------------------------------//

const backPage = document.getElementById("back");
backPage.addEventListener("click", function back() {
  window.location.href = "buyer profile.html";
});

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", function close_button() {
  const dialogueBox = document.querySelector(".messages");
  dialogueBox.setAttribute("style", "display:none;");
});

const editFormOffBtn = document.getElementById("editform_off");
editFormOffBtn.addEventListener("click", function editform_off() {
  document.getElementById("prod_edit").style.display = "none";
});

const editFormOnBtn = document.getElementById("editform_on");
editFormOnBtn.addEventListener("click", function editform_on() {
  document.getElementById("prod_edit").style.display = "block";
});
