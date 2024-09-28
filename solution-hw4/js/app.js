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

let cart = [];

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

function populateDropdowns(rollType){
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
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addToCart = document.getElementById("add-to-cart");
    const cart = [];

    if (addToCart) {
        addToCart.addEventListener("click", (event) => {
            event.preventDefault();
    
            const rollType = document.getElementById("banner-title").textContent.replace(" Cinnamon Roll", "");
            const rollGlazing = document.getElementById("glazing").value;
            const packSize = document.getElementById("pack-size").value;
    
            if (!rolls[rollType]) {
                console.error("Invalid roll type:", rollType);
                return;
            }
    
            const basePrice = rolls[rollType].basePrice;
    
            const selectedRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    
            localStorage.setItem('cart', JSON.stringify([selectedRoll]));
    
            window.location.href = "cart.html";
        });
    } else {
        console.log("Element not found");
    }
});