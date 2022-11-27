const createSelectedOption = document.querySelector('.create-selected-option');
const createExchange = document.querySelector('.exchange');
const exchangeResult = document.querySelector('.exchange-result');
const resultParagraf = document.querySelector('.result');

// funkcja dla stworzenia opcji wybroru po NAZWIE waluty
const createSelectByFullName = () => {
  // tworzenie etykiety
  const createLabel = document.createElement('label');
  createLabel.setAttribute('for', 'select-by-name');
  createLabel.classList.add('label');
  createLabel.innerText = 'Wybierz walute po nazwie:';

  createSelectedOption.appendChild(createLabel);

  // tworzenie selectu
  const createSelect = document.createElement('select');
  createSelect.classList.add('create-select-by-name', 'select-frame');
  createSelect.setAttribute('id', 'select-by-name');
  createSelect.setAttribute('onchange', 'selectFullName()');

  createSelectedOption.appendChild(createSelect);

  // łapanie selectu dla opcji
  const currencyFullName = document.querySelector('.create-select-by-name');

  // tworzenie opcji
  const newOption = document.createElement('option');
  newOption.innerText = 'Wybierz...';
  currencyFullName.appendChild(newOption);

  let id = 0;
  for (const name of actuallyCurrency.currencyName) {
    const newOption = document.createElement('option');
    newOption.innerText = name;
    newOption.value = id++;
    currencyFullName.appendChild(newOption);
  }
};

// funkcja dla stworzenia opcji wybroru po KODZIE waluty
const createSelectByCode = () => {
  // tworzenie etykiety
  const createLabel = document.createElement('label');
  createLabel.setAttribute('for', 'select-by-code');
  createLabel.classList.add('label');
  createLabel.innerText = 'Wybierz walute po kodzie:';

  createSelectedOption.appendChild(createLabel);

  // tworzenie selectu
  const createSelect = document.createElement('select');
  createSelect.classList.add('create-select-by-code', 'select-frame');
  createSelect.setAttribute('id', 'select-by-code');
  createSelect.setAttribute('onchange', 'selectByCode()');

  createSelectedOption.appendChild(createSelect);

  // łapanie selectu dla opcji
  const currencyFullName = document.querySelector('.create-select-by-code');

  // tworzenie opcji
  const newOption = document.createElement('option');
  newOption.innerText = 'Wybierz...';
  currencyFullName.appendChild(newOption);

  const id = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const code of actuallyCurrency.currencyCode) {
    const newOption = document.createElement('option');
    newOption.innerText = code;
    newOption.value = id + 1;
    currencyFullName.appendChild(newOption);
  }
};

// chwytanie value wyboru nazwy waluty lub kodu
const selectCurrencyOrCode = () => {
  const selectElement = document.querySelector('.select-currency-or-code').value;

  showSelectedOption(selectElement);
};

// usuwanie dzieci podczas wyboru
const removeChild = (item) => {
  const removeElement = item;
  console.log(removeElement);
  while (removeElement.firstChild) {
    removeElement.removeChild(removeElement.firstChild);
  }
};

// tworzenie opcji dla wyboru nazwy waluty lub kodu
const showSelectedOption = (selectElement) => {
  if (selectElement === 'currency') {
    removeChild(createSelectedOption);
    removeChild(createExchange);
    removeChild(exchangeResult);
    createSelectByFullName();
  } else if (selectElement === 'code') {
    removeChild(createSelectedOption);
    removeChild(createExchange);
    removeChild(exchangeResult);

    createSelectByCode();
  } else if (selectElement === 'empty') {
    removeChild(createSelectedOption);
    removeChild(createExchange);
    removeChild(exchangeResult);
  }
};

// chwytanie id nawy waluty (id przypisywane analogicznie wraz z indeksem w tablicy)
const selectFullName = () => {
  const selectName = document.querySelector('.create-select-by-name').value;

  if (selectName !== undefined) createExchangeByNameInterface(selectName);

  return selectName;
};

// chwytanie id kodu waluty (id przypisywane analogicznie wraz z indeksem w tablicy)
const selectByCode = () => {
  const selectCode = document.querySelector('.create-select-by-code').value;

  if (selectCode !== undefined) createExchangeByCodeInterface(selectCode);

  return selectCode;
};

