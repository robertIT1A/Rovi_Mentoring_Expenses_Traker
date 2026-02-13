const balance = document.getElementById("balance"),
    moneyPlus = document.getElementById("moneyPlus"),
    moneyMinus = document.getElementById("moneyMinus"),
    form = document.getElementById("form"),
    text = document.getElementById("text"),
    amount = document.getElementById("amount"),
    filter = document.getElementById("filter"),
    list = document.getElementById("list"),
    Income = document.getElementById("Income"),
    Expenses = document.getElementById("Expenses"),
    submit = document.getElementById("submit");


let transactions = [];


let selectedType = "plus";


document.getElementById(`Income`).addEventListener('click', () => {
    Income.classList.add('active');
    Expenses.classList.remove('active');
    selectedType = "plus";
    });

document.getElementById(`Expenses`).addEventListener('click', () => {
    Expenses.classList.add('active');
    Income.classList.remove('active');
    selectedType = "minus";
});

form.addEventListener("submit", addTransaction);
function addTransaction(e) {
    e.preventDefault();

    const sign = selectedType === "plus" ? "+" : "-";
    
    console.log(`adding ${sign}$amount.value`);
    

    const transtion = {
        id: generateID(), 
        text: text.value,
        amount: amount.value
    };
    // addTransactionDom(transtion);

    // console.log(text.value,amount.value)
    
    // const transtion = {text: text.value,amount: amount.value};
    
    transactions.push(transtion) // dito ipupush nya yung varalble papunta sa emthy list
    addTransactionDom(transtion); // tatawaging yung funtion na gumagawa ng li
    console.log(transactions)

    updateTransaction() //tatawagin si (total,income,expenses)




}


// para magaron ng number yung id randomly
function generateID() {
    return Math.floor(Math.random() * 100000000)
}


function addTransactionDom(transtion) {
    const simbol = selectedType === "plus" ? `<i class="fa-solid fa-arrow-trend-up"></i>` : `<i class="fa-solid fa-arrow-trend-down"></i>`;
    const color = selectedType === "plus" ? "up" : "down" ;
    const sign = selectedType === "plus" ? "+" : "-" ; // short sya nung if else (? is else)
    const item = document.createElement("li")

    item.innerHTML = `<div class="simbol ${color}">
              ${simbol}
            </div>${transtion.text}<span>${sign} ₱${Math.abs(transtion.amount)}</span>
    <button class="delete" onclick="removeTransaction(${transtion.id})">x<button>`;

    list.appendChild(item)
}

// {/* <div><span>${sign} ₱${Math.abs(transtion.amount)}</span></div> */}


function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id)
    console.log(id);
    clickRemove()
}

function clickRemove(){
    list.innerHTML="";//remove ""wala na laman

    // para pag nagdelete ka lahat ay lilitaw yung (No transaction)
    if (transactions.length == 0) { //yung length ay yung bilang nung transaction sa loob
        const item = document.createElement('li'); //create
        item.innerHTML = "No Transaction" // isusulat
        list.appendChild(item) //location 
    }

    transactions.forEach(addTransactionDom); // para di maremove lahat 
}


// para palabasin yung (total,income,expenses)
function updateTransaction() {
    const amounts = transactions.map((transaction) => Number(transaction.amount)); // convert into number (lahat ng papasok sa transaction ay magiging amount)

    // .reduce == para magcalculate at pagsamasamahin
    //.filter == para syang if statement 
    // toFixed(2) ay mag convert number into str and make it into decemal (pababaliking paramagamit masulat ulit)


    // Calculate total
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);  
    // toFixed - para magdisplay ng decimal at maconvert it into string

    // console.log(total);

    const sign = selectedType === "plus" ? "+" : "-" ;
    // income
    const income = amounts 
        // .filter((item) => item > 0) // ififilter nya kung mas malaki ba yun sa 0 (keep only positive)
        
        .reduce((acc, item) => (acc += item),0) // (calculator) pag add lahat para mag total
        .toFixed(2)
    
    // expense
    const expense = (
        amounts.reduce((acc, item) => (acc += item), 0) * 
        -1
    ).toFixed(2);

    // console.log(amounts, total, income, expense)


    // para isulat sa html
    balance.innerHTML=`₱${total}`; // para sa balance
    moneyPlus.innerHTML=`₱${income}`; // para sa income
    moneyMinus.innerHTML=`₱${expense}`; // para sa expense
}
