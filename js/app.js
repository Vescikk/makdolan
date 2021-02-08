let input = document.querySelector('.orderSection-input');
let maxOrderPrice;
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
    createOrder(menu,finalOrder);
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
        maxOrderPrice = Number(input.value);
        if (maxOrderPrice === 0){ return alert("Minimalna wartość zamówienia wynosi 3.90zł")}  
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
            removeElements(ul);
            buildOrder(finalOrder);
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
        const createLiEl = document.createElement('li');
        createLiEl.classList.add('order')

       const createSpanEl = document.createElement('span');
       createSpanEl.classList.add('orderSection-order');

       const createImgEl = document.createElement('img');
       createImgEl.classList.add('orderSection-list-icon');

      const orderType = typeOfOrder[key].type;
        switch (orderType) {
            case'burger':
            createImgEl.src = "img/hamburger.svg";
            break;
            case 'chickens':
                createImgEl.src = "img/nuggets.svg";
            break;
            case 'meal':
                createImgEl.src = "img/meal2.svg";
            break;
            case 'drink':
                createImgEl.src = "img/coke.svg";
            break;
            case 'fries':
                createImgEl.src = "img/fries.svg";
            break;
            case 'wrap':
                createImgEl.src = "img/burrito.svg";
            break;
        }
        createSpanEl.innerHTML = typeOfOrder[key].name + ' ' + typeOfOrder[key].price.toFixed(2)+'zł';
        ul.appendChild(createLiEl)
        createLiEl.appendChild(createImgEl);
        createLiEl.appendChild(createSpanEl);
    }

    totalOrderLi = document.createElement('li');
    totalOrderLi.classList.add('order')

    totalOrderImg = document.createElement('img');
    totalOrderImg .classList.add('orderSection-list-icon');
    totalOrderImg .src = "img/money.svg";

    totalOrderValue = document.createElement('span');
    totalOrderValue.classList.add('orderSection-order');

    totalOrderValue.innerHTML =` Wartość zamówienia: ${ actualBill.toFixed(2)}zł`;
    totalOrderLi.appendChild(totalOrderImg);
    totalOrderLi.appendChild(totalOrderValue);
    ul.appendChild(totalOrderLi)  
    actualBill = 0
    moneyLeft = maxOrderPrice;
}



function removeElements(parent){
    while (parent.firstChild){
  parent.removeChild(parent.firstChild);
}
}
