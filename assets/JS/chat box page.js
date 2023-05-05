document.addEventListener("DOMContentLoaded", function sell_prod() {
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const prod = JSON.parse(localStorage.getItem("product_data"));

  const index = prod.findIndex((item) => item.unique === productId);
  const product = prod[index];

  document.querySelector("#product_name").innerHTML = product.name;
  document.querySelector("#prod_price").innerHTML = product.price;
  const img = document.querySelector("#product_img");
  img.setAttribute("src", product.image);
  img.setAttribute("alt", `${product.name}image`);
});
// --------------------------------- buyer read their chat ---------------------------//

document.addEventListener("DOMContentLoaded", function readChat() {
  const index = JSON.parse(localStorage.getItem("message"));
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const user = JSON.parse(localStorage.getItem("unique_id"));
  const chatBox = document.querySelector(".chat-box");

  const userMessages = index.find(function findProduct(findUser) {
    return findUser.productId === product_id;
  });

  let mess;
  if (userMessages) {
    mess = userMessages.content.find(function findMessager(con) {
      return con.user === user;
    });

    if (mess && mess.messages.length > 0) {
      chatBox.innerHTML = "";

      mess.messages.forEach(function showAllMessages(cont) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const messageContent = document.createElement("span");
        if (cont.messager === user) {
          messageContent.classList.add("sent");
        } else {
          messageContent.classList.add("other-message");
        }
        messageContent.innerHTML = cont.text;
        messageContainer.appendChild(messageContent);

        const messageTimestamp = document.createElement("div");
        const timestamp = new Date(cont.timestamp);
        if (cont.messager === user) {
          messageTimestamp.classList.add("time");
        } else {
          messageTimestamp.classList.add("other-time");
        }
        messageTimestamp.innerHTML = timestamp.toLocaleString();
        messageContainer.appendChild(messageTimestamp);

        chatBox.append(messageContainer);
      });
    }
  }
});

const nextPageButton = document.getElementById("redirect");
nextPageButton.addEventListener("click", function redirect() {
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const myOrigin = window.location.origin;
  window.location.href = `${myOrigin}/pages/product page.html?product_id=${productId}`;
});

// ---------------------------- buyer create chat ------------------------------//

const sendButton = document.getElementById("send");
sendButton.addEventListener("click", function send() {
  const messageArray = JSON.parse(localStorage.getItem("message")) || [];
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const user = JSON.parse(localStorage.getItem("unique_id"));
  const text = document.getElementById("text").value.trim();
  const now = new Date();

  if (text === "") {
    return;
  }

  let prodIndex = messageArray.findIndex((p) => p.productId === productId);
  if (prodIndex === -1) {
    const newProduct = {
      productId,
      content: [],
    };
    messageArray.push(newProduct);
    prodIndex = messageArray.length - 1;
  }

  let buyerIndex = messageArray[prodIndex].content.findIndex(
    (buy) => buy.user === user
  );
  if (buyerIndex === -1) {
    const content = {
      user,
      messages: [],
    };
    messageArray[prodIndex].content.push(content);
    buyerIndex = messageArray[prodIndex].content.length - 1;
  }

  const newMessage = {
    messager: user,
    text,
    timestamp: now.getTime(),
  };
  messageArray[prodIndex].content[buyerIndex].messages.push(newMessage);

  localStorage.setItem("message", JSON.stringify(messageArray));
  window.location.reload();
});
