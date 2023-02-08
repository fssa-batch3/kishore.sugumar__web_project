

function product(){
    for (let card of product_list) {

    div_card = document.createElement("div");
    div_card.setAttribute("class", "card");
    console.log(div_card);

    button = document.createElement("button");
    button.setAttribute("class", "card-button");
    button.innerText = "More info";
    div_card.append(button);

    div_detail = document.createElement("div");
    div_detail.setAttribute("class", "card-details");
    div_card.append(div_detail);

    image = document.createElement("img");
    image.setAttribute("src", card["image"]["source"]);
    document.body.appendChild(image);
    image.setAttribute("alt", card["alt"]);
    image.setAttribute("class", "product_img");
    div_detail.append(image);

    h3 = document.createElement("h3");
    h3.setAttribute("class", "text-title");
    h3.innerHTML = card["name"];
    div_detail.append(h3);

    div_price = document.createElement("div");
    div_price.setAttribute("class", "text-body");
    div_detail.append(div_price);

    p_price = document.createElement("span");
    div_price.prepend(p_price);

    p_bold = document.createElement("b");
    p_bold.innerText = "Price:";
    p_price.append(p_bold);

    p_rate = document.createElement("span");
    p_rate.innerHTML = card["price"];
    div_price.append(p_rate);
    
    p_currency = document.createElement("span");
    p_currency.innerHTML = card["currency"];
    div_price.append(p_currency);

    document.querySelector("div.grid-container").append(div_card);

  }
       
}

function similar_product(){
    similar_card = document.createElement("div");
    similar_card.setAttribute("class", "more_product");
    console.log(similar_card);

    card_title = document.createElement("div");
    card_title.setAttribute("class", "head");
    similar_card.prepend(card_title);

    h2 = document.createElement("h2");
    h2.innerText = "Similar Products";
    card_title.prepend(h3);

    line = document.createElement("div");
    line.setAttribute("class", "line1");
    card_title.append(line);

    products_card = document.createElement("div");
    products_card.setAttribute("class", "more_prod");
    similar_card.append(products_card);

  for (let card of similar) {
    card_detail = document.createElement("div");
    card_detail.setAttribute("class", "similar");
    console.log(card_detail);

    similar_image = document.createElement("img");
    similar_image.setAttribute("src", card["image"]["source"]);
    document.body.appendChild(similar_image);
    similar_image.setAttribute("alt", card["image"]["alt"]);
    similar_image.setAttribute("class", "sub_img");
    card_detail.append(similar_image);

    h3 = document.createElement("h3");
    h3.setAttribute("class", "text-title");
    h3.innerHTML = card["name"];
    card_detail.append(h3);

    div_price = document.createElement("div");
    div_price.setAttribute("class", "text-body");
    card_detail.append(div_price);

    p_price = document.createElement("span");
    div_price.prepend(p_price);

    p_bold = document.createElement("b");
    p_bold.innerText = "Price:";
    p_price.append(p_bold);

    p_rate = document.createElement("span");
    p_rate.innerHTML = card["price"];
    div_price.append(p_rate);
    
    p_currency = document.createElement("span");
    p_currency.innerHTML = card["currency"];
    div_price.append(p_currency);

    document.querySelector("div.grid-container").append(div_card);
  }

}