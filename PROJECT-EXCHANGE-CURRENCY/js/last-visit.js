const getFooter = document.querySelector(".last-visit");
const getDate = new Date();

const addZero = (...arg) => {
  if (arg < 10) arg = `0${arg}`;
  return arg;
};

// eslint-disable-next-line max-len
const date = `Ostatni raz byłeś u nas ${addZero(getDate.getDay())}-${addZero(getDate.getMonth())}-${getDate.getFullYear()}.r, o godzinie ${addZero(getDate.getHours())}:${addZero(getDate.getMonth() + 2)}:${addZero(getDate.getSeconds())}.`;

const getVisit = localStorage.getItem("last-visit-date");

getVisit === null ? getFooter.innerText = "Jesteś u nas pierwszy raz!" : getFooter.innerText = getVisit;

localStorage.setItem("last-visit-date", date);
