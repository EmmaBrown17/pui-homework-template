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
        packsize: '1',
        packMulti: 1,
    },
    {
        packsize: '3',
        packMulti: 3,
    },
    {
        packsize: '6',
        packMulti: 5,
    },
    {
        packsize: '12',
        packMulti: 10,
    },
]

let glazeInput = document.getElementById('glazing');
let packInput = document.getElementById('pack-size');

for (let i = 0; i < glazePrice.length; i++){
    let addedOption = document.createElement('option');
    addedOption.text = glazePrice[i].glazing;
    addedOption.value = glazePrice[i].glazing;
    addedOption.classList.add('glazing-options');
    glazeInput.add(addedOption);
}

for (let i = 0; i < packPrice.length; i++){
    let addedPackOption = document.createElement('option');
    addedPackOption.text = packPrice[i].packsize;
    addedPackOption.value = packPrice[i].packsize;
    addedPackOption.classList.add('pack-size-options');
    packInput.add(addedPackOption);
}

function priceChange(element){
    console.log(glazeInput.value);
    console.log(packInput.value);

    let currentGlaze = glazeInput.value;
    let currentPack = packInput.value;

    let currentGlazeAdd = glazePrice.find(locateGlazePrice => locateGlazePrice.glazing === currentGlaze).glazeAdd;
    let currentPackAdd = packPrice.find(locatePackPrice => locatePackPrice.packsize === currentPack).packMulti;

    console.log(currentGlazeAdd);
    console.log(currentPackAdd);

    document.getElementById("price-info").innerHTML = "$" + (((basePrice + currentGlazeAdd) * currentPackAdd).toFixed(2));
}