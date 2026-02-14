const balance = document.getElementById("balance"),
    moneyPlus = document.getElementById("moneyPlus"),
    moneyMinus = document.getElementById("moneyMinus"),
    form = document.getElementById("form"),
    text = document.getElementById("text"),
    amount = document.getElementById("amount"),
    date = document.getElementById("date"),
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
        amount: Number(amount.value),
        date: date.value,
        type: selectedType
    };
    // addTransactionDom(transtion);

    // console.log(text.value,amount.value)
    
    // const transtion = {text: text.value,amount: amount.value};
    
    transactions.push(transtion) // dito ipupush nya yung varalble papunta sa emthy list
    addTransactionDom(transtion); // tatawaging yung funtion na gumagawa ng li
    console.log(transactions)

    updateTransaction() //tatawagin si (total,income,expenses)

    clickRemove()


}


// para magaron ng number yung id randomly
function generateID() {
    return Math.floor(Math.random() * 100000000)
}


function addTransactionDom(transtion) {
    const simbol = transtion.type === "plus" ? `<i class="fa-solid fa-arrow-trend-up"></i>` : `<i class="fa-solid fa-arrow-trend-down"></i>`;
    const color = transtion.type === "plus" ? "up" : "down" ;
    const sign = transtion.type === "plus" ? "+" : "-" ; // short sya nung if else (? is else)
    const item = document.createElement("li")

    item.classList.add(transtion.type === "plus" ? "plus" : "minus") // for color on the border line

    item.innerHTML = `<div class="resibo">
  <div class="left">
    <div class="simbol ${color}">
      ${simbol}
    </div>
    <div class="info">
      <strong>${transtion.text}</strong><br>
          <small>${transtion.date}</small>
    </div>   
  </div>
  <div class="right">
    <span>${sign} ₱${Math.abs(transtion.amount)}</span>
    <button class="delete" onclick="removeTransaction(${transtion.id})">x</button>
  </div>
</div>`;

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
// function updateTransaction() {
//     const amounts = transactions.map((transaction) => Number(transaction.amount)); // convert into number (lahat ng papasok sa transaction ay magiging amount)

//     // .reduce == para magcalculate at pagsamasamahin
//     //.filter == para syang if statement 
//     // toFixed(2) ay mag convert number into str and make it into decemal (pababaliking paramagamit masulat ulit)


//     // Calculate total
//     // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);  
//     // toFixed - para magdisplay ng decimal at maconvert it into string

//     // console.log(total);

//     // const income = selectedType === "plus" ?  amount.reduce((acc, item) => (acc += item),0) // (calculator) pag add lahat para mag total
//     //     .toFixed(2): "0.00";
//     // income
//     // const income = amounts 
//         // .filter((item) => item > 0) // ififilter nya kung mas malaki ba yun sa 0 (keep only positive)
        
//         // .reduce((acc, item) => (acc += item),0) // (calculator) pag add lahat para mag total
//         // .toFixed(2)
    
//     // expense
//     // const expense = selectedType === "minus" ?(
//     //     amounts.reduce((acc, item) => (acc += item), 0) * 
//     //     -1
//     // ).toFixed(2): "0.00";

//     // console.log(amounts, total, income, expense)


//     if (selectedType === "plus") {
//         const Income = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
//         moneyPlus.innerHTML=`₱${Income}`;
//         const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
//         balance.innerHTML=`₱${total}`;
//     } else if (selectedType === "minus") {
//         const Expenses = (amounts.reduce((acc, item) => (acc += item), 0) * 
//         -1).toFixed(2);
//         moneyMinus.innerHTML=`₱${Expenses}`;
//         const total = (amounts.reduce((acc, item) => (acc += item), 0) * 
//         -1).toFixed(2);
//         balance.innerHTML=`₱${total}`;
//     }

//     // para isulat sa html
//     balance.innerHTML=`₱${total}`; // para sa balance
//     // moneyPlus.innerHTML=`₱${Income}`; // para sa income
//     // moneyMinus.innerHTML=`₱${Expenses}`; // para sa expense
// }

// para palabasin yung (total,income,expenses)
function updateTransaction() {
    // Income
    const totalIncome = transactions
        .filter(t => t.type === "plus")
        .reduce((acc, t) => acc + t.amount, 0);

    //  Expenses
    const totalExpenses = transactions
        .filter(t => t.type === "minus")
        .reduce((acc, t) => acc + t.amount, 0);

    // Balance
    const totalBalance = totalIncome - totalExpenses;

    // para isulat sa html
    moneyPlus.innerHTML = `₱${totalIncome.toFixed(2)}`;
    moneyMinus.innerHTML = `₱${totalExpenses.toFixed(2)}`;
    balance.innerHTML = `₱${totalBalance.toFixed(2)}`;
}




const filterLinks = document.querySelectorAll("#filter a");

filterLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        filterLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        const filterValue = link.getAttribute("data-filter");
        renderFilteredTransactions(filterValue);
    });
});

function renderFilteredTransactions(filterType) {
    list.innerHTML = "";

    const filtered = transactions.filter(t => {
        if (filterType === "all") return true;
        if (filterType === "income") return t.type === "plus";
        if (filterType === "expense") return t.type === "minus";
    });

    if (filtered.length === 0) {
        list.innerHTML = "<li>No matching entries found</li>";
        return;
    }

    filtered.forEach(addTransactionDom);
}
