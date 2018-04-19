/* global Product, Cart */

'use strict';

// TODO: Create a "Cart" constructor (named Cart) that has item and quantity
// properties, and builds an array of items as you create instances



// Product Contructor
var Product = function(filePath, name, price) {
  this.filePath = filePath;
  this.name = name;
  this.price = price;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag', 39.95);
  new Product('assets/banana.jpg', 'Banana', 9.95);
  new Product('assets/bathroom.jpg', 'Bathroom', 49.95);
  new Product('assets/boots.jpg', 'Boots', 29.95);
  new Product('assets/breakfast.jpg', 'Breakfast', 89.95);
  new Product('assets/bubblegum.jpg', 'Bubblegum', 7.95);
  new Product('assets/chair.jpg', 'Chair', 59.95);
  new Product('assets/cthulhu.jpg', 'Cthulhu', 8.95);
  new Product('assets/dog-duck.jpg', 'Dog-Duck', 14.95);
  new Product('assets/dragon.jpg', 'Dragon', 3.95);
  new Product('assets/pen.jpg', 'Pen', 5.95);
  new Product('assets/pet-sweep.jpg', 'Pet Sweep', 19.95);
  new Product('assets/scissors.jpg', 'Scissors', 19.95);
  new Product('assets/shark.jpg', 'Shark', 39.95);
  new Product('assets/sweep.png', 'Sweep', 29.95);
  new Product('assets/tauntaun.jpg', 'Taun-Taun', 39.95);
  new Product('assets/unicorn.jpg', 'Unicorn', 8.95);
  new Product('assets/usb.gif', 'USB', 14.95);
  new Product('assets/water-can.jpg', 'Water Can', 12.95);
  new Product('assets/wine-glass.jpg', 'Wine Glass', 14.95);

  // localStorage.setItem('catalog', JSON.stringify(Product.allProducts));
}



// Initialize the app by creating the big list of products with images and names
generateCatalog();
