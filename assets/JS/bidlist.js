//-----------------------------create bid--------------------------//
function bid() {
    let price = document.getElementById("bid_amount").value;
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let buyer_id = JSON.parse(localStorage.getItem("unique_id"));

    let bid = JSON.parse(localStorage.getItem("bid")) || [];

    if (!buyer_id) {
        alert("There is no account 'Log in'")
        return;
    };    
    if (price === "") {
        alert('Quote any amount')
        return;
    };

    let bid_amount = {
        productId: productId,
        buyer_id: buyer_id,
        new_price: price
    };

    let idExist = false;

    for (let i = 0; i < bid.length; i++) {
        if (productId === bid[i].productId && bid[i].buyer_id === buyer_id && bid[i].new_price === price) {
            idExist = true;
            alert('This amount is already bided. "Bid More"');
            return;
        }
    }
    bid.unshift(bid_amount);
    localStorage.setItem("bid", JSON.stringify(bid));
    bidnote();

    setTimeout(function() {
      location.reload();
    }, 3000);
  }

function bidnote() {
    var vara = document.getElementById("snackbar");
  
    vara.className = "show";
  
    setTimeout(function(){ vara.className = vara.className.replace("show", ""); }, 4000);
}

// -----------------------------read bid (seller)--------------------------//
function sell_prod() {
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let prod = JSON.parse(localStorage.getItem("product_data"));

    let index = prod.findIndex(item => item.unique === productId);
    let product = prod[index]

    document.querySelector("#product_name").innerHTML = product.name;
    document.querySelector("#prod_price").innerHTML = product.price;
    let img = document.querySelector("#product_img");
    img.setAttribute("src", product.image);
    img.setAttribute("alt", product.name + "image");

}

function buyer_list(){
    let bid_array = JSON.parse(localStorage.getItem("bid"));
    let productId = new URLSearchParams(window.location.search).get('product_id');
    let prod = JSON.parse(localStorage.getItem("product_data"));
    let user = JSON.parse(localStorage.getItem("user_data"));

    const container = document.getElementById("bid-list");

    for (let i = 0; i < bid_array.length; i++) {
        let index = user.findIndex(item => item.email === bid_array[i].buyer_id);
        let buyer = user[index];
        if (productId === bid_array[i].productId && bid_array[i].buyer_id === buyer.email) {
            const div = document.createElement("div");
            div.classList.add("content");

            const img = document.createElement("img");
            img.src = "../assets/img/buyer.png";
            img.alt = "buyer_img";
            img.classList.add("buyer_img");
            div.appendChild(img);

            const name = document.createElement("h4");
            name.classList.add("buyer_name");
            name.textContent = buyer.name;
            div.appendChild(name);

            const rate = document.createElement("div");
            rate.classList.add("title");
            rate.textContent = "Price : ";
            div.appendChild(rate);

            const rateDiv = document.createElement("div");
            rateDiv.classList.add("price");
            rateDiv.textContent = bid_array[i].new_price;
            div.appendChild(rateDiv);

            let anch = document.createElement("a");
            anch.setAttribute("href", "./after accept offer.html?buyer_id=" + bid_array[i].buyer_id + "&product_id=" + productId);
            div.append(anch);

            const sellButton = document.createElement("button");
            sellButton.classList.add("button2", "algn");
            sellButton.textContent = "sell";
            anch.appendChild(sellButton);

            container.appendChild(div);
        }
    }
}
// -----------------------------read bid (buyer)--------------------------//
function bid_prod(product) {
    let user_id = JSON.parse(localStorage.getItem("unique_id"));
    let prod = JSON.parse(localStorage.getItem("product_data"));
    let bid = JSON.parse(localStorage.getItem("bid")) || [];
  
    let displayedProducts = [];
  
    for (let i = 0; i < bid.length; i++) {
        if(bid[i].buyer_id === user_id){
            const productObj = prod.find(p => p.unique === bid[i].productId);
            if (productObj && !displayedProducts.includes(productObj.unique)) {
                displayedProducts.push(productObj.unique);

                let div_card = document.createElement("div");
                div_card.setAttribute("data-unique", productObj.unique);
                div_card.classList.add("content");

                let image = document.createElement("img");
                image.setAttribute("src", productObj.image);
                image.setAttribute("alt", productObj.name + "Image");
                image.classList.add("product-img");
                div_card.prepend(image);

                let h3 = document.createElement("h3");
                h3.setAttribute("class", "prod_name");
                h3.setAttribute("id", "prod_name");
                h3.textContent = productObj.name;
                div_card.append(h3);

                let maxBidPrice = 0;
                bid.forEach((bidItem2) => {
                  if (bidItem2.productId === productObj.unique) {
                    maxBidPrice = Math.max(maxBidPrice, Number(bidItem2.new_price));
                  }
                });

                let h4 = document.createElement("h4");
                h4.setAttribute("class", "prod_name");
                h4.setAttribute("id", "prod_name");
                h4.textContent = "Maximum bid price: "+ maxBidPrice + " (INR)";
                div_card.append(h4);

                let yourBidPrice = 0;
                bid.forEach((bidItem2) => {
                  if (bidItem2.buyer_id === user_id && bidItem2.productId === productObj.unique) {
                    yourBidPrice = Math.max(yourBidPrice, Number(bidItem2.new_price));
                  }
                });

                h4 = document.createElement("h4");
                h4.setAttribute("class", "prod_name");
                h4.setAttribute("id", "prod_name");
                h4.textContent = "Your bid price: "+ yourBidPrice+ " (INR)";
                div_card.append(h4);

                let anch = document.createElement("a");
                anch.setAttribute("href", "./product page.html?product_id=" + productObj.unique);
                div_card.append(anch);

                let button2 = document.createElement("button");
                button2.classList.add("button2", "algn");
                button2.textContent = "Bid more";
                button2.setAttribute("id", "Bid more");
                anch.append(button2);

                document.querySelector("div.box").append(div_card);
            }
        }
    }
}