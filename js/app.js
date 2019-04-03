'use strict';

var canvas = document.getElementById('markschart');
var ctx = canvas.getContext('2d');

var data = {
  labels: ['Banana', 'Boots', 'Chair', 'Dragon'],
  datasets: [{
    data: [3, 12, 5, 10],
  backgroundColor:
  [ 'rgb(200, 100, 0)',
    'rbg(0, 255, 200)',
    'rgb(100, 200, 0)',
    'rgb(20, 50, 100)',
  ]
}],
};

var pieChartConfig = {
  type: 'pie',
  data: data,
};

var pieChart = new Chart(ctx, pieChartConfig);
