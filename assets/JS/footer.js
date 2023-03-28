function footer() {
    // Select the footer element
    const footer = document.querySelector("footer.footer");

    // Create the contact section element
    const contactSection = document.createElement('section');
    contactSection.classList.add('contact');

    // Create the phone number element
    const phoneDetail = document.createElement('div');
    phoneDetail.classList.add('contact_detail');
    const phoneIcon = document.createElement('i');
    phoneIcon.classList.add('fa', 'fa-phone');
    const phoneNumber = document.createElement('p');
    phoneNumber.textContent = 'Phone Number : +0123456789';
    phoneDetail.appendChild(phoneIcon);
    phoneDetail.appendChild(phoneNumber);

    // Create the email address element
    const emailDetail = document.createElement('div');
    emailDetail.classList.add('contact_detail');
    const emailIcon = document.createElement('i');
    emailIcon.classList.add('fa', 'fa-envelope');
    const emailAddress = document.createElement('p');
    emailAddress.textContent = 'Email Address : vanha.@abc.com';
    emailDetail.appendChild(emailIcon);
    emailDetail.appendChild(emailAddress);

    // Create the location element
    const locationDetail = document.createElement('div');
    locationDetail.classList.add('contact_detail');
    const locationIcon = document.createElement('i');
    locationIcon.classList.add('fa', 'fa-location');
    const locationAddress = document.createElement('p');
    locationAddress.textContent = 'Location : Chennai:600069';
    locationDetail.appendChild(locationIcon);
    locationDetail.appendChild(locationAddress);

    // Add all the contact elements to the contact section
    contactSection.appendChild(phoneDetail);
    contactSection.appendChild(emailDetail);
    contactSection.appendChild(locationDetail);

    // Create the line section element
    const lineSection = document.createElement('section');
    lineSection.classList.add('line');

    // Create the follow links section element
    const followSection = document.createElement('section');
    followSection.classList.add('follow_links');
    const followDiv = document.createElement('div');
    const followText = document.createElement('p');
    followText.textContent = 'Follow Us';
    followDiv.appendChild(followText);

    const linksUl = document.createElement('ul');
    linksUl.classList.add('links');
    const instaLi = document.createElement('li');
    instaLi.classList.add('insta');
    const instaIcon = document.createElement('i');
    instaIcon.classList.add('fa-brands', 'fa-instagram');
    instaLi.appendChild(instaIcon);

    const faceLi = document.createElement('li');
    faceLi.classList.add('face');
    const faceIcon = document.createElement('i');
    faceIcon.classList.add('fa-brands', 'fa-facebook-f');
    faceLi.appendChild(faceIcon);

    const twitLi = document.createElement('li');
    twitLi.classList.add('twit');
    const twitIcon = document.createElement('i');
    twitIcon.classList.add('fa-brands', 'fa-twitter');
    twitLi.appendChild(twitIcon);

    const youLi = document.createElement('li');
    youLi.classList.add('you');
    const youIcon = document.createElement('i');
    youIcon.classList.add('fa-brands', 'fa-youtube');
    youLi.appendChild(youIcon);
    
    linksUl.appendChild(instaLi);
    linksUl.appendChild(faceLi);
    linksUl.appendChild(twitLi);
    linksUl.appendChild(youLi);
    followDiv.appendChild(linksUl);
    followSection.appendChild(followDiv);

    // Add all the sections to the footer element
    footer.appendChild(contactSection);
    footer.appendChild(lineSection);
    footer.appendChild(followSection);
}

{/* <footer class="footer" id ="footer">
  <section class="contact">
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
  </section>
</footer> */}