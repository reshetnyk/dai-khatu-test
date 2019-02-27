export class Calendar {
  currentMonth: Date;
  month: any[] = [];

  constructor() {
    this.setMonth(new Date());
  }
  setMonth(date: Date) {
    this.currentMonth = new Date(date);
    this.month = [];
    let dateCopy = new Date(date);
    dateCopy.setDate(1);
    while (dateCopy.getDay() !== 1) {
      dateCopy.setDate(dateCopy.getDate() - 1);
    }
    while (dateCopy.getMonth() !== date.getMonth()) {
      this.month.push({
        dayOfMonth: dateCopy.getDate(),
        isCurrentMonth: false,
        dateObject: new Date(dateCopy)
      });
      dateCopy.setDate(dateCopy.getDate() + 1);
    }
    dateCopy = new Date(date);
    dateCopy.setDate(1);
    while (dateCopy.getMonth() === date.getMonth()) {
      this.month.push({
        dayOfMonth: dateCopy.getDate(),
        isCurrentMonth: true,
        dateObject: new Date(dateCopy)
      });
      dateCopy.setDate(dateCopy.getDate() + 1);
    }
    while (dateCopy.getDay() !== 1) {
      this.month.push({
        dayOfMonth: dateCopy.getDate(),
        isCurrentMonth: false,
        dateObject: new Date(dateCopy)
      });
      dateCopy.setDate(dateCopy.getDate() + 1);
    }
  }
  setNextMonth() {
    const nextMonth: Date = new Date(this.currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.setMonth(nextMonth);
  }
  setPrevMonth() {
    const prevMonth: Date = new Date(this.currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.setMonth(prevMonth);
  }

}
