let input = document.querySelector('.maxPriceValue');
let maxOrderPrice = 30 
maxOrderPrice = Number(maxOrderPrice)
let finalOrder = [];
let actualBill= 0; 


let moneyHolder;
let orderBtn = document.querySelector('.navigation-orderBtn');
let ul = document.querySelector('.orderPanel-list');
let newLi;
 

orderBtn.addEventListener('click',orderHandler);




function removeOverPriced(){

}


function orderHandler(){
    //prevent max orderpirce === 0
    console.log(maxOrderPrice);
    fetch('./food.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => { 
        createNewOrder(data[0].menu);
        
     })
}

function createNewOrder(json){  
    const menu = json
    clearData();
    testOrder(menu,finalOrder);
    buildOrder(finalOrder);
    removeChildren({parentId:'ul',childName:'order'});

    console.log(finalOrder) 
}   
    

function getRandPosArr(array){
  return  Math.floor(Math.random()*array.length);
}

function clearData(){
    finalOrder= [];
    actualBill = 0;
    moneyLeft = 0
    console.log('cleared')
}

//add product to list  product array=fetch from json
//we can specify size or leave it unset to add random product
//refactor to switch to make function short as possible
function addToList(json,typeOfOrder,order,size){


    for(key in json){
        //try refactor to switch case
        if(size && order.size === size){
            typeOfOrder.push(order)
            console.log(`${order.name} pushed have size ${order.size} shoulde be ${size}`);
            break  
        }else if(size === undefined){
            typeOfOrder.push(order)
            console.log(`${order.name} pushed have size ${order.size} shoulde be random`)
            break
        }else if(typeOfOrder.length === 0){
            console.log(`List was empty`);
            typeOfOrder.push(order)
        }else{console.error(`Specific s chosen but its not equal to ${size}`)}   
        }
    }  

    function testOrder(json,typeOfOrder){
        let moneyLeft = maxOrderPrice;

            for(items in json){
                if(Math.floor(actualBill) < maxOrderPrice){
                    order = json[getRandPosArr(json)]
                    addToList(json,typeOfOrder,order);
                    addToBill(order,typeOfOrder)
                    console.log("First iterate add random prod when price is smaller")
                }
            }
           while(Math.floor(actualBill) > maxOrderPrice){
            actualBill -=  typeOfOrder[typeOfOrder.length -1].price 
            typeOfOrder.pop();
            addToBill(order,typeOfOrder)
            console.log("removed over priced")

           }
           
            moneyLeft -= actualBill
         //   console.log(`Left: ${moneyLeft}zł`)
            for(items in json){
                if(json[items].price < moneyLeft){
                    typeOfOrder.push(json[items])
                    actualBill += json[items].price;
                    console.log("when prod can be added add extra ")
                    break;
                }
            }
    
        
        console.log(actualBill)
    }
       




    
    //add every product price to final order
function addToBill(product,typeOfOrder){
    actualBill = 0
    for(key in  typeOfOrder){
        actualBill +=  typeOfOrder[key].price 
    }
 //   console.log(`Actual bill is: ${actualBill}zł`)

    }

    



function buildOrder(typeOfOrder){
    for(key in typeOfOrder){
        newLi = document.createElement('li');
        newLi.innerHTML = typeOfOrder[key].name + ' ' + typeOfOrder[key].price+'zł';
        ul.appendChild(newLi)
        newLi.classList.add('order')
    }
    newLi = document.createElement('li');
    newLi.classList.add('order')
    newLi.innerHTML =`Twoja wartość zamówienia wynosi ${ actualBill.toFixed(2)}zł`;
    ul.appendChild(newLi)  
    actualBill = 0
    moneyLeft = maxOrderPrice;
}
git 
