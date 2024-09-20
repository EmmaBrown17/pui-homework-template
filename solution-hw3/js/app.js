let basePrice = 2.49;

let glazePrice = [
    {
        glazing: 'keep-original',
        glazeAdd: 0,
    },
    {
        glazing: 'sugar-milk',
        glazeAdd: 0,
    },
    {
        glazing: 'vanilla-milk',
        glazeAdd: 0.50,
    },
    {
        glazing: 'double-chocolate',
        glazeAdd: 1.50,
    },
];

let packPrice = [
    {
        packsize: 'one',
        packMulti: 1,
    },
    {
        packsize: 'three',
        packMulti: 3,
    },
    {
        packsize: 'six',
        packMulti: 5,
    },
    {
        packsize: 'twelve',
        packMulti: 10,
    },
]

let glazeInput = document.getElementById('glazing');
let packInput = document.getElementById('pack-size');

for (let i = 0; i < glazePrice.length; i++){
    let addedOption = document.createElement('option');
    addedOption.text = glazePrice[i].glazing;
    addedOption.value = glazePrice[i].glazing;
    console.log(addedOption);
    addedOption.classList.add('glazing-options'); // Replace with your actual class name
    glazeInput.add(addedOption);
}

console.log(addedOption);
console.log("You chose " + glazeInput.value);
console.log("Which means the price change is ");

function glazingChange(element){

    //get value of glaze option
    // let glazeInput = document.getElementById('glazing');
    // let packInput = document.getElementById('pack-size');

    // for (let i = 0; i < glazePrice.length; i++){
    //     let addedOption = document.createElement('option');
    //     addedOption.text = glazePrice[i].glazing;
    //     addedOption.value = glazePrice[i].glazing;
    //     glazeInput.add(addedOption);
    // }


    // for (let i = 0; i < glazePrice.length; i++){
    //     let addedOption = document.createElement('option');
    //     addedOption.text = glazePrice[i].glazing;
    //     addedOption.value = glazePrice[i].glazing;
    //     console.log(addedOption);
    //     addedOption.classList.add('glazing-options'); // Replace with your actual class name
    //     glazeInput.add(addedOption);
    // }
    
    

    

    // console.log(element.value);


    //const priceChange = element.value;
    //update the price
}

