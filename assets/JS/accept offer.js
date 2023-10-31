
//---------------------------time formatter------------------------//
/**
 * Converts a month number (e.g., "01") to its abbreviation (e.g., "Jan").
 *
 * @param {string} monthNumber - The month number in the format "MM".
 * @returns {string} The abbreviated month name.
 */
function getMonthAbbreviation(monthNumber) {
  switch (monthNumber) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
    default:
      return "Invalid Month";
  }
}

/**
 * Determines whether a given hour is in the AM or PM time period.
 *
 * @param {number} hour - The hour to check (24-hour format).
 * @returns {string} "AM" if it's in the morning, "PM" if it's in the afternoon or evening.
 */
function getAmOrPm(hour) {
  var time = Number(hour);
  if (time >= 0 && time < 12) {
    return "AM";
  } else {
    return "PM";
  }
}

/**
 * Formats a date and time string to a more readable format.
 *
 * @param {string} dateTimeString - The date and time string to format.
 * @returns {string} The formatted date and time string.
 */
function formatDateTime(dateTimeString) {
  var date = dateTimeString;
  var year = date.substring(0, 4);
  let num = date.substring(5, 7);
  var month = getMonthAbbreviation(num);
  var day = date.substring(8, 10);
  var time = date.substring(11, 16);
  var std = getAmOrPm(date.substring(11, 13));
  return day + " " + month + " " + year + " " + time + " " + std;
}
//----------------------------error message-----------------------//

/**
 * Displays an error message in a designated area and hides it after a delay.
 *
 * @param {string} errorMessage - The error message to display.
 */
function errorBox(errorMessage) {
  var snackArea = document.getElementById("error");
  snackArea.className = "show";
  var message = document.getElementsByClassName("messSpan")[0];
  message.textContent = errorMessage;
  setTimeout(function () {
    snackArea.className = snackArea.className.replace("show", "");
  }, 3000);
}

//-----------------------------------------------------------------//

const productId = new URLSearchParams(window.location.search).get("product_id");

console.log(productId);

const viewBids = `${serverPath}/home/profile/allbids?productId=${productId}`;

console.log(serverPath);

fetch(viewBids, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.statusCode === 200) {
      const object = data.data;
      const Image = document.getElementById("product_img");
      if (object.productImage == null) {
        Image.setAttribute("src", "https://iili.io/JJTtQaa.jpg");
      } else {
        Image.setAttribute("src", object.productImage);
      }
      Image.setAttribute("alt", `${object.productName} image`);
      document.getElementById("product_name").innerHTML = object.productName;
      document.getElementById("prod_price").innerHTML = object.productPrice;

      const container = document.getElementById("bid-list");

      if (object.bids.length === 0) {
        const div = document.createElement("div");

        const name = document.createElement("h3");
        name.innerText = "There is no Offers";
        div.appendChild(name);

        const image = document.createElement("img");
        image.setAttribute("src", "../assets/img/illustration/no result.png");
        image.setAttribute("alt", "no result found");
        image.setAttribute("class", "illuimg");
        div.appendChild(image);

        container.appendChild(div);
        return;
      } else {
        let allBids = object.bids;
        const table = document.createElement("table");
        table.classList.add("content");

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");

        const headerLabels = ["No", "Buyer", "", "Price", "Date", ""];
        headerLabels.forEach(labelText => {
          const th = document.createElement("th");
          th.textContent = labelText;
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        allBids.reverse().forEach(function everyProduct(elements) {
          const row = tbody.insertRow();
          row.setAttribute("id", elements.listNo);

          const noCell = row.insertCell(0);
          noCell.classList.add("buyer_name");
          noCell.textContent = elements.listNo;

          const imgCell = row.insertCell(1);
          const img = document.createElement("img");
          img.src = elements.buyerImage;
          img.alt = `${elements.buyerName} image`;
          img.classList.add("buyer_img");
          imgCell.appendChild(img);

          const nameCell = row.insertCell(2);
          nameCell.classList.add("buyer_name");
          nameCell.textContent = elements.buyerName;

          const rateCell = row.insertCell(3);
          rateCell.classList.add("amount");
          rateCell.textContent = elements.amount;

          const dateCell = row.insertCell(4);
          dateCell.classList.add("date");
          dateCell.textContent = formatDateTime(elements.date);

          const anchCell = row.insertCell(5);
          const anch = document.createElement("a");
          anch.setAttribute(
            "href",
            `./after accept offer.html?id=${elements.id}`
          );
          anchCell.appendChild(anch);

          const sellButton = document.createElement("button");
          sellButton.classList.add("button2", "algn");
          sellButton.textContent = "sell";
          anch.appendChild(sellButton);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        //-----------------top 3 bids-----------------//
        const top3MaxAmounts = [];

        allBids.sort((a, b) => b.amount - a.amount);

        for (let i = 0; i < Math.min(3, allBids.length); i++) {
          top3MaxAmounts.push(allBids[i].listNo);
        }

        var i = 1;
        top3MaxAmounts.forEach(function (place) {
          let high = document.getElementById(place);
          high.classList.add(`high${i}`);
          i = i + 1;
        })

      }
    } else if (data.statusCode === 500) {
      window.location.href = "../error/500error.html";
    } else {
      let errorMessage = '';
      if (data.statusCode === 400) {
        errorMessage = data.message;
        errorBox(errorMessage);
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

//------------------------back button----------------------//

/**
 * Handles the "back" button click by navigating to the previous page in the browser's history.
 */
const back = document.getElementById("back");
back.addEventListener("click", function nextPage() {
  history.back()
});
