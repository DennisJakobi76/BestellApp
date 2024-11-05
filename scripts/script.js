const mainDishSection = document.getElementById("main-dish-section");
const dessertSection = document.getElementById("dessert-section");
const basketOrderSection = document.getElementById("basket-order-section");

let allDishes = [];
let orders = [];

function init() {
    allDishes = getArrayOfDishObjects(myDishes);
    if (localStorage.getItem("allDishes")) {
        let savedStateInStorage = localStorage.getItem("allDishes");
        allDishes = JSON.parse(savedStateInStorage);

        let saveOrdersInStorage = localStorage.getItem("currentOrders");
        orders = JSON.parse(saveOrdersInStorage);

        getDishObjects(allDishes);
        renderBasket(orders);
    } else {
        getDishObjects(allDishes);
    }
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
    object.amount++;

    let indexOfDishObjectInOrders = -1;

    for (i = 0; i < orders.length; i++) {
        if (orders[i].id == dishObjectId) {
            indexOfDishObjectInOrders = i;
        }
    }

    if (indexOfDishObjectInOrders == -1) {
        orders.push(object);
    } else {
        let currentObj = orders.find((obj) => obj.id == object.id);
        currentObj.amount = object.amount;
    }

    renderBasket(orders);

    saveToLocalStorage();
}

function renderBasket(array) {
    basketOrderSection.innerHTML = "";

    if (array.length > 0) {
        for (i = 0; i < array.length; i++) {
            basketOrderSection.innerHTML += renderBasketDishObject(array[i]);
        }
    }
}

function saveToLocalStorage() {
    localStorage.clear();

    if (orders.length > 0) {
        let currentDishState = JSON.stringify(allDishes);
        localStorage.setItem("allDishes", currentDishState);

        let currentOrderState = JSON.stringify(orders);
        localStorage.setItem("currentOrders", currentOrderState);
    }
}

function deleteFromBasket(dishObject) {
    // Some Code
}

function subAmount(dishObject) {
    // some Code
}

function addAmount(dishObjectId) {
    addToBasket(dishObjectId);
}
