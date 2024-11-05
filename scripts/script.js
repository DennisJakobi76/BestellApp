const mainDishSection = document.getElementById("main-dish-section");
const dessertSection = document.getElementById("dessert-section");
const beverageSection = document.getElementById("beverage-section");
const basketOrderSection = document.getElementById("basket-order-section");
const basketBillSection = document.getElementById("basket-bill-section");
const mobileBasketContainer = document.getElementById("mobile-basket-container");
const mobileBasketOrderSection = document.getElementById("mobile-basket-order-section");
const mobileBasketBillSection = document.getElementById("mobile-basket-bill-section");

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
        renderBasket(orders, basketOrderSection);
        renderBasket(orders, mobileBasketOrderSection);
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
        } else if (oneDishObject.category == "beverage") {
            beverageSection.innerHTML += renderDishObject(oneDishObject);
        }
    }
}

function addToBasket(dishObjectId) {
    let dishWithId = getCurrentDish(allDishes, dishObjectId);
    dishWithId.amount++;

    let indexOfDishObjectInOrders = getIndexOfDishInBasket(orders, dishObjectId);

    if (indexOfDishObjectInOrders == -1) {
        orders.push(dishWithId);
    } else {
        let currentObj = orders.find((obj) => obj.id == dishWithId.id);
        currentObj.amount = dishWithId.amount;
    }

    renderBasket(orders, basketOrderSection);
    renderBasket(orders, mobileBasketOrderSection);

    saveToLocalStorage();
}

function checkShowBillSection(array, element) {
    if (array.length == 0) {
        element.classList.add("d_none");
    } else if (array.length > 0) {
        element.classList.remove("d_none");
        element.innerHTML = renderBillSection();

        let basketSumValues = document.getElementsByClassName("basket-sum-value");
        let basketTotalValues = document.getElementsByClassName("basket-total-value");

        let sum = calculateBill(orders);
        let sumText = `${sum.toFixed(2).replace(".", ",")} €`;
        let total = calculateTotal(sum, 5);
        let totalText = `${total.toFixed(2).replace(".", ",")} €`;
        writeToElementsOfArray(basketSumValues, sumText);
        writeToElementsOfArray(basketTotalValues, totalText);
    }
}

function writeToElementsOfArray(array, text) {
    for (i = 0; i < array.length; i++) {
        array[i].innerHTML = text;
    }
}

function renderBasket(array, element) {
    element.innerHTML = "";

    if (array.length > 0) {
        for (i = 0; i < array.length; i++) {
            element.innerHTML += renderBasketDishObject(array[i]);
        }
    }

    checkShowBillSection(orders, basketBillSection);
    checkShowBillSection(orders, mobileBasketBillSection);
}

function calculateBill(array) {
    let sumOfOrders = 0;
    for (i = 0; i < array.length; i++) {
        sumOfOrders += array[i].orderSum;
    }

    return sumOfOrders;
}

function calculateTotal(sum, deliveryCost) {
    return sum + deliveryCost;
}

function getCurrentDish(array, id) {
    return array.find((dish) => dish.id == id);
}

function getIndexOfDishInBasket(array, id) {
    let indexOfDishObjectInOrders = -1;

    for (i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            indexOfDishObjectInOrders = i;
        }
    }

    return indexOfDishObjectInOrders;
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

function deleteFromBasket(dishObjectId) {
    let dishWithId = getCurrentDish(allDishes, dishObjectId);
    dishWithId.amount = 0;
    dishWithId.orderSum = 0;
    let indexOfDishObjectInOrders = getIndexOfDishInBasket(orders, dishObjectId);

    if (indexOfDishObjectInOrders != -1) {
        orders.splice(indexOfDishObjectInOrders, 1);
    }

    renderBasket(orders, basketOrderSection);
    renderBasket(orders, mobileBasketOrderSection);

    saveToLocalStorage();
}

function subAmount(dishObjectId) {
    let dishWithId = getCurrentDish(allDishes, dishObjectId);
    dishWithId.amount--;

    if (dishWithId.amount == 0) {
        deleteFromBasket(dishObjectId);
    }

    renderBasket(orders, basketOrderSection);
    renderBasket(orders, mobileBasketOrderSection);

    saveToLocalStorage();
}

function addAmount(dishObjectId) {
    addToBasket(dishObjectId);
}

function toggleDisplayNone(element) {
    element.classList.toggle("d_none");
}

function showMobileBasket() {
    toggleDisplayNone(mobileBasketContainer);
    window.scrollTo(0, 0);
}

function closeMobileBasket() {
    toggleDisplayNone(mobileBasketContainer);
}

function clearBasket() {
    orders = [];
    renderBasket(orders, basketOrderSection);
    renderBasket(orders, mobileBasketOrderSection);
}

function orderDishes() {
    window.location.href = "../assets/pages/ordered.html";
    clearBasket();
    localStorage.clear();
}

function closeDialog() {
    window.location.href = "../../index.html";
}
