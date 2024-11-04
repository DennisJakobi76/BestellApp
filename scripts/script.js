const mainDishSection = document.getElementById("main-dish-section");
const dessertSection = document.getElementById("dessert-section");
const basketOrderSection = document.getElementById("basket-order-section");

let allDishes = [];
let orders = [];

function init() {
    allDishes = getArrayOfDishObjects(myDishes);
    getDishObjects(myDishes);
}

function getDishObjects(array) {
    let oneDishObject = {};

    for (i = 0; i < array.length; i++) {
        oneDishObject = array[i];

        if (oneDishObject.category == "mainDish") {
            mainDishSection.innerHTML += renderDishObject(oneDishObject);
        } else if (oneDishObject.category == "dessert") {
            dessertSection.innerHTML += renderDishObject(oneDishObject);
        }
    }
}

function addToBasket(dishObjectId) {
    let object = allDishes.find((dish) => dish.id == dishObjectId);
    let amount = object.amount;
    amount++;
    object.amount = amount;
    // wenn noch nicht vorhanden, sonst überschreiben UND im localstorage speichern!!
    orders.push(object);
    basketOrderSection.innerHTML = renderBasketDishObject(object);
}

function deleteFromBasket(dishObject) {
    // Some Code
}

function subAmount(dishObject) {
    // some Code
}

function addAmount(dishObject) {
    // some Code
}
