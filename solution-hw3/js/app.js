let basePrice = 2.49;

let glazePrice = [
    {
        glazing: 'Keep Original',
        glazeAdd: 0,
    },
    {
        glazing: 'Sugar Milk',
        glazeAdd: 0,
    },
    {
        glazing: 'Vanilla Milk',
        glazeAdd: 0.50,
    },
    {
        glazing: 'Double Chocolate',
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
    addedOption.classList.add('glazing-options');
    glazeInput.add(addedOption);
}

function priceChange(element){
    //update the price when the certain glazing change 
    //update the price when the certain pack change

    //update total price ?
    


}

