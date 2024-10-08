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

    const rollName = document.getElementById("banner-title");
    rollName.textContent = `${roll} Cinnamon Roll`;
}

function populateDropdowns(rollType) {
    const basePrice = rolls[rollType].basePrice;

    const glazeInput = document.getElementById('glazing');
    const packInput = document.getElementById('pack-size');

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

    const currentGlaze = glazeInput.value;
    const currentPack = packInput.value;

    const currentGlazeAdd = glazePrice.find(locateGlazePrice => locateGlazePrice.glazing === currentGlaze).glazeAdd;
    const currentPackAdd = packPrice.find(locatePackPrice => locatePackPrice.packsize === currentPack).packMulti;

    document.getElementById("price-info").textContent = `$${((basePrice + currentGlazeAdd) * currentPackAdd).toFixed(2)}`;
}

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rolls[rollType].basePrice;
        this.rollPrice = rollPrice;
    }
}

function calculateRollPrice(rollType, glaze, packSize) {
    const basePrice = rolls[rollType].basePrice;
    const glazeAdd = glazePrice.find(g => g.glazing === glaze)?.glazeAdd || 0;
    const packMulti = packPrice.find(p => p.packsize === packSize)?.packMulti || 1;

    return ((basePrice + glazeAdd) * packMulti).toFixed(2);
}

const rollOnePrice = calculateRollPrice("Original", "Sugar Milk", "1");
const rollTwoPrice = calculateRollPrice("Walnut", "Vanilla Milk", "12");
const rollThreePrice = calculateRollPrice("Raisin", "Sugar Milk", "3");
const rollFourPrice = calculateRollPrice("Apple", "Original", "3");

const rollOne = new Roll("Original", "Sugar Milk", 1, rollOnePrice);
const rollTwo = new Roll("Walnut", "Vanilla Milk", 12, rollTwoPrice);
const rollThree = new Roll("Raisin", "Sugar Milk", 3, rollThreePrice);
const rollFour = new Roll("Apple", "Original", 3, rollFourPrice);

let cart = [rollOne, rollTwo, rollThree, rollFour];

function loadCart(){
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");

    if (!cart || cart.length === 0){
        totalPriceElement.textContent = "$0.00";
        return;
    }

    cartContainer.innerHTML = '';

    let totalPrice = 0;

    const template = document.getElementById("cart-row-template");

    cart.forEach((roll, index) => {
        const cartRow = template.content.cloneNode(true);

        const cartImage = cartRow.querySelector(".cart-product");
        cartImage.src = `../assets/products/${roll.type.toLowerCase().replace(" ", "-")}-cinnamon-roll.jpg`;
        cartImage.alt = `${roll.type} Cinnamon Roll`;

        cartRow.querySelector(".roll-type").textContent = `${roll.type} Cinnamon Roll`;
        cartRow.querySelector(".roll-glaze").textContent = `Glazing: ${roll.glazing}`;
        cartRow.querySelector(".roll-size").textContent = `Pack size: ${roll.size}`;
        cartRow.querySelector(".price").textContent = `$${parseFloat(roll.rollPrice).toFixed(2)}`;

        const removeButton = cartRow.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => removeItemFromCart(index));

        cartContainer.appendChild(cartRow);

        totalPrice += parseFloat(roll.rollPrice);
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
})

const addToCart = document.getElementById("add-to-cart");

if (addToCart) {
    addToCart.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = "cart.html";
    });
};

console.log(cart);