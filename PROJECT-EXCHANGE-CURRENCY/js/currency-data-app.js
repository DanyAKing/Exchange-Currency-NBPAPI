/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */

// const showError = document.querySelector("body");

class Currency {
  constructor(date) {
    this.actualDate = date;
    this.currencyName = [];
    this.currencyCode = [];
    this.currencyMid = [];
  }

  capitalizeName() {
    this.currencyName = this.currencyName
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1));
  }

  getCurrencyName(id) {
    return this.currencyName[id];
  }

  getCurrencyCode(id) {
    return this.currencyCode[id];
  }

  getCurrencyMid(id) {
    return this.currencyMid[id];
  }

  exchangePLNToCurrency(value, id) {
    return (value / this.currencyMid[id]).toFixed(2);
  }

  exchangeCurrencyToPLN(value, id) {
    return (value * this.currencyMid[id]).toFixed(2);
  }
}

// const error = () => {
//   removeChild(showError);
//   const errorMessage = document.createElement("h1");
//   errorMessage.innerText = "Somethinks went wrong. Please try again";
//   showError.appendChild(errorMessage);
// };

const currencyBase = new Currency();

(async () => {
  const response = await fetch("http://api.nbp.pl/api/exchangerates/tables/A");
  const data = await response.json();
  const date = data[0].effectiveDate;
  currencyBase.actualDate = date;
  const currency = data[0].rates;
  for (const element of currency) currencyBase.currencyName.push(element.currency);
  for (const element of currency) currencyBase.currencyCode.push(element.code);
  for (const element of currency) currencyBase.currencyMid.push(element.mid);

  currencyBase.capitalizeName();
})();

// ograniczenie dla inputu - można wpisywać ledynie liczby
// const getInputValue = document.querySelector('.exchange-input-field');
// const inputValue = getInputValue.value;
