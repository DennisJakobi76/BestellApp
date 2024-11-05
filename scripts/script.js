const mainDishSection = document.getElementById("main-dish-section");
const dessertSection = document.getElementById("dessert-section");
const basketOrderSection = document.getElementById("basket-order-section");
const basketBillSection = document.getElementById("basket-bill-section");

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
    let dishWithId = getCurrentDish(allDishes, dishObjectId);
    dishWithId.amount++;

    let indexOfDishObjectInOrders = getIndexOfDishInBasket(orders, dishObjectId);

    if (indexOfDishObjectInOrders == -1) {
        orders.push(dishWithId);
    } else {
        let currentObj = orders.find((obj) => obj.id == dishWithId.id);
        currentObj.amount = dishWithId.amount;
    }

    renderBasket(orders);

    saveToLocalStorage();
}

function checkShowBillSection(array, element) {
    if (array.length == 0) {
        element.classList.add("d_none");
    } else if (array.length > 0) {
        element.classList.remove("d_none");
        element.innerHTML = renderBillSection();
        let basketSumField = document.getElementById("basket-sum-value");
        let basketTotalField = document.getElementById("basket-total-value");
        let sum = calculateBill(orders);
        basketSumField.innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
        let total = calculateTotal(sum, 5);
        basketTotalField.innerHTML = `${total.toFixed(2).replace(".", ",")} €`;
    }
}

function renderBasket(array) {
    basketOrderSection.innerHTML = "";

    if (array.length > 0) {
        for (i = 0; i < array.length; i++) {
            basketOrderSection.innerHTML += renderBasketDishObject(array[i]);
        }
    }

    checkShowBillSection(orders, basketBillSection);
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

    renderBasket(orders);

    saveToLocalStorage();
}

function subAmount(dishObjectId) {
    let dishWithId = getCurrentDish(allDishes, dishObjectId);
    dishWithId.amount--;

    if (dishWithId.amount == 0) {
        deleteFromBasket(dishObjectId);
    }

    renderBasket(orders);

    saveToLocalStorage();
}

function addAmount(dishObjectId) {
    addToBasket(dishObjectId);
}
