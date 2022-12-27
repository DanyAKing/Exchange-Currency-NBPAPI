const getFooter = document.querySelector('.last-visit');
const showDate = new Date();

const addZero = arg => {
  if (arg < 10) arg = `0${arg}`;
  return arg;
};

// eslint-disable-next-line max-len
const date = `Ostatni raz nas odwiedziłeś ${addZero(showDate.getDate())}-${addZero(showDate.getMonth() + 1)}-${showDate.getFullYear()}r., o godzinie ${addZero(showDate.getHours())}:${addZero(showDate.getMinutes())}:${addZero(showDate.getSeconds())}.`;

const getVisit = localStorage.getItem('last-visit-date');

getVisit === null ? getFooter.innerText = 'Witamy, jesteś u nas pierwszy raz!' : getFooter.innerText = getVisit;

localStorage.setItem('last-visit-date', date);
