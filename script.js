"use strict";

const totalBill = document.getElementById("bill");
const tipButton1 = document.getElementById("tip-btn1");
const tipButton2 = document.getElementById("tip-btn2");
const tipButton3 = document.getElementById("tip-btn3");
const tipButton4 = document.getElementById("tip-btn4");
const tipButton5 = document.getElementById("tip-btn5");
const customTip = document.getElementById("custom-tip");
const numberOfPeople = document.getElementById("people-number");
const tipAmountPerPerson = document.querySelector(".tip-amount .result");
const totalAmountPerPerson = document.querySelector(".total-amount .result");
const resetButton = document.querySelector(".reset");
const feedback = document.querySelectorAll(".invalid-feedback");

const tips = {
  tip1: parseInt(tipButton1.value),
  tip2: parseInt(tipButton2.value),
  tip3: parseInt(tipButton3.value),
  tip4: parseInt(tipButton4.value),
  tip5: parseInt(tipButton5.value),
};

//Error State Function
const errorState = (inpt) => {
  let invalidFeedback = inpt.closest(".col-12").querySelector(".invalid-feedback");
  if (!inpt.value) {
    invalidFeedback.textContent = "Please enter proper value";
    inpt.classList.add("error");
  } else if (inpt.value == 0) {
    invalidFeedback.textContent = "Can't be zero";
    inpt.classList.add("error");
  } else {
    invalidFeedback.textContent = "";
    resetButton.classList.remove("disabled");
    resetButton.classList.add("clicked");
    return true;
  }
  tipAmountPerPerson.textContent = `$0.00`;
  totalAmountPerPerson.textContent = `$0.00`;
};


//***Reset function////////////////////////////////

const resetResults = () => {
  if (!resetButton.classList.contains("disabled")) {
    resetButton.onclick = () => {
      totalBill.value = "";
      numberOfPeople.value = "";
      customTip.value = "";
      feedback.forEach((msg) => {
        msg.textContent = "";
      });
      tipAmountPerPerson.textContent = `$0.00`;
      totalAmountPerPerson.textContent = `$0.00`;
      resetButton.classList.add("disabled");
      resetButton.classList.remove("clicked");
    };
  } else {
    return false;
  }
};


//****Calculate function////////////////////////////////
const calculateResults = (tipValue) => {
  let tip = tipValue / 100;
  let billAmount = totalBill.value;
  let persons = numberOfPeople.value;
  let finalTips = (billAmount * tip) / persons;
  let total = billAmount / persons + finalTips;
  if (totalBill && numberOfPeople) {
    tipAmountPerPerson.textContent = `$${finalTips.toFixed(2.5)}`;
    totalAmountPerPerson.textContent = `$${total.toFixed(2.5)}`;
  }
  errorState(totalBill);
  errorState(numberOfPeople);
};

//**Buttons styling////////////////////////////////





//**Events////////////////////////////////
tipButton1.addEventListener("click", () => {
  calculateResults(tips.tip1);
});
tipButton2.addEventListener("click", () => {
  calculateResults(tips.tip2);
});
tipButton3.addEventListener("click", () => {
  calculateResults(tips.tip3);
});
tipButton4.addEventListener("click", () => {
  calculateResults(tips.tip4);
});
tipButton5.addEventListener("click", () => {
  calculateResults(tips.tip5);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateResults(customTip.value);
  }
});
resetButton.addEventListener("click", () => {
  resetResults();
}); 
