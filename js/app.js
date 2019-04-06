'use strict';

// ------------------------------------------------------------
//TODO LIST:
// ------------------------------------------------------------
// DISPLAY FIRST RANDOM GROUP ON LOAD VERSUS CLICK
//FIX COUNTS OF VIEWS BY PRODUCT
//RESIZE SHARK IMAGE TO FIT IN WINDOW
// ------------------------------------------------------------

// ------------------------------------------------------------
//                     DEFINE GLOBAL VARIABLES
// ----------------------------------------
var PRODUCTS = {};
var show = document.getElementById('resultList');
show.style.display= 'block'; //Change back to none after testing or to block to test
var MAXIMAGES = 20;
var MINIMAGES = 0;
var lastPageImages = [];
var totalVotes = 0;
var totalViews = 0;
var container = document.getElementById('container');
var ol = document.getElementById('votes');
var RESULTLABELS = [];
var RESULTDATAVOTES = [];
var initialImageLoad = document.getElementById('item_1');
var chartData = [];


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
  // console.log('hello');
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
    var randomIndex = getRandom(MAXIMAGES, MINIMAGES);
    while(lastPageImages.includes(randomIndex)){
      randomIndex = getRandom(MAXIMAGES, MINIMAGES);
    }
    lastPageImages.push(randomIndex);
  }
  if(lastPageImages.length === 6){
    lastPageImages.shift(); // Get syntax for shift
    lastPageImages.shift();
    lastPageImages.shift();
  }
}

// Add the new images to the DOM -
//item_x are the three id's used in the HTML for attaching the image elements.

function addCurrentSetOfImages(){
  for (var i = 0; i < 3; i++) {
    // if (totalVotes > 1){
      var parent = document.getElementById(`item_${i+1}`);
      var child = parent.firstElementChild;
      if(child){child.remove();}
      var productToRender = lastPageImages[i];
      var newIdName = PRODUCTSARRAY[productToRender].HTMLid;
      var newImgPath = PRODUCTSARRAY[productToRender].imgFilePath;
      var newChild = document.createElement('img');
      newChild.setAttribute('class', 'product');
      newChild.setAttribute('id', newIdName);
      newChild.setAttribute('src', newImgPath);
      parent.appendChild(newChild);
      addViewsOfProduct();
    // }
  }
}

//update the total views for each image
//Error messages from these complicated statements so need a better method for tracking views of individual images.
function addViewsOfProduct() {
  for (var i = 0; i < 3; i++){
    var productIndex = lastPageImages[i];//loop through first the random numbers in array
    // console.log(productIndex);
    // PRODUCTSARRAY[productIndex].totalViews++;//Adding one to the number of total views for an indivual product in the PRODUCTS objects
    // PRODUCTS[productArray[lastPageImages[1]][1]].totalViews++;
    // PRODUCTS[productArray[lastPageImages[2]][1]].totalViews++;
  }
}

function stopVoting(){
  // console.log(totalVotes);
  if(totalVotes > 25){
    totalVotes = 0;
  }
  if(totalVotes === 25){
    container.removeEventListener('click', handleClick);
    // console.log(totalVotes);
    totalVotes === 0;
    for(var i = 0; i < PRODUCTSARRAY.length; i++) {
     
      RESULTDATAVOTES.push(PRODUCTSARRAY[i].totalVotesOnPage);
      RESULTLABELS.push(PRODUCTSARRAY[i].name);
    }
    displayResults();
    renderChart();
  }
}


var getRandom = function(MAXIMAGES, MINIMAGES){
  return Math.floor(Math.random() * (MAXIMAGES - MINIMAGES) + MINIMAGES);
};



function displayResults(){
  show = document.getElementById('resultList');
  show.style.display = 'block';
  for(var i = 0; i < PRODUCTSARRAY.length; i++){
    var li = document.createElement('li');
    li.textContent = `${RESULTDATAVOTES[i]} votes for the ${RESULTLABELS[i]}`;
    ol.appendChild(li);
  }
}

