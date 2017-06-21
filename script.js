var coinData = "";

$(function(){
    getData();
   
})


function getData(){
    
    $.getJSON('https://api.coinmarketcap.com/v1/ticker/', function(data){
        
        coinData = JSON.stringify(data);
         //alert(coinData);
        //alert(coinData[0]['name']);
       storeData(data);
            
        
        
    })
   // alert(coinData);
    
}

function ListData(data){
        for(i =0; i < data.length; i++){
            var coinname = data[i]['name'];
            var coinPrice = data[i]['price_usd']
            $('#list').append("<li>"+coinname+"</li>")
            $('#list').append("<h4>"+coinPrice+"</h4>")
        }
    
}
function storeData(data){
    var coins = {
        names: [],
        price: []
    }
    for(i =0; i < 15; i++){
        coins.names.push(data[i]['name'])
        coins.price.push(data[i]['price_usd'])
    }
    createGraph(coins);
}
function createGraph(data){
   var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.names,
            datasets: [{
                label: 'price',
                data: data.price,
                backgroundColor: 'grey',
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }); 
    
}