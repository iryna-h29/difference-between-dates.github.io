
let form = document.querySelector(".calculator__form");
let output = document.getElementById("output");
const radioBtns = document.querySelectorAll('input[name="duration"]');
let endDateInput = document.querySelector('#date-2');
let month = document.querySelector("#month");
let week = document.querySelector("#week");
let labelEndDate = document.querySelector('#label-endDate');
let outputResult;
let filterDurationSelect = document.querySelector("#filter-duration");
const btnReset = document.querySelector('.calculator__btn-reset');


function storeStartDatetoLocalStorage(date) {
  let startDates;

  // перевіряємо чи є у localStorage вже якісь завдання
  if (localStorage.getItem('start Dates') !== null) {
    // якщо вони там є - витягуємо їх і присвоюємо змінній
    startDates = JSON.parse(localStorage.getItem('start Dates'));
    if (startDates.length > 10) {
      startDates.pop();
    }
  } else {
      // якщо їх там нема - присвоюємо змінній значення порожнього масиву
      startDates = []
  }

// додаємо до списку нове завдання
  startDates.unshift(date);

  // зберігаємо список завданнь в Local Storage
  localStorage.setItem('start Dates', JSON.stringify(startDates));

}
function storeEndDatetoLocalStorage(date) {
  let endDates;

 
  if (localStorage.getItem('end Dates') !== null) {
    endDates = JSON.parse(localStorage.getItem('end Dates'));
    if (endDates.length > 10) {
      endDates.pop();
    }
  } else {
      endDates = []
  }

  endDates.unshift(date);

  localStorage.setItem('end Dates', JSON.stringify(endDates));
}
function storeResultstoLocalStorage(value, nameValue) {
  let results;
  let result = `${value} ${nameValue}`;

    if (localStorage.getItem('results') !== null) {
        results = JSON.parse(localStorage.getItem('results'));
        if (results.length > 10) {
          results.pop();
        }
    } else {
        results = []
    }

    // додаємо до списку нове завдання
    results.unshift(result);

    // зберігаємо список завданнь в Local Storage
    localStorage.setItem('results', JSON.stringify(results));
}
// Функція повертає дату (тиждень або місяць від початкової дати)
function addWeekorMonth(date, weeks, days) {
  date.setDate(date.getDate() + 7 * weeks + days - 1);
  return date;
} 

// Функція-фільтр тільки вихідні дні

function getWeekends(start, end) {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let weekendDays = 0;

  while (startDate <= endDate) {
    let day = startDate.getDay()
    if (day === 0 || day === 6) {
        weekendDays++;
    }
    // startDate.setDate(startDate.getDate() + 1);
  }
  return weekendDays;
}

// Функція-фільтр тільки будні

function getWeekdays(start, end) {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let weekdays = 0;

  while (startDate <= endDate) {
    let day = startDate.getDay()
    if (day >= 1 && day <= 5) {
        weekdays++;
    }
    // startDate.setDate(startDate.getDate() + 1)
  }
  return weekdays;
}

// Функція-конвертер днів в години ,хвилини чи секунди і виведення результату

function ConvertAndOutputResult(date1, date2) {
  if (filterDurationSelect.value === 'hours') {
    let hours = outputResult * 24;
    output.innerHTML = `Difference between the two dates is <span class="result-date">${hours}</span> hours`;
    // localStorage.setItem('time interval', `${hours} hours`);
    storeResultstoLocalStorage(hours, 'hours')
  } else if (filterDurationSelect.value === 'minutes') {
    let minutes = outputResult * 24 * 60;
    output.innerHTML = `Difference between the two dates is <span class="result-date">${minutes}</span> minutes`;
    // localStorage.setItem('time interval', `${minutes} minutes`);
    storeResultstoLocalStorage(minutes, 'minutes')
  } else if (filterDurationSelect.value === 'seconds') {
    let seconds = outputResult * 24 * 60 * 60;
    output.innerHTML = `Difference between the two dates is <span class="result-date">${seconds}</span> seconds`;
    // localStorage.setItem('time interval', `${seconds} seconds`);
    storeResultstoLocalStorage(seconds, 'seconds')
  }
}

// Функція виведення даних з localStorage 

function setResultsFromLocalStorage(item) {
  let arrLocalStorage;

  // перевіряємо чи є у localStorage вже якісь завдання
  if (localStorage.getItem(item) !== null) {
    // якщо вони там є - витягуємо їх і присвоюємо змінній
    arrLocalStorage = JSON.parse(localStorage.getItem(item));
  } else {
    arrLocalStorage = []
  }

  // тут треба додати елемент 0 індекса передати
  return arrLocalStorage[0];
}


