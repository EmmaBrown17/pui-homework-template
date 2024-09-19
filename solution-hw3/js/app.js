/* for product description page:

from glazing id, 

if keep original add 0
if sugar milk add 0
if vanilla milk add 0.50
if double chocolate add 1.50
to total 

from pack size id,

if one * 1
if 3 * 3
if 6 * 5
if 12 * 10
*/

let basePrice = 2.49;

let glazePrice = [
    {
        glazing: 'keep-original',
        price: (basePrice + 0),
    },
    {
        glazing: 'sugar-milk',
        price: (basePrice + 0),
    },
    {
        glazing: 'vanilla-milk',
        price: (basePrice + 0.50),
    },
    {
        glazing: 'double-chocolate',
        price: (basePrice + 1.50),
    },
];

let packPrice = [
    {
        packsize: 'keep-original',
        price: (basePrice * 1),
    },
    {
        packsize: 'sugar-milk',
        price: (basePrice * 3),
    },
    {
        packsize: 'vanilla-milk',
        price: (basePrice * 5),
    },
    {
        packsize: 'double-chocolate',
        price: (basePrice * 10),
    },
]

/*
function displayPrice(glaze) {
    let glazeElement = document.querySelector('#price-info');

    glazeElement.innerText = glaze.price;
}
    */

function glazingChange(element){
    console.log("hi");

    let glazeID = document.getElementById('glazing');
    let chosenInput = glazeID.options[glazeID.selectedIndex].text;
    console.log("You chose " + chosenInput);




    // get value of glaze option
    const priceChange = element.value;
    //update the price
}

