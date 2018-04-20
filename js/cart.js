'use strict';

var Cart = [{itemNumber: 0, itemQty: 2},
  {itemNumber: 1, itemQty: 1},
  {itemNumber: 4, itemQty: 2}
];
// var Cart = [];
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

  loadCart(); // get data from localStorage
  fixDeleteInstructions(); // tweak html... ;-)
  clearCart(); // delete tbody. Why?
  showCart();
  var tableEl = document.getElementById('cart');
  tableEl.addEventListener('click', removeItemFromCart);
}

function fixDeleteInstructions() {
  var copyEl = document.getElementsByClassName('copy')[0];
  var copyOl = copyEl.getElementsByTagName('ol')[0];
  var liEl = copyOl.getElementsByTagName('li')[0];
  liEl.textContent = 'Check boxes next to any item then click Delete Items button to remove them from your cart';
}
// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableEl = document.getElementById('cart');
  var tbodyEl = tableEl.getElementsByTagName('tbody')[0];
  var tbodyRows = tbodyEl.getElementsByTagName('tr');
  tbodyRows = tbodyRows.length;
  for (var i = 0; i < tbodyRows; i++) {
    tbodyEl.deleteRow(0);
  }
}

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
    var itemFile = Catalog[Cart[item].itemNumber].filePath;
    var productName = Catalog[Cart[item].itemNumber].name;
    tdIDivEl.innerHTML = '<img src='+itemFile+' /><p id=n'+item+'>'+productName+'</p>';
    tdItemEl.appendChild(tdIDivEl);
    trEl.appendChild(tdItemEl);

    var tdPriceEl = document.createElement('td');
    tdPriceEl.setAttribute('id','p'+item);
    var itemPrice = Catalog[Cart[item].itemNumber].price;
    tdPriceEl.textContent = '$' + itemPrice;
    trEl.appendChild(tdPriceEl);

    tbodyEl.appendChild(trEl);
  }
  // Add Delete Items button in table footer
  // var tfootEl = tableEl.getElementsByTagName('tfoot')[0];
  trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.innerHTML = '<button id="delete-items" name="delete">Delete Checked Items</button>';
  trEl.appendChild(tdEl);
  tbodyEl.appendChild(trEl);
  // tdEl.innerHTML = '';
  // trEl.appendChild(tdEl); // blank qty
  // trEl.appendChild(tdEl); // blank item
  // trEl.appendChild(tdEl); // blank price
  // tfootEl.appendChild(trEl);

  // Add checkout form...
}

function removeItemFromCart(e) {
  e.preventDefault();
  console.log('remove item listener',e.target);
  console.log('id',e.target.id, 'type', e.target.type);
  console.log('value',e.target.value);
  if (e.target.type === 'checkbox') {    
    console.log('checkbox',e.target.id,'selected');
    // checkbox ID's are in the form dcbN
    // debugger;
    var id = e.target.id;
    var idEl = document.getElementById(id);
    idEl.setAttribute('checked','');
    var item = id.slice(3, id.length);
    item = parseInt(item);
    var itemNameId = 'n'+item;
    var pEl = document.getElementById(itemNameId)
    var itemName = pEl.textContent;
    console.log('removing',itemName);
    item = 0;
    while (item < Cart.length && itemName !== Catalog[Cart[item].itemNumber].name) {
      item++;
    }
    console.log('delete',Catalog[Cart[item].itemNumber].name);
    // TODO: When a delete link is clicked, rebuild the Cart array without that item
    Cart.splice(item,1);
    // TODO: Save the cart back to local storage
    localStorage.cart = JSON.stringify(Cart);
  } else if (e.target.type === 'submit') {
    // TODO: Re-draw the cart table
    clearCart();
    showCart();
  }
  


}

function renderCheckoutForm() {
  debugger;
  var bodyEl = document.getElementsByTagName('body')[0];
  var mainEl = bodyEl.getElementsByTagName('main')[0];
  var sectionEl = document.createElement('section');
  //ext inputs for each of: name, street, city, state, ZIP code, and phone number
  var formEl = document.createElement('form');
  var fieldSetEl = document.createElement('fieldset');

  var labelEl = document.createElement('label');
  labelEl.setAttribute('for','name');
  labelEl.textContent = 'Name: ';
  fieldSetEl.appendChild(labelEl);
  var inputEl = document.createElement('input');
  inputEl.setAttribute('id','name');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','street');
  labelEl.textContent = 'Street: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','street');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);
  mainEl.appendChild(sectionEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','city');
  labelEl.textContent = 'City: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','city');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','state');
  labelEl.textContent = 'State: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','state');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','zip');
  labelEl.textContent = 'Zip: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','zip');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','phone');
  labelEl.textContent = 'Phone: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','phone');
  inputEl.setAttribute('type','text');
  fieldSetEl.appendChild(inputEl);

  labelEl = document.createElement('label');labelEl.setAttribute('for','card');
  labelEl.textContent = 'Credit card: ';
  fieldSetEl.appendChild(labelEl);
  inputEl = document.createElement('input');
  inputEl.setAttribute('id','card');
  inputEl.setAttribute('type','number');
  fieldSetEl.appendChild(inputEl);

  var buttonEl = document.createElement('button');
  buttonEl.setAttribute('name','submit');
  buttonEl.textContent = 'Place Order';
  fieldSetEl.appendChild(buttonEl);

  formEl.appendChild(fieldSetEl);
  sectionEl.appendChild(formEl);

}

localStorage.cart = JSON.stringify(Cart);
// This will initialize the page and draw the cart on screen
renderCheckoutForm();
renderCart();
