'use strict';

var PRODUCTS = {};

function Product(imgFilePath, name, HTMLid){
this.imgFilePath= imgFilePath;
this.name = name;
this.HTMLid = HTMLid;

PRODUCTS[this.HTMLid] = this;
}

Product.prototype.getPercentClicked = function(){
return this.totalVotes / this.totalViews;
}


var container = document.getElementById('container');
console.log('hello');
console.log(container);

var totalClicks = 0;  // Should this var be totalvotes?

function handleClick(event) {
  // console.log(event.target.className);
  if(event.target.className === 'product'){
    PRODUCTS[event.target.id].totalClicks++
    console.log('Oh Yeah!');
    event.target.id = 'boots';
    event.target.src = './img/boots.jpg';
    totalClicks++;

    if(totalClicks === 5){   //will not work within event handler.
      totalClicks = 0;
    }
  }
}

container.addEventListener('click', handleClick);