function renderChart(){
  var canvas = document.getElementById('markschart');
  var ctx = canvas.getContext('2d');
  // console.log(RESULTDATAVOTES);
  // for( i = 0; i < PRODUCTSARRAY.length; i++) {
  //   chartLabels.push(PRODUCTSARRAY[i].name); 
  //   chartData.push(PRODUCTSARRAY[i].totalVotesOnPage);
  // }
  console.log(RESULTDATAVOTES);
  var data = {
    labels: RESULTLABELS, //RESULTSLABELS
    datasets: [{
      label: 'Votes by Product',
      data: RESULTDATAVOTES,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }],
  };
  var options = {
    backgroundColor: 'rgb(64, 211, 191)',
    borderColor: 'rgb(46, 146, 133)',
    pointBackgroundColor: 'rgb(46, 135, 100)'
  };
  var pieChartConfig = {
    type: 'bar',
    data: data,
    options: options
  };
  
  var pieChart = new Chart(ctx, pieChartConfig);
}

function handleClick(event) {
// console.log(event.target.id);
  if(event.target.className === 'product'){
  // console.log(event.target.id);
  //     event.target.id = 'boots';
  // event.target.src = './img/boots.jpg';
    PRODUCTS[event.target.id].totalVotesOnPage++;
    // console.log(PRODUCTS[event.target.id].totalViews);
    totalVotes++;
    stopVoting();
    randomlySelectNewImages();
    addCurrentSetOfImages(event);
    setStateToLocalStorage();
  }
}

// --------------------------------------------------------------
//                        Run Script
// --------------------------------------------------------------
// Generate Objects for Products
function loadProductTable(){
  for(var i = 0; i < productArray.length; i++){
    new Product(productArray[i][0], productArray[i][1], productArray[i][2]);//This is the last time I am going to touch the productsArray
  }
}

function myFunction(){
  console.log('myFunction');
}

window.addEventListener('load', (myFunction));{
  loadProductTable();
  var PRODUCTSARRAY = Object.values(PRODUCTS);
  console.log(PRODUCTS);
  randomlySelectNewImages();
  addCurrentSetOfImages();
  console.log(lastPageImages);
  console.log(PRODUCTSARRAY);
  setStateToLocalStorage();
  console.log('page is fully loaded');
}



// render the images at start up.
// randomlySelectNewImages();


console.log(RESULTDATAVOTES);


container.addEventListener('click', handleClick);
// console.log(PRODUCTS);


// --------------------------------------------------------------------
// LocalStorage 
//-------------------------------------------------------------------------

var STATE_KEY = 'totalVotes';

//Place all functions within the getStateFromLocalStoreage and setStateToLocalStorage functions for any change of state.
(function getStateFromLocalStoreage(){
  if(localStorage[STATE_KEY]){
    var rawState = localStorage.getItem(STATE_KEY);
    totalVotes = JSON.parse(rawState);
    renderDOM();
    getTotalVotes();
    getLastImagesArray();
    getProductVotesAndViews();
  }else{
    resetState();
  }
})(); //groups and calls function.

function setStateToLocalStorage(){
  setTotalVotes();
  setLastImagesArray();
  setDOM();
  setProductVotesAndViews();
}

function resetState(){
  //include calls to all functions needed to reset the state to where the user refreshed or closed browser window.
}

function renderDOM () {
//render the DOM and set the display (show.style.display= 'none'; from 'block') if at 25 votes
}

function setDOM () {
  //save the state of the DOM to local storage
}

function setTotalVotes() {
  localStorage.setItem(STATE_KEY, JSON.stringify(totalVotes));//test then replace with STATE_KEY
  //store the value of total votes if between 1 and 25 inclusive.
}

function getTotalVotes(){
  //get Total Votes from local storage and update global variable
}

function setLastImagesArray (){
  // store the last images array
}

function getLastImagesArray (){
  //get last images array data and populate array
}

function getProductVotesAndViews(){
  //get the totalVotesOnPage and totalViews from PRODUCT
}
function setProductVotesAndViews(){
  //set the totalVotesOnPage and totalViews to PRODUCT
}

