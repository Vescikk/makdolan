fetch('./food.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        for(let i =0; i < data[0].burgers.length;i++){
            console.log(data[0].burgers[i].name)
            console.log(data[0].burgers[i].price)

        }
    })