// ------------------------create wishlist---------------------------//
function wish() {
    let wishpro = JSON.parse(localStorage.getItem("wishlist")) || [];
    let user_id = JSON.parse(localStorage.getItem("unique_id"));

    let prod = {
        product: new URLSearchParams(window.location.search).get('product_id'),
        user_id: JSON.parse(localStorage.getItem("unique_id")),
    };

    for (let i = 0; i < wishpro.length; i++) {
        if(!user_id){
            alert("There is no account 'Log in'");
            return;
        }
        if (productId === wishpro[i].product && wishpro[i].user_id === user_id) {
            alert('Already liked !');
            return;
        }
    }
    wishnote()
    wishpro.unshift(prod);
    localStorage.setItem("wishlist", JSON.stringify(wishpro));
    return;
}
function wishnote() {
    var vara = document.getElementById("snackbar1");
  
    vara.className = "show";
  
    setTimeout(function(){ vara.className = vara.className.replace("show", ""); }, 3000);
}
// ------------------------read whishlist---------------------------//
function wish_prod(product) {
    let prod_wish = JSON.parse(localStorage.getItem("wishlist"));
    let prod = JSON.parse(localStorage.getItem("product_data"));
    let user_id = JSON.parse(localStorage.getItem("unique_id"));

    for (let i = 0; i < prod_wish.length; i++) {
        if (prod_wish[i].user_id === user_id) {
            const productObj = prod.find(p => p.unique === prod_wish[i].product);
            if (productObj) {
                div_card = document.createElement("div");
                div_card.setAttribute("data-unique", productObj.unique);
                div_card.classList.add("content");

                let anch = document.createElement("a");
                anch.setAttribute("href", "./product page.html?product_id=" + productObj.unique);
                div_card.append(anch);

                image = document.createElement("img");
                image.setAttribute("src", productObj.image);
                image.setAttribute("alt",productObj["name"]+ " Image");
                image.classList.add("product-img");
                anch.prepend(image);

                h3 = document.createElement("h3");
                h3.setAttribute("class", "prod_name");
                h3.setAttribute("id", "prod_name");
                h3.textContent = productObj["name"];
                div_card.append(h3);

                button2 = document.createElement("button");
                button2.classList.add("button3", "algn");
                button2.textContent = "Remove";
                button2.setAttribute("id", "remove");
                button2.onclick = function (event) {
                    remove(event, productObj.unique)
                }
                div_card.append(button2);

                document.querySelector("div.box").append(div_card);
            }
        }
    };
}
// -------------------------delete whishlist-----------------------//
function remove(e, uniqueid) {
    e.preventDefault();

    let wish = JSON.parse(localStorage.getItem("wishlist"));
    let user_id = JSON.parse(localStorage.getItem("unique_id"));

    const index = wish.findIndex(item => item.product === uniqueid && item.user_id === user_id);

    if (index !== -1) {
        if (confirm("Are you sure you want to remove your product")) {
            wish.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wish));
            window.location.reload();
        } else {
            return;
        }
    }
}