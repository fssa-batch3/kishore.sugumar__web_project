document.addEventListener("DOMContentLoaded", function sell_prod() {
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const prod = JSON.parse(localStorage.getItem("product_data"));
  const imageArray = JSON.parse(localStorage.getItem("images"));

  const index = prod.findIndex((item) => item.unique === productId);
  const product = prod[index];
  const image = imageArray.find((item) => item.unique === product.unique);


  document.querySelector("#product_name").innerHTML = product.name;
  document.querySelector("#prod_price").innerHTML = product.price;
  const img = document.querySelector("#product_img");
  img.setAttribute("src", image.image1);
  img.setAttribute("alt", `${product.name}image`);
});
// --------------------------------- buyer read their chat ---------------------------//

document.addEventListener("DOMContentLoaded", function readChat() {
  const messageArray = JSON.parse(localStorage.getItem("messageArray"));
  const textArray = JSON.parse(localStorage.getItem("textArray"));
  const user = JSON.parse(localStorage.getItem("unique_id"));
  const product_id = new URLSearchParams(window.location.search).get(
        "product_id"
      );
      const chatBox = document.querySelector(".chat-box");

      const userMessages = messageArray.find((i) => i.productId === product_id && i.buyerId === user);
      if(!userMessages){
      console.log("messages not found");
      }
      if(userMessages){
      const messages = textArray.filter((t) => t.messageId === userMessages.messageId);

      messages.forEach(function (element) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const messageContent = document.createElement("span");
        if (element.MessagerId === user) {
          messageContent.classList.add("sent");
        } else {
          messageContent.classList.add("other-message");
        }
        messageContent.innerHTML = element.message;
        messageContainer.appendChild(messageContent);

        const messageTimestamp = document.createElement("div");
        const timestamp = new Date(element.timestamp);
        if (element.reciverId === user) {
          messageTimestamp.classList.add("other-time");
        } else {
          messageTimestamp.classList.add("time");
        }
        messageTimestamp.innerHTML = timestamp.toLocaleString();
        messageContainer.appendChild(messageTimestamp);

        chatBox.append(messageContainer);
      });
      }
})

// ---------------------------- buyer create chat ------------------------------//
const sendButton = document.getElementById("send");
sendButton.addEventListener("click", function send() {
  const messageArray = JSON.parse(localStorage.getItem("messageArray")) || [];
  const textArray = JSON.parse(localStorage.getItem("textArray")) || [];
  const productId = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const user = JSON.parse(localStorage.getItem("unique_id"));
  const text = document.getElementById("text").value.trim();
  const now = new Date();

  if (text === "") {
    return;
  }

  let id = messageArray.length + 1;

  let prodIndex = messageArray.find((p) => p.productId === productId && p.buyerId === user);
  if(!prodIndex){
    let buyer = {
      buyerId : user,
      messageId : id,
      productId : productId,
    }
    let content = {
      MessagerId : user,
      messageId : id,
      message : text,
      productId : productId,
      timestamp : now.getTime(),
    }
    textArray.push(content);
    messageArray.push(buyer);
  }

  if(prodIndex){
  let messageIndex = textArray.find((t) => t.messageId === prodIndex.messageId);
  if(messageIndex){
    let content = {
      MessagerId : user,
      messageId : messageIndex.messageId,
      message : text,
      productId : productId,
      timestamp : now.getTime(),
    }
    textArray.push(content);
  }
}
localStorage.setItem("messageArray",JSON.stringify(messageArray));
localStorage.setItem("textArray", JSON.stringify(textArray));
  window.location.reload();
});
// ----------------------------------------scroll down------------------------------------//

let messageArea = document.querySelector(".chat-box");
document.addEventListener("DOMContentLoaded", function() {
  messageArea.scrollTop = messageArea.scrollHeight;
});
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
messageArea.append(messageContainer);
scrollToBottom();
