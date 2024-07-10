const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth()+1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  document.querySelector('.content h1').innerHTML = months[date.getMonth()];
  document.querySelector('.content p').innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x>0;x--){
    days += `<div class="previous-day">${prevLastDay - x + 1}</div>`
  }

  for (let i = 1; i <= lastDay; i++){
    if(i===new Date().getDate() && date.getMonth() === new Date().getMonth()){
      days += `<div class="today">${i}</div>`
    } else {
      days += `<div class="">${i}</div>`
    }
  }

  for(let j = 1; j <= nextDays; j++){
    days += `<div class="next-days">${j}</div>`
    monthDays.innerHTML = days;
  }
};
document.addEventListener('DOMContentLoaded', function() {
  const dateInput = document.getElementById('date-picker');
  const markDateButton = document.getElementById('mark-date');
  const selectedDaysKey = 'selectedDays';

  // Load selected days from localStorage
  function loadSelectedDays() {
      const selectedDays = JSON.parse(localStorage.getItem(selectedDaysKey)) || [];
      selectedDays.forEach(date => {
          const dayElement = document.querySelector(`.days div[data-date="${date}"]`);
          if (dayElement) {
              dayElement.classList.add('selected-day');
          }
      });
  }

  // Save selected days to localStorage
  function saveSelectedDays() {
      const selectedDays = [];
      document.querySelectorAll('.days div.selected-day').forEach(day => {
          selectedDays.push(day.getAttribute('data-date'));
      });
      localStorage.setItem(selectedDaysKey, JSON.stringify(selectedDays));
  }

  // Mark date
  function markDate(date) {
      const dayElement = document.querySelector(`.days div[data-date="${date}"]`);
      if (dayElement) {
          dayElement.classList.add('selected-day');
          saveSelectedDays();
      }
  }

  // Handle mark date button click
  markDateButton.addEventListener('click', function() {
      const selectedDate = dateInput.value;
      if (selectedDate) {
          markDate(selectedDate);
      }
  });

  loadSelectedDays();
});



document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
})

renderCalendar();