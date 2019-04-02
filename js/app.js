'use strict';
// ------------------------------------------------------------
//                     DEFINE GLOBAL VARIABLES
// ----------------------------------------
var PRODUCTS = {};
var show = document.getElementById('resultList');
show.style.display= 'block';  //Change back to none after testing
var maxImages = 24;
var minImages = 0;

var productArray = [
  ['./img/bag.jpg', 'bag', 'bag'],
  ['./img/banana.jpg', 'banana', 'banana'],
  ['./img/bathroom.jpg', 'bathroom', 'bathroom'],
  ['./img/boots.jpg', 'boots', 'boots'],
  ['./img/breakfast.jpg','breakfast', 'breakfast'],
  ['./img/bubblegum.jpg', 'bubblegum', 'bubblegum'],
  ['./img/chair.jpg', 'chair ', 'chair'], 
  ['./img/cthulhu.jpg', 'cthulhu', 'cthulhu'],
  ['./img/dog-duc.jpg', 'dog-duc', 'dog-duc'],
  ['./img/dragon.jpg', 'dragon', 'dragon'],
  ['./img/pen.jpg', 'pen', 'pen'],
  ['./img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep'],
  ['./img/scissors.jpg', 'scissors', 'scissors'],
  ['./img/shark.jpg', 'shark', 'shark'],
  ['./img/sweep.jpg', 'sweep', 'sweep'],
  ['./img/tauntaun.jpg', 'tauntaun', 'tauntaun'],
  ['./img/unicorn.jpg', 'unicorn', 'unicorn'],
  ['./img/usb.gif.jpg', 'usb', 'usb'],
  ['./img/water-can.jpg', 'water-can', 'water-can'],
  ['./img/wine-glass.jpg', 'wine-glass', 'wine-glass'],
];

for(var i = 0; i < productArray.length; i++){
  new Product(productArray[i][0], productArray[i][1], productArray[i][2]);
}

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
  var parent = getElementById(parentId);

  var img = document.createElement('img');
  img.setAttribute('id', this.HTMLid)
  img.setAttribute('src', this.imgFilePath);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
}

function randomlySelectNewImages(){

}

function addCurrentSetOfImages(event){

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
// console.log('hello');
// console.log(container);

var totalVotes = 0;  // Should this var be totalvotes?

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
    console.log(PRODUCTS[event.target.id]);
    totalVotes++;
    stopVoting();
    randomlySelectNewImages();
    addCurrentSetOfImages(event);
  }
}

var lastPageImages = [];

for(var i = 0; i < 3; i++){
  var randomIndex = getRandom(24, 0);
  i = 3;
  while(lastPageImages.includes(randomIndex)){
    randomIndex = getRandom(24, 0);
    console.log(lastPageImages);
  }
  lastPageImages.push(randomIndex);
  console.log(lastPageImages);
}

if(lastPageImages.length === 6){
  lastPageImages.slice(0, 3); // Get syntax for shift
}

container.addEventListener('click', handleClick);

