//--------------header-------------//

// Get the current origin of the website
const myOrigin = window.location.origin;

// Set the source for the logo image using the current origin
const logoSrc = `${myOrigin}/assets/img/illustration/logo.png`;

// Define URLs for different pages
const profilepage = `${myOrigin}/pages/buyer profile.html`;
const home = `${myOrigin}/index.html`;

// Define the HTML content for the header when the user is not logged in
const beforeloginNew = `
  <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
  <h2 class="web-name">V A N H A</h2>
  <div class="account-btn">
    <a href="${home}"><button class="button1" onclick="moveIn()">sign in</button></a>
    <a href="${home}"><button class="button2" onclick="moveUp()">sign up</button></a>
  </div>
`;

// Define the HTML content for the header when the user is logged in
const AfterLoginNew = `
  <a href="${home}"><img src="${logoSrc}" alt="logo" class="logo"></a>
  <h2 class="web-name">V A N H A</h2>
  <a href="${profilepage}"><img class="profile-img"></a>
`;

// Function to update the header based on the user's login status
function allheader() {
  // Retrieve user information from the session storage
  const user = JSON.parse(sessionStorage.getItem("email"));
  const image = sessionStorage.getItem("image");

  // Get the header element where the content will be displayed
  const nextheader = document.getElementById("header");

  // Check if the user is not logged in
  if (!user) {
    nextheader.innerHTML = beforeloginNew;
  } else {
    // If the user is logged in, display the logged-in header
    nextheader.innerHTML = AfterLoginNew;

    // Check if the user has a profile image
    if (image === "null" || image === null) {
      // If the user does not have a profile image, display a default image
      const photo = document.querySelector(".profile-img");
      photo.setAttribute("src", "https://iili.io/JH5FmAJ.jpg");
      photo.setAttribute("alt", "your Image");
    } else {
      // If the user has a profile image, display it
      const photo = document.querySelector(".profile-img");
      photo.setAttribute("src", image);
      photo.setAttribute("alt", "your Image");
    }
  }
}

// Add an event listener to update the header when the DOM is loaded
document.addEventListener("DOMContentLoaded", function openLoader() {
  allheader();
});

// Documentation for the JavaScript code
/**
 * This JavaScript code handles the dynamic generation of a website header based on the user's login status.
 *
 * - It determines the current origin of the website and constructs the source URL for the logo.
 * - It defines URLs for different pages, such as the profile page and the home page.
 * - It specifies the HTML content for the header when the user is not logged in (beforeloginNew) and when the user is logged in (AfterLoginNew).
 * - The `allheader` function is responsible for updating the header based on the user's login status. It retrieves user information from session storage and displays the appropriate header content.
 * - If the user is logged in, it also handles the display of a profile image, either by using a default image or the user's provided image.
 * - An event listener is added to the document that triggers the `allheader` function when the DOM is fully loaded.
 */
