function reset(containerId) {
    if (containerId) {
        const container = document.getElementById(containerId);
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        const selects = container.querySelectorAll('select');
        selects.forEach(select => select.selectedIndex = 0);
    } else {
        // Default to clearing Add-Money for backward compatibility
        const bank = document.getElementById("select-bank");
        if (bank) bank.selectedIndex = 0;
        const account = document.getElementById("account-number");
        if (account) account.value = "";
        const amount = document.getElementById("amount-to-add");
        if (amount) amount.value = "";
        const pin = document.getElementById("pin-number");
        if (pin) pin.value = "";
    }
}
function displayNone(){
    const forms = document.querySelectorAll(".form-container");
    forms.forEach(form => {
        form.style.display = "none";
    });
}
function defaultCard(){
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.color = "black";
        card.style.border = "none";
    });
}
function addTransactionToHistory(type, amount, details) {
    const transactionContainer = document.getElementById("Transactions-Container");
    const transactionCard = document.createElement("div");
    const date = new Date("2025-08-27").toLocaleString();  // Using the provided current date
    transactionCard.className = "card flex flex-row bg-base-100 shadow-sm w-[50%] mx-auto items-center";
    transactionCard.innerHTML = `
        <img src = "assets/transaction1.png" alt="${type} transaction" class="mr-4 ml-4">
        <div class="px-5">
            <h3 class="font-bold">${type}</h3>
            <p>Amount: $${amount}</p>
            <p>Details: ${details}</p>
            <p>Date: ${date}</p>
        </div>
    `;
    transactionContainer.appendChild(transactionCard);
}
displayNone();
document.getElementById("add-money-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const balance = document.getElementById("balance");
    const bankBalance = parseInt(balance.innerText.replace('$', ''));
    const containerId = "Add-Money-Container";
    const bank = document.querySelector(`#${containerId} #select-bank`).value;
    const accountNumber = document.querySelector(`#${containerId} #account-number`).value;
    const amountToAdd = parseInt(document.querySelector(`#${containerId} #amount-to-add`).value);
    const pinNumber = document.querySelector(`#${containerId} #pin-number`).value;
    if (amountToAdd > 0) {
        const newBalance = bankBalance + amountToAdd;
        balance.innerText = `$${newBalance}`;
        addTransactionToHistory("Add Money", amountToAdd, `From ${bank}, Account: ${accountNumber}, Pin: ${pinNumber}`);
        reset(containerId);
    }else{
        alert("Please enter a valid amount.");
        document.querySelector(`#${containerId} #amount-to-add`).value = "";
    }
});
const cards = document.querySelectorAll(".card");
for (const card of cards) {
    card.addEventListener("click", function() {
        displayNone();
        document.getElementById(`${card.id}-Container`).style.display = "block";
        defaultCard();
        document.getElementById(`${card.id}`).style.color = "blue";
        document.getElementById(`${card.id}`).style.border = "2px solid blue";
    });
}
document.getElementById("withdraw-money-btn").addEventListener("click", function(event){
    event.preventDefault();
    const balance = document.getElementById("balance");
    const bankBalance = parseInt(balance.innerText.replace('$', ''));
    const containerId = "Cashout-Container";
    const agentNumber = document.querySelector(`#${containerId} #account-number`).value;
    const amountToWithdraw = parseInt(document.querySelector(`#${containerId} #amount-to-send`).value);
    const pinNumber = document.querySelector(`#${containerId} #pin-number`).value;
    if (amountToWithdraw > 0 && amountToWithdraw <= bankBalance) {
        const newBalance = bankBalance - amountToWithdraw;
        balance.innerText = `$${newBalance}`;
        addTransactionToHistory("Cashout", amountToWithdraw, `To Agent: ${agentNumber}, Pin: ${pinNumber}`);
        alert("Successful");
        reset(containerId);
    } else {
        alert("Please enter a valid amount.");
        document.querySelector(`#${containerId} #amount-to-send`).value = "";
    }
});
document.getElementById("transfer-money-btn").addEventListener("click", function(event){
    event.preventDefault();
    const balance = document.getElementById("balance");
    const bankBalance = parseInt(balance.innerText.replace('$', ''));
    const containerId = "Transfer-Money-Container";
    const accountNumber = document.querySelector(`#${containerId} #account-number`).value;
    const amountToTransfer = parseInt(document.querySelector(`#${containerId} #amount-to-add`).value);
    const pinNumber = document.querySelector(`#${containerId} #pin-number`).value;
    if (amountToTransfer > 0 && amountToTransfer <= bankBalance) {
        const newBalance = bankBalance - amountToTransfer;
        balance.innerText = `$${newBalance}`;
        addTransactionToHistory("Transfer Money", amountToTransfer, `To Account: ${accountNumber}, Pin: ${pinNumber}`);
        alert("Successful");
        reset(containerId);
    } else {
        alert("Please enter a valid amount.");
        document.querySelector(`#${containerId} #amount-to-add`).value = "";
    }
});
const getBonusButton = document.querySelector("#Get-Bonus-Container button");
getBonusButton.addEventListener("click", function(event){
    event.preventDefault();
    const balance = document.getElementById("balance");
    const bankBalance = parseInt(balance.innerText.replace('$', ''));
    const containerId = "Get-Bonus-Container";
    const coupon = document.querySelector(`#${containerId} #bonus-coupon`).value;
    let bonusAmount = 0;
    if (coupon === "BONUS100") {
        bonusAmount = 100;
    } // Add more coupons if needed
    if (bonusAmount > 0) {
        const newBalance = bankBalance + bonusAmount;
        balance.innerText = `$${newBalance}`;
        addTransactionToHistory("Get Bonus", bonusAmount, `Coupon: ${coupon}`);
        alert("Successful");
        reset(containerId);
    } else {
        alert("Invalid coupon.");
        document.querySelector(`#${containerId} #bonus-coupon`).value = "";
    }
});
const payBillButton = document.querySelector("#Pay-Bill-Container button");
payBillButton.addEventListener("click", function(event){
    event.preventDefault();
    const balance = document.getElementById("balance");
    const bankBalance = parseInt(balance.innerText.replace('$', ''));
    const containerId = "Pay-Bill-Container";
    const bank = document.querySelector(`#${containerId} #select-bank`).value;
    const agentNumber = document.querySelector(`#${containerId} #account-number`).value;
    const amountToPay = parseInt(document.querySelector(`#${containerId} #amount-to-add`).value);
    const pinNumber = document.querySelector(`#${containerId} #pin-number`).value;
    if (amountToPay > 0 && amountToPay <= bankBalance) {
        const newBalance = bankBalance - amountToPay;
        balance.innerText = `$${newBalance}`;
        addTransactionToHistory("Pay Bill", amountToPay, `To ${bank}, Agent: ${agentNumber}, Pin: ${pinNumber}`);
        alert("Successful");
        reset(containerId);
    } else {
        alert("Please enter a valid amount.");
        document.querySelector(`#${containerId} #amount-to-add`).value = "";
    }
});