'use strict';
// ------------------------------------------------------------
//                     DEFINE GLOBAL VARIABLES
// ----------------------------------------
var PRODUCTS = {};
var show = document.getElementById('resultList');
show.style.display= 'block';  //Change back to none after testing
var maxImages = 24;
var minImages = 0;
var lastPageImages = [];
var totalVotes = 0; 
var totalViews = 0;

var productArray = [
  ['./img/bag.jpg', 'bag', 'bag'],
  ['./img/banana.jpg', 'banana', 'banana'],
  ['./img/bathroom.jpg', 'bathroom', 'bathroom'],
  ['./img/boots.jpg', 'boots', 'boots'],
  ['./img/breakfast.jpg','breakfast', 'breakfast'],
  ['./img/bubblegum.jpg', 'bubblegum', 'bubblegum'],
  ['./img/chair.jpg', 'chair ', 'chair'], 
  ['./img/cthulhu.jpg', 'cthulhu', 'cthulhu'],
  ['./img/dog-duck.jpg', 'dog-duc', 'dog-duc'],
  ['./img/dragon.jpg', 'dragon', 'dragon'],
  ['./img/pen.jpg', 'pen', 'pen'],
  ['./img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep'],
  ['./img/scissors.jpg', 'scissors', 'scissors'],
  ['./img/shark.jpg', 'shark', 'shark'],
  ['./img/sweep.png', 'sweep', 'sweep'],
  ['./img/tauntaun.jpg', 'tauntaun', 'tauntaun'],
  ['./img/unicorn.jpg', 'unicorn', 'unicorn'],
  ['./img/usb.gif', 'usb', 'usb'],
  ['./img/water-can.jpg', 'water-can', 'water-can'],
  ['./img/wine-glass.jpg', 'wine-glass', 'wine-glass'],
];

// ---------------------------------------------------------------
//                   Define Functions
// -----------------------------------------------------------------

function Product(imgFilePath, name, HTMLid){
this.imgFilePath = imgFilePath;
this.name = name;
this.HTMLid = HTMLid;
this.totalVotesOnPage = 0;
this.totalViews = 0;

PRODUCTS[this.HTMLid] = this;
}

Product.prototype.getPercentClicked = function(){
return this.totalVotesOnPage / this.totalViews;
}

Product.prototype.render = function(parentId){
  console.log('hello');
  var parent = document.getElementById(parentId);
// console.log(parent);
  var img = document.createElement('img');
  img.setAttribute('id', this.HTMLid)
  img.setAttribute('src', this.imgFilePath);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
}

function randomlySelectNewImages(){
  for(var i = 0; i < 3; i++){
    var randomIndex = getRandom(24, 0);
    // i = 3;  // used for testing
    while(lastPageImages.includes(randomIndex)){
      randomIndex = getRandom(24, 0);
    }
    lastPageImages.push(randomIndex);
    }
  
  if(lastPageImages.length === 6){
    lastPageImages.shift(); // Get syntax for shift
    lastPageImages.shift(); 
    lastPageImages.shift(); 
  }
}

//update the total views for each image
function addCurrentSetOfImages(event){
  var parent = document.getElementById('item_1');
  var child = parent.firstElementChild;
  if(child){child.remove();}
  console.log(parent);
  console.log(child);
  console.log(lastPageImages);
  var newChild = PRODUCTS[productArray[lastPageImages[0]][1]]
  var newch1 = lastPageImages[0];
  console.log(newch1);
  console.log(newChild);
  var newChild1 = document.createElement('img');
  console.log(newChild1);
  newChild1.setAttribute('class', 'product');
  newChild1.setAttribute('id', newChild.name);
  newChild1.setAttribute('src', newChild.imgFilePath);
  parent.appendChild(newChild1);
  // var firstImageKey = lastPageImages;
  // console.log(firstImageKey);
  // console.log(productArray[2]);
  // console.log(firstImageProduct);
  // console.log(firstImageProductViews);
  // console.log(PRODUCTS[productArray[lastPageImages[0]][1]].totalViews);


  //Error messages from these complicated statements so need a better method for tracking views of individual images.
  // PRODUCTS[productArray[lastPageImages[0]][1]].totalViews++
  // PRODUCTS[productArray[lastPageImages[1]][1]].totalViews++
  // PRODUCTS[productArray[lastPageImages[2]][1]].totalViews++

    //add new set of images to DOM and remove old images from Dom

    // addSecondNewImage (){
      var parent = document.getElementById('item_2');
      var child = parent.firstElementChild;
      if(child){child.remove();}
      console.log(parent);
      console.log(child);
      console.log(lastPageImages);
      var newChild = PRODUCTS[productArray[lastPageImages[1]][1]]
      console.log(newChild);
      var newChild2 = document.createElement('img');
      console.log(newChild1);
      newChild2.setAttribute('class', 'product');
      newChild2.setAttribute('id', newChild.name);
      newChild2.setAttribute('src', newChild.imgFilePath);
      parent.appendChild(newChild1);
    
  // addThirdNewImage
    var parent = document.getElementById('item_3');//The third image has and id of 'item_3
    var child = parent.firstElementChild;
    if(child){child.remove();}
    console.log(parent);
    console.log(child);
    console.log(lastPageImages);
    var newChild = PRODUCTS[productArray[lastPageImages[2]][1]]; //index of last page image of [2] is the third image.
    // console.log(newChild);
    var newChild3 = document.createElement('img');
    console.log(newChild1);
    newChild3.setAttribute('class', 'product');
    newChild3.setAttribute('id', newChild.name);
    newChild3.setAttribute('src', newChild.imgFilePath);
    parent.appendChild(newChild1);
}





function stopVoting(){
  console.log(totalVotes);
  if(totalVotes === 25){
    container.removeEventListener('click', handleClick);
    totalVotes === 0;
    displayResults();
  }
}

var getRandom = function(maxImages, minImages){
  return Math.floor(Math.random() * (maxImages - minImages) + minImages);
}

var container = document.getElementById('container');

function displayResults(){
  show = document.getElementById('resultList');
  show.style.display = 'block';
}

function handleClick(event) {
  // console.log(event.target.id);
  if(event.target.className === 'product'){
    // console.log(event.target.id);
    //     event.target.id = 'boots';
    // event.target.src = './img/boots.jpg';
    PRODUCTS[event.target.id].totalVotesOnPage++
    console.log(PRODUCTS[event.target.id].totalViews);
    totalVotes++;
    stopVoting();
    randomlySelectNewImages();
    addCurrentSetOfImages(event);
  }
}

// --------------------------------------------------------------
//                        Run Script
// --------------------------------------------------------------

// Generate Objects for Products
for(var i = 0; i < productArray.length; i++){
  new Product(productArray[i][0], productArray[i][1], productArray[i][2]);
}

console.log(PRODUCTS);


container.addEventListener('click', handleClick);

// var boots = new Product('./img/boots.jpg', 'Boots', 'boots');
// boots.render('item_1'); 

