"use strict";
// Models
class Person {
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
let billElementList = document.querySelectorAll(".bill");
let incomeElementList = document.querySelectorAll(".income");
let burdenElementList = document.querySelectorAll(".burden");

function createBills() {
  let bills = [];

  for (let billElement of billElementList) {
    bills.push(new Bill(billElement));
  }

  return bills;
}

function createPeople() {
  let people = [];
  let total = 0;

  for (let incomeElement of incomeElementList) {
    total += Number(incomeElement.value);
  }

  for (let incomeElement of incomeElementList) {
    people.push(new Person(incomeElement, total));
  }

  return people;
}

function displayFinancials(people) {
  //let billElementList = document.querySelectorAll(".bill");
  console.log(burdenElementList);

  for (let x = 0; x < burdenElementList.length; x++) {
    console.log(people[x].burden);
    burdenElementList[x].textContent =
      "$" + Math.round(people[x].burden * 100) / 100;
  }
}

function calculate(bills, people) {
  for (let bill of bills) {
    for (let person of people) {
      person.burden += bill.cost * person.incomeShare;
    }
  }
}

let people = createPeople();
let bills = createBills();

calculate(bills, people);

let mainElement = document.querySelector("main");

mainElement.addEventListener("change", function () {
  const people = createPeople();

  calculate(createBills(), people);
  displayFinancials(people);
});
