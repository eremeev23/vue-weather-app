import { computed } from "vue";

export const useDateToday = computed<string>(() => {
  const day = new Date().getDay(),
    month = new Date().getMonth(),
    date = new Date().getDate();

  let formattedDay = "",
    formattedMonth = "";

  switch (day) {
    case 0:
      formattedDay = "Sunday";
      break;
    case 1:
      formattedDay = "Monday";
      break;
    case 2:
      formattedDay = "Tuesday";
      break;
    case 3:
      formattedDay = "Wednesday";
      break;
    case 4:
      formattedDay = "Thursday";
      break;
    case 5:
      formattedDay = "Friday";
      break;
    case 6:
      formattedDay = "Saturday";
      break;
  }

  switch (month) {
    case 0:
      formattedMonth = "January";
      break;
    case 1:
      formattedMonth = "February";
      break;
    case 2:
      formattedMonth = "March";
      break;
    case 3:
      formattedMonth = "April";
      break;
    case 4:
      formattedMonth = "May";
      break;
    case 5:
      formattedMonth = "June";
      break;
    case 6:
      formattedMonth = "July";
      break;
    case 7:
      formattedMonth = "August";
      break;
    case 8:
      formattedMonth = "September";
      break;
    case 9:
      formattedMonth = "October";
      break;
    case 10:
      formattedMonth = "November";
      break;
    case 11:
      formattedMonth = "December";
      break;
  }

  return `${formattedDay} ${date} ${formattedMonth}`
})
