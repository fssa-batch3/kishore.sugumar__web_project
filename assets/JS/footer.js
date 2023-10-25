const foot = `<section class="contact">
    <div class="contact_detail">
      <i class="fa fa-phone"></i>
      <p>Phone Number : +0123456789</p>
    </div>
    <div class="contact_detail">
      <i class="fa fa-envelope"></i>
      <p>Email Address : vanha.@abc.com</p>
    </div>
    <div class="contact_detail">
      <i class="fa fa-location"></i>
      <p>Location : Chennai:600069</p>
    </div>
  </section>
  <section class="line"></section>
  <section class="follow_links">
    <div>
      <p>Follow Us</p>
      <ul class="links">
        <li class="insta"><i class="fab fa-instagram"></i></li>
        <li class="face"><i class="fab fa-facebook-f"></i></li>
        <li class="twit"><i class="fab fa-twitter"></i></li>
        <li class="you"><i class="fab fa-youtube"></i></li>
      </ul>
    </div>
  </section>`;

/**
 * Function to update the content of the footer element on the page.
 */
function footer() {
  // Find the element with the id "footer" and store it in the variable "foote".
  const foote = document.getElementById("footer");
  
  // Set the HTML content of the "foote" element to the value of the "foot" variable (assuming "foot" is defined elsewhere in your code).
  foote.innerHTML = foot;
}

// Add an event listener to run the "footer" function when the DOM (Document Object Model) is fully loaded.
document.addEventListener("DOMContentLoaded", function openLoader() {
  // Call the "footer" function to update the footer content.
  footer();
});
