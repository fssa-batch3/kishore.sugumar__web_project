function sellerDetail() {
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let prod = JSON.parse(localStorage.getItem("product_data"));
    let seller = JSON.parse(localStorage.getItem("user_data"));

    let index = prod.findIndex(item => item.unique === productId);
    let product = prod[index]

    let sell = seller.find(function (id) {
        return product.user_id === id.email;
    });

    let img = document.getElementById("seller_img");
    img.setAttribute("src", sell.image);
    img.setAttribute("alt", sell.name + " image");

    document.getElementById("seller_name").innerText = sell.name;

}
// ----------------------------create chat ------------------------------//
function send(){
    let mess = JSON.parse(localStorage.getItem("message")) || [];
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let user = JSON.parse(localStorage.getItem("unique_id"));
    let text = document.getElementById("text").value;

    
  const now = new Date();

    if(text == ""){
        confirm("This is an alert message without an OK button. Click Cancel to close this dialog box.");
        return;
    }
    let content = {
        "user_id":user,
        "productId":productId,
        "message": text,
        "timestamp": now
    }

    mess.push(content);
    localStorage.setItem("message",JSON.stringify(mess));
    window.location.reload();
}
// ---------------------------------read chat---------------------------//
function readChat() {
    const messages = JSON.parse(localStorage.getItem("message"));
    const productId = new URLSearchParams(window.location.search).get('product_id');
    const user = JSON.parse(localStorage.getItem("unique_id"));
    const chatBox = document.querySelector(".chat-box");

    const userMessages = messages.filter(function(message) {
        return message.productId === productId && message.user_id === user;
    });

    userMessages.forEach(function(message) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const messageContent = document.createElement("span");
        messageContent.setAttribute("class", "sent")
        messageContent.innerHTML = message.message;
        messageContainer.appendChild(messageContent);

        const messageTimestamp = document.createElement("div");
        const timestamp = new Date(message.timestamp);
        messageTimestamp.setAttribute("class", "time")
        messageTimestamp.innerHTML = timestamp.toLocaleString();
        messageContainer.appendChild(messageTimestamp);

        if (message.user_id === user) {
            messageContainer.classList.add("user-message");
        } else {
            messageContainer.classList.add("other-message");
        }

        chatBox.appendChild(messageContainer);

        chatBox.scrollTop = chatBox.scrollHeight;
    });
}