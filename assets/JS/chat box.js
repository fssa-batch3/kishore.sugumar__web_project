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
function send() {
        let mess = JSON.parse(localStorage.getItem("message")) || [];
        let productId = new URLSearchParams(window.location.search).get('product_id');
        let user = JSON.parse(localStorage.getItem("unique_id"));
        let text = document.getElementById("text").value.trim();
        const now = new Date();
    
        let prodIndex = mess.findIndex(p => p.productId === productId);
        if (prodIndex === -1) {
            let newProduct = {
                productId: productId,
                content: []
            }
            mess.push(newProduct);
            prodIndex = mess.length - 1;
        }
    
        let buyerIndex = mess[prodIndex].content.findIndex(buy => buy.user === user);
        if (buyerIndex === -1) {
            let content = {
                user: user,
                messages: []
            }
            mess[prodIndex].content.push(content);
            buyerIndex = mess[prodIndex].content.length - 1;
        }
    
        let newMessage = {
            messager: user,
            text: text,
            timestamp: now.getTime()
        }
        mess[prodIndex].content[buyerIndex].messages.push(newMessage);
    
        localStorage.setItem("message", JSON.stringify(mess));
        window.location.reload()
    }

// ---------------------------------buyer read chat---------------------------//
function readChat() {
    const index = JSON.parse(localStorage.getItem("message"));
    const product_id = new URLSearchParams(window.location.search).get('product_id');
    const user = JSON.parse(localStorage.getItem("unique_id"));
    const chatBox = document.querySelector(".chat-box");

    const userMessages = index.find(function (findUser) {
        return findUser.productId === product_id;
    });

    let mess;
    if (userMessages) {
        mess = userMessages.content.find(function (con) {
            return con.user === user;
        });

        if (mess && mess.messages.length > 0) {
            chatBox.innerHTML = "";

            mess.messages.forEach(function (cont) {
                const messageContainer = document.createElement("div");
                messageContainer.classList.add("message-container");

                const messageContent = document.createElement("span");
                if (cont.messager === user) {
                    messageContent.classList.add("sent");
                }
                else {
                    messageContent.classList.add("other-message");
                }
                messageContent.innerHTML = cont.text;
                messageContainer.appendChild(messageContent);

                const messageTimestamp = document.createElement("div");
                const timestamp = new Date(cont.timestamp);
                messageTimestamp.setAttribute("class", "time");
                messageTimestamp.innerHTML = timestamp.toLocaleString();
                messageContainer.appendChild(messageTimestamp);

                chatBox.append(messageContainer);
            });
        }
    }
};
// -----------------------------------seller read user who chat-------------------------------//
function messageAlert() {
    const unique = new URLSearchParams(window.location.search).get('product_id');
    let messageArray = JSON.parse(localStorage.getItem("message"));
    let buyerArray = JSON.parse(localStorage.getItem("user_data"));

    let productIndex = messageArray.find(m => m.productId === unique);

    if(!productIndex){
        let display = document.querySelector("section.message-box");
        display.setAttribute("style", "display:none");
    }
    else{

    productIndex.content.forEach(function (buyer) {

        let buyerDetail = buyerArray.find(messager => messager.email === buyer.user)

        let div_card = document.createElement("span");
        div_card.setAttribute("data-unique", buyerDetail.unique);
        div_card.setAttribute("class", "messager-list");

        let image = document.createElement("img");
        image.setAttribute("src", buyerDetail.image);
        image.setAttribute("alt", buyerDetail["name"] + " Image");
        image.classList.add("messager-img");
        div_card.append(image);

        let h2 = document.createElement("h2");
        h2.setAttribute("class", "messager-name");
        h2.textContent = buyerDetail["name"];
        div_card.append(h2);

        document.querySelector("div.messager").append(div_card);
    })
}
}
//-------------------------------------seller read chats--------------------------------------//
