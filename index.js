"use strict";
// Models
class Payer {
  constructor(element, totalincome) {
    (this.income = element.value),
      (this.incomeShare = this.income / totalincome),
      (this.burden = 0);
  }
}

class Bill {
  constructor(element) {
    this.cost = element.value;
  }
}

//Get and Store Info
let costElementList = document.querySelectorAll(".cost");
let incomeElementList = document.querySelectorAll(".income");
let burdenElementList = document.querySelectorAll(".burden");

//Function that initializes Bill objects and returns an array of all newly created bills
function fetchBills() {
  let bills = [];

  for (let billElement of costElementList) {
    bills.push(new Bill(billElement));
    console.log(billElement);
  }

  return bills;
}

//Function that initializes Payer objects and returns an array of all newly created payers
function fetchPayers() {
  let payers = [];
  let total = 0;

  for (let incomeElement of incomeElementList) {
    total += Number(incomeElement.value);
  }

  for (let incomeElement of incomeElementList) {
    payers.push(new Payer(incomeElement, total));
    console.log("Income Value:" + incomeElement.value);
  }

  return payers;
}

// Function that updates the burden/output text content for each payer
function displayFinancials(payers) {
  for (let x = 0; x < burdenElementList.length; x++) {
    console.log(payers[x].burden);

    if (isNaN(payers[x].burden) || payers[x].income == 0) {
      burdenElementList[x].textContent = "";
    } else if (payers[x].burden > payers[x].income) {
      burdenElementList[x].textContent = "Need more Income";
    } else {
      burdenElementList[x].textContent =
        "Pay: $" + Math.round(payers[x].burden * 100) / 100;
    }
  }
}

/* Function to be called to calculate billshare each time any values are changed.
Currently creates full arrays of new Bill and Payer Objects to achieve this, this isn't optimal for memory/performance purposes
*/
function calculate(bills, payers) {
  for (let bill of bills) {
    for (let Payer of payers) {
      Payer.burden += bill.cost * Payer.incomeShare;
    }
  }
}

let payers = fetchPayers();
let bills = fetchBills();

calculate(bills, payers);

let mainElement = document.querySelector("main");

mainElement.addEventListener("change", function () {
  const payers = fetchPayers();

  calculate(fetchBills(), payers);
  displayFinancials(payers);
});