function setResults() {
  let listResult = document.querySelector('.history__list-result');
  let listStartDate = document.querySelector(".history__list-start-date");
  let listEndDate = document.querySelector(".history__list-end-date");
  let liResult = document.createElement('li');
  // liResult.innerText = localStorage.getItem('time interval');
  liResult.innerText = setResultsFromLocalStorage('results');
  let liStartDate = document.createElement('li');
  // liStartDate.innerText = localStorage.getItem('startDate');
  liStartDate.innerText = setResultsFromLocalStorage('start Dates');
  let liEndDate = document.createElement('li');
  // liEndDate.innerText = localStorage.getItem('endDate');
  liEndDate.innerText = setResultsFromLocalStorage('end Dates');
  listResult.prepend(liResult);
  listStartDate.prepend(liStartDate);
  listEndDate.prepend(liEndDate);
}

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let format = day + "/" + month + "/" + year;
  return format;
}

// Основна функція

function getDifference(event) {
  event.preventDefault();
  let date1 = new Date(document.getElementById("date-1").value);
  let inputDate2 = endDateInput.value;
  if (inputDate2 !== "") {
    let inputRadioEndDate = document.querySelector('#end-date');
    inputRadioEndDate.value = inputDate2;
  }
  let endDate;
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      endDate = radioBtn.value;
    }
  }
  
  // Встановити другу дату
  
  let date2;
  let startDay = new Date(date1.getTime());;
  if (endDate === "week") {
    date2 = new Date(addWeekorMonth(startDay, 1, 0));
  } else if (endDate === "month") {
    date2 = new Date(addWeekorMonth(startDay, 4, 2));
  } else {
    date2 = new Date(endDate);
  }

  // перевірка чи кінцева дата не раніше початкової
  if (Date.parse(date1) > Date.parse(date2)) {
    return output.innerHTML = "The end date supposed to be later than the start date";
  }

  //  фільтр усі-будні-вихідні дні 
  
  let filterTypeDay = document.querySelector("#type-day").value;
  if (filterTypeDay === "weekends" && date1.getTime() && date2.getTime()) {
    outputResult = getWeekends(date1, date2);
  } else if (filterTypeDay === "weekdays" && date1.getTime() && date2.getTime()) {
    outputResult = getWeekdays(date1, date2);
  } else if (date1.getTime() && date2.getTime() && endDate === "month" || endDate === "week") {
    let timeDifference = Math.round(date2 - date1);  
    outputResult = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  } else if(date1.getTime() && date2.getTime()) {
    let timeDifference = Math.round(date2 - date1); 
    outputResult = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  } else {
    return output.innerHTML = "Please select a valid date";
  }

  // localStorage.setItem('startDate', formatDate(date1));
  storeStartDatetoLocalStorage(formatDate(date1));
  // localStorage.setItem('endDate', formatDate(date2));
  storeEndDatetoLocalStorage(formatDate(date2));

  // Фільтр дні-години-хвилини-секунди 

  if (filterDurationSelect.value === 'days' && outputResult) {
    if (outputResult > 1) {
      // localStorage.setItem('time interval', `${outputResult} days`);
      storeResultstoLocalStorage(outputResult, 'days');
      output.innerHTML = `Difference between the two dates is <span class="result-date">${outputResult}</span> days`;
    } else {
      // localStorage.setItem('time interval', `${outputResult} day`);
      storeResultstoLocalStorage(outputResult, 'day');
      output.innerHTML = `Difference between the two dates is <span class="result-date">${outputResult}</span> day`;
    }
  } else if((filterDurationSelect.value !== 'days' && outputResult)) {
    ConvertAndOutputResult(date1, date2);
  }

  setResults();
}


// ці функції тому що в мене проблеми з радіо-інпутами

function defineStatus() {
  let endDateRadioInp = document.querySelector('#end-date');
  if (endDateInput !== null) {
    endDateRadioInp.checked = true;
    labelEndDate.setAttribute("style", "background-color: white;");
    // let inputs = [document.querySelectorAll('[name="duration"]')];
  }
}
function removeActiveStatusFromEndDate() {
  labelEndDate.removeAttribute("style", "background-color: white;");
  // let label = document.querySelector(`[for=${e.target.value}]`);
  // label.setAttribute("style", "background-color: white;");
}

function resetForm() {
  form.reset();
}

form.addEventListener("submit", getDifference);
labelEndDate.addEventListener('click', defineStatus);
week.addEventListener('click', removeActiveStatusFromEndDate);
month.addEventListener('click', removeActiveStatusFromEndDate);
btnReset.addEventListener('click', resetForm);