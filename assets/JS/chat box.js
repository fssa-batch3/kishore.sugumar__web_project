// ---------------------------- buyer create chat ------------------------------//
function send() {
    let messageArray = JSON.parse(localStorage.getItem("message")) || [];
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let user = JSON.parse(localStorage.getItem("unique_id"));
    let text = document.getElementById("text").value.trim();
    const now = new Date();

    let prodIndex = messageArray.findIndex(p => p.productId === productId);
    if (prodIndex === -1) {
        let newProduct = {
            productId: productId,
            content: []
        }
        messageArray.push(newProduct);
        prodIndex = messageArray.length - 1;
    }

    let buyerIndex = messageArray[prodIndex].content.findIndex(buy => buy.user === user);
    if (buyerIndex === -1) {
        let content = {
            user: user,
            messages: []
        }
        messageArray[prodIndex].content.push(content);
        buyerIndex = messageArray[prodIndex].content.length - 1;
    }

    let newMessage = {
        messager: user,
        text: text,
        timestamp: now.getTime()
    }
    messageArray[prodIndex].content[buyerIndex].messages.push(newMessage);

    localStorage.setItem("message", JSON.stringify(messageArray));
    window.location.reload()
}

// --------------------------------- buyer read their chat ---------------------------//
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
                if (cont.messager === user) {
                    messageTimestamp.classList.add("time-messager");
                }
                else {
                    messageTimestamp.classList.add("time-reciver");
                }
                const timestamp = new Date(cont.timestamp);
                messageTimestamp.innerHTML = timestamp.toLocaleString();
                messageContainer.appendChild(messageTimestamp);

                chatBox.append(messageContainer);
            });
        }
    }
};


// -----------------------------------seller read other's chat-------------------------------//
function messageAlert() {
    const unique = new URLSearchParams(window.location.search).get('product_id');
    let messageArray = JSON.parse(localStorage.getItem("message"));
    let buyerArray = JSON.parse(localStorage.getItem("user_data"));

    let productIndex = messageArray.find(m => m.productId === unique);

    if (!productIndex) {
        let display = document.querySelector("section.message-box");
        display.setAttribute("style", "display:none");
    }
    else {

        productIndex.content.forEach(function (buyer) {

            let buyerDetail = buyerArray.find(messager => messager.email === buyer.user)

            let div_card = document.createElement("span");
            div_card.setAttribute("data-unique", buyerDetail.email);
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
//------------------------------------- seller read chats --------------------------------------//

function sellerRead() {
    var cards = document.querySelectorAll('.messager-list');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            const unique = new URLSearchParams(window.location.search).get('product_id');
            var cardId = this.getAttribute('data-unique');
            let messageArray = JSON.parse(localStorage.getItem("message"));
            let seller = JSON.parse(localStorage.getItem("unique_id"));

            sessionStorage.setItem("messager", JSON.stringify(cardId))

            let parentMessage = document.querySelector(".messages")
            parentMessage.setAttribute("style", "")

            let messageArea = document.querySelector(".chat-box")

            messageArea.innerHTML = '';

            let message = messageArray.find(message => message.productId === unique);

            let messager = message.content.find(buyer => buyer.user === cardId);
            
            messager.messages.forEach(function (text) {

                let user = JSON.parse(localStorage.getItem("unique"));

                const messageContent = document.createElement("div");   
                if (text.messager === seller) {
                    messageContent.classList.add("sent");
                }
                else {
                    messageContent.classList.add("other-message");
                }
                messageContent.innerHTML = text.text;
                messageArea.append(messageContent);


            })

        });
    });
}

// ------------------------------------ buyer replay to the chat ----------------------------//

function sellerReplay() {
    let seller = JSON.parse(localStorage.getItem("unique_id"));
    let other = JSON.parse(sessionStorage.getItem("messager"));
    let product = new URLSearchParams(window.location.search).get('product_id');
    let messageArray = JSON.parse(localStorage.getItem("message"));
    let text = document.getElementById("text").value.trim();
    let now = new Date();

    let message = messageArray.find(message => message.productId === product);

    let messager = message.content.find(buyer => buyer.user === other);

    if (text === "") {
        return;
    }
    else {

        let replay = {
            messager: seller,
            text: text,
            timestamp: now.getTime()
        }

        messager.messages.push(replay);
        localStorage.setItem("message", JSON.stringify(messageArray));
        window.location.reload()

    }
}
