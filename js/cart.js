'use strict';

// var Cart = [{itemNumber: 0, itemQty: 2},
//   {itemNumber: 1, itemQty: 1},
//   {itemNumber: 4, itemQty: 2}
// ];
var Cart = [];
var Catalog = [];
// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  Cart = JSON.parse(localStorage.getItem('cart')) || [];
  Catalog = JSON.parse(localStorage.getItem('catalog')) || [];
}
// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  // clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  var tableEl = document.getElementById('cart');
  // Add a price column to the table
  var theadEl = tableEl.getElementsByTagName('thead')[0];
  var trEl = theadEl.getElementsByTagName('tr')[0];
  var thEl = document.createElement('th');
  thEl.textContent = 'Price';
  trEl.appendChild(thEl);
  theadEl.appendChild(trEl);

  // TODO: Find the table body
  var bodies = tableEl.getElementsByTagName('tbody');
  var tbodyEl = tableEl.getElementsByTagName('tbody')[0];

  // TODO: Iterate over the items in the cart
  for (var item = 0; item < Cart.length; item++) {
    // TODO: Create a TR
    trEl = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    var tdDelEl = document.createElement('td');
    tdDelEl.setAttribute('id','d'+item);
    tdDelEl.innerHTML = '<input type="checkbox" id="dcb'+item+'" />';
    trEl.appendChild(tdDelEl);

    var tdQtyEl = document.createElement('td');
    tdQtyEl.setAttribute('id','q'+item);
    tdQtyEl.textContent = Cart[item].itemQty;
    trEl.appendChild(tdQtyEl);

    var tdItemEl = document.createElement('td');
    tdItemEl.setAttribute('id','i'+item);
    var tdIDivEl = document.createElement('div');
    tdIDivEl.innerHTML = '<img src='+Catalog[Cart[item].itemNumber].filePath+' /><p>'+'PRODUCT NAME'+'</p>';
    // tdIDivEl.appendChild(tdpEl);
    tdItemEl.appendChild(tdIDivEl);
    trEl.appendChild(tdItemEl);

    var tdPriceEl = document.createElement('td');
    tdPriceEl.setAttribute('id','p'+item);
    tdPriceEl.textContent = '$' + 9.95;
    trEl.appendChild(tdPriceEl);

    tbodyEl.appendChild(trEl);
  }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, rebuild the Cart array without that item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// localStorage.cart = JSON.stringify(Cart);
// This will initialize the page and draw the cart on screen
renderCart();