// stworzenie dzeci dla pola exchange opcji nazwy waluty
const createExchangeByNameInterface = (id) => {
  removeChild(createExchange);

  // stworzenie form
  const createForm = document.createElement('form');
  createForm.classList.add('exchange-form');
  createExchange.appendChild(createForm);

  // złapanie form
  const createChildrenForm = document.querySelector('.exchange-form');

  // stworzenie paragrafu w form
  const createParagraph = document.createElement('p');
  createParagraph.classList.add('currency-name');
  createParagraph.innerText = `${actuallyCurrency.getCurrencyName(id)} - kurs z dnia 
  ${actuallyCurrency.actualDate} wynosi ${actuallyCurrency.getCurrencyMid(id)}`;
  createChildrenForm.appendChild(createParagraph);

  // stworzenie inputu w form
  const createInput = document.createElement('input');
  createInput.classList.add('exchange-input-field');
  createInput.setAttribute('placeholder', 'PLN');
  createInput.setAttribute('type', 'number');
  createChildrenForm.appendChild(createInput);
  // złapanie inputu, do którego jest wprowadzana wartość
  const exchangeValue = document.querySelector('.exchange-input-field');

  // stworzenie button zamiany waluty
  const createButton = document.createElement('button');
  createButton.classList.add('exchange-btn');
  createButton.setAttribute('type', 'submit');
  createButton.setAttribute('value', '1');
  createButton.innerText = `Przelicz na ${actuallyCurrency.currencyName[id]}`;
  createChildrenForm.appendChild(createButton);
  // złapanie button zamiany waluty
  const exchangeAction = document.querySelector('.exchange-btn');

  // stworzenie button zamiany stron przeliczenia
  const createButtonPageChange = document.createElement('button');
  createButtonPageChange.className = 'page-change-btn';
  createButtonPageChange.setAttribute('type', 'button');
  createButtonPageChange.innerText = 'Zamień strony';
  createChildrenForm.appendChild(createButtonPageChange);
  // złapanie button zmiany stron przeliczenia
  const pageChange = document.querySelector('.page-change-btn');

  // stworzenie paragrafu z wynikiem
  const createResultParagraph = document.createElement('p');
  createResultParagraph.classList.add('result');
  resultParagraf.appendChild(createResultParagraph);
  // złapanie paragrafu z wynikiem
  const showResult = document.querySelector('.result');

  // zdarzenie przycisku przelicz
  exchangeAction.addEventListener('click', (event) => {
    // funkcja pozwalająca uniknąć przeładowania strony po wykonaniu submitu - (button type="submit")
    event.preventDefault();
    removeChild(exchangeResult);
    // pobranie wartości value - przełącznik stron przeliczenia
    const exchangeSide = exchangeAction.value;
    // przypisanie wartości z inputu
    const { value } = exchangeValue;
    // chwytanie id nawy waluty - indeks analogiczny do indeksu kursu
    const id = selectFullName();

    const exchangeToPLN = `${actuallyCurrency.exchangePLNToCurrency(value, id)} ${actuallyCurrency.currencyCode[id]}`;
    const exchangeFromPLN = `${actuallyCurrency.exchangeCurrencyToPLN(value, id)} PLN`;

    exchangeSide === '1' ? showResult.innerText = exchangeToPLN : showResult.innerText = exchangeFromPLN;
  });

  pageChange.addEventListener('click', () => {
    const getButtonValue = document.querySelector('.exchange-btn');
    const getInput = document.querySelector('.exchange-input-field');
    const textContent = actuallyCurrency.currencyName[id];

    if (getButtonValue.value === '1') {
      getButtonValue.setAttribute('value', '2');
    } else if (getButtonValue.value === '2') {
      // getInput.setAttribute('placeholder', textContent);
      // getButtonValue.innerText = 'Przelicz na PLN';
      getButtonValue.setAttribute('value', '1');
    }
  });
};

// stworzenie dzieci dla pola exchange opcji kodu waluty
const createExchangeByCodeInterface = (id) => {
  removeChild(createExchange);
  // stworzenie form
  const createForm = document.createElement('form');
  createForm.classList.add('exchange-form');
  createExchange.appendChild(createForm);
  // złapanie form
  const createChildrenForm = document.querySelector('.exchange-form');

  // stworzenie paragrafu w form
  const createParagraph = document.createElement('p');
  createParagraph.classList.add('currency-name');
  createParagraph.innerText = `${actuallyCurrency.getCurrencyName(id)} - kurs z dnia ${actuallyCurrency.actualDate} wynosi ${actuallyCurrency.getCurrencyMid(id)}`;
  createChildrenForm.appendChild(createParagraph);

  // stworzenie inputu w form
  const createInput = document.createElement('input');
  createInput.classList.add('exchange-input-field');
  createInput.setAttribute('placeholder', 'PLN');
  createInput.setAttribute('type', 'number');
  createChildrenForm.appendChild(createInput);

  // stworzenie button
  const createButton = document.createElement('button');
  createButton.classList.add('exchange-btn');
  createButton.setAttribute('type', 'submit');
  createButton.innerText = `przelicz na ${actuallyCurrency.currencyName[id]}`;
  createChildrenForm.appendChild(createButton);

  // złapanie button
  const exchangeAction = document.querySelector('.exchange-btn');
  // złapanie inputu, do którego jest wprowadzana wartość
  const exchangeValue = document.querySelector('.exchange-input-field');

  exchangeAction.addEventListener('click', (event) => {
    // funkcja pozwalająca uniknąć przeładowania strony po wykonaniu submitu - (button type="submit")
    event.preventDefault();
    removeChild(exchangeResult);
    // pprzypisanie wartości z inputu
    const { value } = exchangeValue;
    const id = selectByCode();

    // stworzenie paragrafu z wynikiem
    const createResultParagraph = document.createElement('p');
    createResultParagraph.classList.add('exchange-result');
    createResultParagraph.innerText = actuallyCurrency.exchangePLNToCurrency(value, id);
    exchangeResult.appendChild(createResultParagraph);
  });
};
