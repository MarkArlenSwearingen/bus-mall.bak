'use strict';
// ------------------------------------------------------------
//                     DEFINE GLOBAL VARIABLES
// ----------------------------------------
var PRODUCTS = {};
var show = document.getElementById('resultList');
show.style.display= 'none'; //Change back to none after testing
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
};

Product.prototype.render = function(parentId){
  console.log('hello');
  var parent = document.getElementById(parentId);
// console.log(parent);
  var img = document.createElement('img');
  img.setAttribute('id', this.HTMLid);
  img.setAttribute('src', this.imgFilePath);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
};

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

// Add the new images to the DOM - Got lost in details. Need to firt get parent of first item in listPageImages array.
// After confirming that there is a parent and was a child, remove child.  Then, get the random number generated as the fourth(index 3) of the
// lastPageImages Array.  Go through three remaining steps of creating the img element, setting the attributes for class, id and src, and appending the new
// child to the parent element.  Potentially a time to write the record that the image was viewed and remove entry from lastPageImages array.  Hopefully,
// this will address the data issue of only getting two of the three values.
function addCurrentSetOfImages(event){
  var parent = document.getElementById('item_1');
  var child = parent.firstElementChild;
  if(child){child.remove();}
  // console.log(parent);
  // console.log(child);
  console.log(lastPageImages);
  console.log(lastPageImages[0]);
  var firstImageOfDisplayed = productArray[lastPageImages[0]];
  console.log(firstImageOfDisplayed);
  var nameOfFirstImageofDisplayed = firstImageOfDisplayed.splice(2,1);
  console.log(nameOfFirstImageofDisplayed[0]);
  var newImgPath = PRODUCTS[nameOfFirstImageofDisplayed[0]].imgFilePath;
  var newIdName = PRODUCTS[nameOfFirstImageofDisplayed[0]].name;
  // console.log(newImgPath);
  var newChild = document.createElement('img');
  // console.log(newChild);
  newChild.setAttribute('class', 'product');
  newChild.setAttribute('id', newIdName);
  newChild.setAttribute('src', newImgPath);
  parent.appendChild(newChild);

  //add second image to DOM and remove old image from Dom
  parent = document.getElementById('item_2');
  child = parent.firstElementChild;
  console.log(child);
  if(child){child.remove();}
  console.log(lastPageImages);
  var secondImageOfDisplayed = productArray[lastPageImages[1]];
  console.log(secondImageOfDisplayed);
  var nameOfSecondImageofDisplayed = secondImageOfDisplayed .splice(2,1);
  newImgPath = PRODUCTS[nameOfSecondImageofDisplayed[0]].imgFilePath;
  newIdName = PRODUCTS[nameOfSecondImageofDisplayed[0]].name;
  newChild = document.createElement('img');
  newChild.setAttribute('class', 'product');
  newChild.setAttribute('id', newIdName);
  newChild.setAttribute('src', newImgPath);
  parent.appendChild(newChild); parent.appendChild(newChild);

  // add Third New Image to DOM and remove old image from Dom
  parent = document.getElementById('item_3');
  child = parent.firstElementChild;
  console.log(child);
  if(child){child.remove();}
  console.log(lastPageImages);
  var thirdImageOfDisplayed = productArray[lastPageImages[2]];
  console.log(thirdImageOfDisplayed);
  var nameOfThirdImageofDisplayed = thirdImageOfDisplayed .splice(2,1);
  newImgPath = PRODUCTS[nameOfThirdImageofDisplayed[0]].imgFilePath;
  newIdName = PRODUCTS[nameOfThirdImageofDisplayed[0]].name;
  newChild = document.createElement('img');
  newChild.setAttribute('class', 'product');
  newChild.setAttribute('id', newIdName);
  newChild.setAttribute('src', newImgPath);
  parent.appendChild(newChild); parent.appendChild(newChild);

  //update the total views for each image
  //Error messages from these complicated statements so need a better method for tracking views of individual images.
  PRODUCTS[productArray[lastPageImages[0]][1]].totalViews++;
  PRODUCTS[productArray[lastPageImages[1]][1]].totalViews++;
  PRODUCTS[productArray[lastPageImages[2]][1]].totalViews++;
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
};

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
    PRODUCTS[event.target.id].totalVotesOnPage++;
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

container.addEventListener('click', handleClick);
console.log(PRODUCTS);

