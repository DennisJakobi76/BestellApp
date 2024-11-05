function renderDishObject(dishObject) {
    let price = dishObject.price.toFixed(2).replace(".", ",");

    return `<div
                class="dish-container"
                id="dish-container${dishObject.id}"
				onclick="addToBasket(${dishObject.id})"
            >
            <div class="dish-name-and-plus-container">
                <h2 id="dish-name${dishObject.id}">${dishObject.name}</h2>
                <div class="plus-container">
                    <span class="dishes-plus">&#43</span>
                </div>
            </div>
                <p id="dish-description-text${dishObject.id}">${dishObject.description}</p>
                <p
                    id="dish-price${dishObject.id}"
                    class="dish-price"
                >
                    ${price} €
                </p>
            </div>`;
}

function renderBasketDishObject(dishObject) {
    dishObject.orderSum = dishObject.amount * dishObject.price;
    let price = dishObject.orderSum.toFixed(2).replace(".", ",");
    let retValue = "";

    if (dishObject.amount > 0) {
        retValue = `<div id="basket-dish-object-container${dishObject.id}" class="basket-dish-object-container">
                                <h3 class="bakset-dish-headline">${dishObject.name}</h3>
                                <div class="basket-dish-order-container">
                                    <table class="basket-dish-order-table">
                                        <tr id="basket-tr${dishObject.id}">
                                            <td id="basket-minus${dishObject.id}" class="basket-plus-minus high-minus" onclick="subAmount(${dishObject.id})">&#45</td>
                                            <td id="basket-amount${dishObject.id}">${dishObject.amount}x</td>
                                            <td id="basket-plus${dishObject.id}" class="basket-plus-minus" onclick="addAmount(${dishObject.id})">&#43</td>
                                            <td id="basket-sum${dishObject.id}">${price} €</td>
                                            <td id="basket-trashcan${dishObject.id}">
                                                <div id="trash-container${dishObject.id}" class="trash-img-container">
                                                    <img 
                                                        id="basket-trash-img${dishObject.id}" 
                                                        src="./assets/icons/trashcan.png" 
                                                        alt="Mülltonnen-Symbol" 
                                                        onclick="deleteFromBasket(${dishObject.id})"/>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>`;
    }
    return retValue;
}

function renderBillSection() {
    return `<div class="sum-container">
                                <div class="sum-text"><span>Zwischensumme</span></div>
                                <div
                                    class="sum-value"
                                >
                                    <span class="basket-sum-value"></span>
                                </div>
                            </div>
                            <div class="delivery-container">
                                <div class="delivery-text"><span>Lieferkosten</span></div>
                                <div 
                                    class="delivery-value"
                                >
                                    <span id="basket-delivery-value">5,00 €</span>
                                </div>
                            </div>
                            <div class="total-container">
                                <div class="total-text"><span>Gesamt</span></div>
                                <div
                                    class="total-value"
                                >
                                    <span class="basket-total-value"></span>
                                </div>
                            </div>`;
}
