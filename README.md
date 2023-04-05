## VANHA-ecommerce website
![](https://github.com/fssa-batch3/kishore.sugumar__web_project/blob/main/assets/img/illustration/logo.png)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fssa-batch3_kishore.sugumar__web_project&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fssa-batch3_kishore.sugumar__web_project)

### Document & wire frame :
- `<link>` : https://docs.google.com/document/d/159vbgIjriLOx0YMpjlWFh1awEE7QsKz7/edit

### problem statement :
- `<link>` : https://docs.google.com/document/d/14eaHVqiUYA-2HHHnvrMSDnFt3aTQt_0ydZRrqLfvcX8/edit

### user flow : 
- `<link>` : https://drive.google.com/drive/folders/12dfKZeC8N-IIPNB0H9HVRO43dRF8pfBY

### Features :
* Bargain option (completed)
* Contact option (completed)
* Notification (Yet to start)


### User CRUD :
* Login (completed)
    * Scenario 1: Successfully create an account
      * Steps:
        1. Navigate to the registration page.
        2. Enter the required information such as name, email, and password.
        3. Click the "Register" button.
    * Expected Result:
        * The user is redirected to the home page.
        * For checking click the profile image in home page it will take your profile.
* Register (completed)
    * Scenario 1: Successfully login in to account
      * Steps:
        1. Navigate to the login page.
        2. Enter the required information such as email, and password.
        3. Click the "Sign in" button.
    * Expected Result:
        * The user is redirected to the home page.
        * For checking click the profile image in home page it will take your profile.
* Read (completed)
    * Scenario 1: Successfully view a profile.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. View the detail of your's in profile.
    * Expected Result:
        * The user can view their profile.
* Upadte (completed)
    * Scenario 1: Successfully update a profile.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Click "Edit" button
        4. And your profile.
    * Expected Result:
        * The user can view their updated in the same page profile.
    * Hint:
        * User cannot uplode the image 
* Log out (completed)
    * Scenario 1: Successfully logout from the website.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Click "Log out" button
    * Expected Result:
        * The user is redirected to the home page.
* Delete (completed)
    * Scenario 1: Successfully logout from the website.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Click "Delete" button
    * Expected Result:
        * The user is redirected to the home page.

### Product CRUD (seller):
* Add product (completed)
    * Scenario 1: Successfully add product.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Click "Add product" button.
        4. Choose the category.
        5. Enter the required information in the form.
        3. Click the "Add product" button.
    * Expected Result:
        * The user is redirected to the profile page.
        * The product is added to his profile page at bottom.
    * Hint:
        * User cannot uplode the image
* Read product (completed)
    * Scenario 1: Successfully view product.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Scroll down.
    * Expected Result:
        * The user should see their products below the profile page.
* Upadte product (completed)
    * Scenario 1: Successfully edit product.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Scroll down.
        4. In your product card click "Edit" button.
        5. Change the value what you need.
        6. Finally click "Save".
    * Expected Result:
        * The user is redirected to the profile page.
* Delete product (completed)
    * Scenario 1: Successfully remove product.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Scroll down.
        4. In your product card click "Remove" button.
    * Expected Result:
        * The product removed form the profile page.

### Product CRUD (buyer):
* View products/items (completed)
    * Scenario 1: Successfully view products/items.
      * Steps:
        1. Log in as a user.
        2. Navigate to the product listing page.
        3. View the list of available products/items.
    * Expected Result:
        * The user can view the list of available products/items.
* View product/item details (completed)
    * Scenario 1: Successfully view product/item details
      * Steps:
        1. Log in as a user.
        2. Navigate to the product listing page.
        3. Select a product/item to view its details.
    * Expected Result:
       * The user can view the details of the selected product/item.

### Wish List:
* Add product (completed)
    * Scenario 1: Successfully add product/item to wishlist
      * Steps:
        1. Log in as a user.
        2. Navigate to the product listing page.
        3. Select a product/item to wish list.
        4. Click the "Wish list" button.
    * Expected Result:
        * The product/item is added to the user's wish list page.
* Read product (completed)
    * Scenario 1: Successfully see the product/item in the wishlist page.
      * Steps:
        1. Log in as a user.
        2. Navigate to the wish list page.
        3. View the list of available items that user added.
    * Expected Result:
        * The user can view the list of products/items that user wished. 
* Delete product (completed)
    * Scenario 1: Successfully logout from the website.
      * Steps:
        1. Log in as a user.
        2. Navigate to the wish list page.
        4. In the product card click "Remove" button.
    * Expected Result:
        * The product removed form the wish list page.

### Showing Contact:
* Read Contact
    * Scenario 1: Successfully view product/item details
      * Steps:
        1. Log in as a user.
        2. Navigate to the product listing page.
        3. Select a product/item to view its details.
        4. Click the seller profile in the page below the detail of product.  
    * Expected Result:
        * The buyer can the image, name, phone number and location of the seller.

### Bidded List (buyer):
* Bid product
* Add product (completed)
    * Scenario 1: Successfully add product/item to wishlist
      * Steps:
        1. Log in as a user.
        2. Navigate to the product listing page.
        3. Bid any amount in the input.
        4. Click the "Bid" button.
    * Expected Result:
        * The product/item is Shown in the user's Bid list page.
* Read product
    * Scenario 1: Successfully see the product/item in the bid page.
      * Steps:
        1. Log in as a user.
        2. Navigate to the bid list page.
        3. View the list of available items that user bided.
    * Expected Result:
        * The user can view the list of products/items that user bided.

### Bargain option (seller):
* Read bargain request 
    * Scenario 1: Successfully view the offers of the product.
      * Steps:
        1. Log in as a user.
        2. Navigate to the profile page.
        3. Scroll down.
        4. In your product card click "Offers" button.
    * Expected Result:
        * The user can view the list of offers from the different user's.

### End