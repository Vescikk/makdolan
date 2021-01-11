let maxOrderPrice = 30; //prompt('Wprowadź kwotę jaką chcesz przeznaczyć');
maxOrderPrice = Number(maxOrderPrice)
console.log(maxOrderPrice);
let moneyLeft = maxOrderPrice;
let actualBill= 0; 
let moneyHolder;
let orderBtn = document.querySelector('.navigation-orderBtn');
let ul = document.querySelector('.orderPanel-list');

let newLi;
 

orderBtn.addEventListener('click',orderHandler);

function orderHandler(){
    //prevent max orderpirce === 0
    maxOrderPrice === 0  ? maxOrderPrice = 30 : console.log('error');

    fetch('./food.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => { 
        createNewOrder(data[0].menu);  
     })
}

function createNewOrder(json){  
    let finalOrder = [];
    let actualBill= 0;
    let moneyLeft = maxOrderPrice;

    const menu = json
    genRandOrder(menu,finalOrder);
    completeOrder(menu,finalOrder)
    buildOrder(menu,finalOrder);
    clearData(menu,finalOrder,actualBill,moneyLeft)
}   
    

function getRandPosArr(array){
  return  Math.floor(Math.random()*array.length);
}

//fix// gen spec order depends on actual price and so on
function genSpecOrder(actPrice,maxPrice,array,bigList,mediumList,finalList){
    finalList.push(bigList[getRandPosArr(bigList)])
    actualBill += finalList[0].price
    if(actPrice < maxPrice){
        addToList(array,mediumList,'medium')
        finalList.push(mediumList[getRandPosArr(mediumList)])
        actualBill += finalList[1].price 

    }
}

//add product to list  product array=fetch from json
//we can specify size or leave it unset to add random product
//refactor to switch make function short as possible
function addToList(array,list,size){
    for(key in array){
        order = array[getRandPosArr(array)]
        //try refactor to switch case
        if(size && order.size === size){
            list.push(order)
            console.log(list)
            addToBill(order,actualBill)      
            break  
        }else if(size === undefined){
            list.push(order)
            console.log(list) 
            addToBill(order,actualBill)      
            break
        }else if(list.length === 0){
            console.log(`List was empty`);
            list.push(order)
            addToBill(order,actualBill) 
            console.log(list)
        }else{
            console.error(`Specific type chosen but its not equal to ${size}`)
            }   
        }
    }  

    
    //add every product price to final order
function addToBill(product,bill){
    actualBill += product.price;
    console.log(`Actual bill is: ${actualBill}zł`)
    }

    //add  genertate order based on a random products
function genRandOrder(array,typeOfOrder){
    //iterate on very product in json
    for(value in array){
        addToList(array,typeOfOrder)

        //100% have to refactor but work for now xD can be done better
        if(Math.floor(actualBill) >= maxOrderPrice - 5){
            if(Math.floor(actualBill) > maxOrderPrice){
                actualBill -= typeOfOrder[typeOfOrder.length - 1].price
                console.log(`Actual bill is: ${actualBill}zł`)
                typeOfOrder.pop();
                console.log(`Actual bill in this case: ${actualBill}`) 
                console.log('break over maxOrderPrice')
                addToList(array,typeOfOrder,'small')
                break
            }else{
                console.log('break')
                break
            }
        }
        //in low max Prices prevent to add big last item and get overpriced
        else if(Math.floor(actualBill) >= maxOrderPrice - 20){
            priceOfLastEl = typeOfOrder[typeOfOrder.length - 1].price;
            console.log('nuggets')
            if(typeOfOrder[typeOfOrder.length - 1].price > 19){
                typeOfOrder.pop();
                typeOfOrder.length === 0 ? addToList(array,typeOfOrder) :actualBill -= priceOfLastEl;
                moneyLeft += priceOfLastEl;
                addToList(array,typeOfOrder)
            }
        }else if(actualBill >= maxOrderPrice - 10) {                         
            addToList(array,typeOfOrder,'small')
            console.log('small')
        }else{
            addToList(array,typeOfOrder)
            console.log('else')
        }           
    }   
}

function completeOrder(array,typeOfOrder)
{
    moneyLeft -= actualBill
    console.log(`Money left: ${actualBill}zł`)
    console.log(`Money left: ${moneyLeft}zł`)
    let finalBillCheck =0;
 
    //fix logic sometimes can add one more product
    for(key in array){
        if(array[key].price < moneyLeft){typeOfOrder.push(array[key]); break;}
    }
    for( price in typeOfOrder){
        finalBillCheck += typeOfOrder[price].price
    }
    console.log(`Finall bill value is equal to ${finalBillCheck}`)
    moneyHolder = finalBillCheck
}

function buildOrder(array,typeOfOrder){
    
    for(key in typeOfOrder){
        newLi = document.createElement('li');
        newLi.innerHTML = typeOfOrder[key].name + ' ' + typeOfOrder[key].price+'zł';
        ul.appendChild(newLi)
        newLi.classList.add('order')
    }
    newLi = document.createElement('li');
    newLi.classList.add('order')
    newLi.innerHTML =`Twoja wartość zamówienia wynosi ${ moneyHolder.toFixed(2)}zł`;
    ul.appendChild(newLi)  
    actualBill = 0
    moneyLeft = maxOrderPrice;
}
function clearData(array,typeOfOrder,bill,leftToSpend){
    typeOfOrderbill = [];
    bill = 0;
    leftToSpend = 0
}
function clearOrder(array,typeOfOrder){
    list = document.querySelectorAll('.order')
    if(list.length > 1){
        for(element in list){
       list[element].remove();
    }}
}

