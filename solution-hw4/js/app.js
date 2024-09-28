//let basePrice = rolls[rollType].basePrice;

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

// let glazeInput = document.getElementById('glazing');
// let packInput = document.getElementById('pack-size');

// for (let i = 0; i < glazePrice.length; i++){
//     let addedOption = document.createElement('option');
//     addedOption.text = glazePrice[i].glazing;
//     addedOption.value = glazePrice[i].glazing;
//     addedOption.classList.add('glazing-options');
//     glazeInput.add(addedOption);
// }

// for (let i = 0; i < packPrice.length; i++){
//     let addedPackOption = document.createElement('option');
//     addedPackOption.text = packPrice[i].packsize;
//     addedPackOption.value = packPrice[i].packsize;
//     addedPackOption.classList.add('pack-size-options');
//     packInput.add(addedPackOption);
//}

// function priceChange(element){
//     console.log(glazeInput.value);
//     console.log(packInput.value);

//     let currentGlaze = glazeInput.value;
//     let currentPack = packInput.value;

//     let currentGlazeAdd = glazePrice.find(locateGlazePrice => locateGlazePrice.glazing === currentGlaze).glazeAdd;
//     let currentPackAdd = packPrice.find(locatePackPrice => locatePackPrice.packsize === currentPack).packMulti;

//     console.log(currentGlazeAdd);
//     console.log(currentPackAdd);

//     document.getElementById("price-info").textContent = "$" + '$${((basePrice + currentGlazeAdd) * currentPackAdd).toFixed(2)}';
// }




document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get('roll');

    if (rollType && rolls[rollType]) {
        updateImageAndPrice(rollType);
        populateDropdowns(rollType);
    }
})

function updateImageAndPrice(roll) {
    const imageElement = document.getElementById("which-image");
    const priceElement = document.getElementById("price-info");
    const rollData = rolls[roll];

    imageElement.src = `../assets/products/${rollData.imageFile}`;
    priceElement.textContent = `$${rollData.basePrice.toFixed(2)}`;
}

function populateDropdowns(rollType){
    const basePrice = rolls[rollType].basePrice;

    let glazeInput = document.getElementById('glazing');
    let packInput = document.getElementById('pack-size');

    glazePrice.forEach(glaze => {
        let addedOption = document.createElement('option');
        addedOption.text = glaze.glazing;
        addedOption.value = glaze.glazing;
        glazeInput.add(addedOption);
    });

    packPrice.forEach(pack => {
        let addedPackOption = document.createElement('option');
        addedPackOption.text = pack.packsize;
        addedPackOption.value = pack.packsize;
        packInput.add(addedPackOption);
    });
}

function priceChange() {
    const glazeInput = document.getElementById('glazing');
    const packInput = document.getElementById('pack-size');
    const rollType = new URLSearchParams(window.location.search).get('roll');
    const basePrice = rolls[rollType].basePrice;

    let currentGlaze = glazeInput.value;
    let currentPack = packInput.value;

    let currentGlazeAdd = glazePrice.find(locateGlazePrice => locateGlazePrice.glazing === currentGlaze).glazeAdd;
    let currentPackAdd = packPrice.find(locatePackPrice => locatePackPrice.packsize === currentPack).packMulti;

    document.getElementById("price-info").textContent = `$${((basePrice + currentGlazeAdd) * currentPackAdd).toFixed(2)}`;
}