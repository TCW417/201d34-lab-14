/* global Product, Cart */

'use strict';

// Prepares variables for use in updateCounter function
var ulItemCount = document.getElementById('itemCount');
var liItemCount = document.createElement('li');

// Prepares variables for use in updateCartPreview function
var divElement = document.getElementById('cartContents');

// Retrieves CartItem instances from Local Storage
var parsedSelections = JSON.parse(localStorage.getItem('selections'));

// Array to store CartItem instances - grabs contents in Local Storage if any exist
CartItem.arrCartItem = parsedSelections || [];

// CartItem constructor
function CartItem(index, quantity) {
  this.index = index;
  this.quantity = quantity;
  CartItem.arrCartItem.push(this);
}

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  // Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i = 0; i < Product.allProducts.length; i++) {
    var optionElement = document.createElement('option');
    optionElement.textContent = Product.allProducts[i].name;
    optionElement.setAttribute('id', Product.allProducts[i].name.toLowerCase());
    selectElement.appendChild(optionElement);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  saveCartToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // Suss out the item picked from the select list - grabs index to simplify use with Product.allProducts array
  var selectElement = document.getElementById('items');
  var indexSelected = selectElement.selectedIndex;
  console.log(indexSelected);

  // Get the quantity
  var quantityElement = document.getElementById('quantity');
  var numSelected = quantityElement.value;
  console.log(numSelected);

  // Using those, create a new Cart item instance *** Includes index where item appears in Product.allProducts ***
  new CartItem(indexSelected, numSelected);
}

// TODO: Save the contents of the cart to Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem('selections', JSON.stringify(CartItem.arrCartItem));
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var totalItems = 0;
  for (var i in CartItem.arrCartItem) {
    totalItems += parseInt(CartItem.arrCartItem[i].quantity);
  }

  liItemCount.textContent = totalItems;
  ulItemCount.appendChild(liItemCount);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // Reset the divElement, so that images aren't re-rendered with every iteration of the loop
  divElement.innerHTML = '';

  // Get the item and quantity from the form
  var arrItemPreview = [];
  var arrItemQuantity = [];

  for (var i in CartItem.arrCartItem) {
    arrItemPreview.push(Product.allProducts[parseInt(CartItem.arrCartItem[i].index)].filePath);

    arrItemQuantity.push(parseInt(CartItem.arrCartItem[i].quantity));

    console.log(i + ' ::::::: ' + Product.allProducts[CartItem.arrCartItem[i].index].filePath);
    console.log(i + ' ::::::: ' + parseInt(CartItem.arrCartItem[i].quantity));
  }

  // Add a new element to the cartContents div with that information
  for (var j = 0; j < CartItem.arrCartItem.length; j++) {
    var imageElement = document.createElement('img');
    var quantityElement = document.createElement('p');

    imageElement.src = arrItemPreview[j];
    quantityElement.textContent = arrItemQuantity[j];

    divElement.appendChild(imageElement);
    divElement.appendChild(quantityElement);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
