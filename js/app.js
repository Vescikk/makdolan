let input = document.querySelector('.orderSection-input');
let maxOrderPrice = 30;
maxOrderPrice = Number(maxOrderPrice)
let finalOrder = [];
let actualBill= 0; 


let moneyHolder;
let orderBtn = document.querySelector('.orderSection-btn');
let ul = document.querySelector('.orderSection-list');
let newLi; 
 

orderBtn.addEventListener('click',btnHandler);


function btnHandler(){
    fetch('./food.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => { 
        orderHandler(data[0].menu);
        
     })
}

//integration of all func
function orderHandler(json){  
    const menu = json
    clearData();
    removeElements(ul,"order");
    createOrder(menu,finalOrder);
    buildOrder(finalOrder);
}   
    

function getRandPosArr(array){
  return  Math.floor(Math.random()*array.length);
}

function clearData(){
    finalOrder= [];
    actualBill = 0;
    moneyLeft = 0
}
//add product to list  product array=fetch from json
//we can specify size or leave it unset to add random product
function addToList(json,typeOfOrder,order,size){
    for(key in json){
        //try refactor to switch case
        if(size && order.size === size){
            typeOfOrder.push(order)
            break  
        }else if(size === undefined){
            typeOfOrder.push(order)
            break
        }else if(typeOfOrder.length === 0){
            typeOfOrder.push(order)
        }else{console.error(`Specific s chosen but its not equal to ${size}`)}   
        }
    }  


    function createOrder(json,typeOfOrder){
        maxOrderPrice = input.value;
        let moneyLeft = maxOrderPrice;
            for(items in json){  //fill the list in products
                if(Math.floor(actualBill) < maxOrderPrice){
                    order = json[getRandPosArr(json)]
                    addToList(json,typeOfOrder,order);
                    addToBill(order,typeOfOrder)
                }
            }//while actbill is over the max price delete last item till actbill < maxprice
           while(Math.floor(actualBill) > maxOrderPrice){
            actualBill -=  typeOfOrder[typeOfOrder.length -1].price 
            typeOfOrder.pop();
            addToBill(order,typeOfOrder)
           }
            moneyLeft -= actualBill
            for(items in json){//check does we can add something more to bill
                if(json[items].price < moneyLeft){
                    typeOfOrder.push(json[items])
                    actualBill += json[items].price;
                    break;
                }
            }
    }
    //add every product price to final order
function addToBill(product,typeOfOrder){
    actualBill = 0
    for(key in  typeOfOrder){
        actualBill +=  typeOfOrder[key].price 
    }
    }
function buildOrder(typeOfOrder){//need to be refactored
    for(key in typeOfOrder){
        newLi = document.createElement('li');
        newLi.classList.add('order')
        span = document.createElement('span');
        span.classList.add('orderSection-order');
        img = document.createElement('img');
        img.classList.add('orderSection-list-icon');

        orderType = typeOfOrder[key].type;
        switch (orderType) {
            case'burger':
                img.src = "img/hamburger.svg";
            break;
            case 'chickens':
                img.src = "img/nuggets.svg";
            break;
            case 'meal':
                img.src = "img/meal2.svg";
            break;
            case 'drink':
                img.src = "img/coke.svg";
            break;
            case 'fries':
                img.src = "img/fries.svg";
            break;
            case 'wrap':
                img.src = "img/burrito.svg";
            break;
        }
        span.innerHTML = typeOfOrder[key].name + ' ' + typeOfOrder[key].price.toFixed(2)+'zł';
        ul.appendChild(newLi)
        newLi.appendChild(img);
        newLi.appendChild(span);
    }
    totalOrderLi = document.createElement('li');
    totalOrderLi.classList.add('order')

    totalOrderImg = document.createElement('img');
    totalOrderImg .classList.add('orderSection-list-icon');
    totalOrderImg .src = "img/money.svg";



    totalOrderValue = document.createElement('span');

    totalOrderValue.innerHTML =` Wartość zamówienia: ${ actualBill.toFixed(2)}zł`;
    totalOrderLi.appendChild(totalOrderImg);
    totalOrderLi.appendChild(totalOrderValue);
    ul.appendChild(totalOrderLi)  
    actualBill = 0
    moneyLeft = maxOrderPrice;
}
function removeElements(parent,child){
   let childs = document.querySelectorAll(`.${child}`);
  if(childs.length - 1 >= 1){
    for(i in childs){
        childs[i].remove();
    }
  }else{
}
}
