class MFMonth {
    constructor(options) {
        this.monthOptions = Object.assign({}, this.getDefaultOptions(), options);
        this.current = this.monthOptions.initialDate;
        this.daysInMonth = (new Date(this.current.year, this.current.month + 1, 0)).getDate();
        this.monthDays = [];
        this.monthWeeks = [];

        this.setMonthDays();
        this.setMonthWeeks();
    }

    setMonthDays() {
        // remainder days from past month
        const firstDayDate = new Date(this.current.year, this.current.month, 1);
        const firstDay = firstDayDate.getDay();
        
        for (let i = 1; i <= firstDay; i++) {
            const fullDate = new Date(this.current.year, this.current.month, i - firstDay);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = true;
            const isToday = false;
            const isPastMonth = true;
            const isNextMonth = false;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // days in month being displayed
        for (let i = 1; i <= this.daysInMonth; i++) {
            const fullDate = new Date(this.current.year, this.current.month, i);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = day < this.monthOptions.today.date;
            const isToday = day === this.monthOptions.today.date
                && this.current.month === this.monthOptions.today.month;
            const isPastMonth = false;
            const isNextMonth = false;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // remainder days in next month
        const lastGridDay = this.monthDays[this.monthDays.length - 1].day;
        for (let i = 1; i < 7 - lastGridDay; i++) {
            const fullDate = new Date(this.current.year, this.current.month, this.daysInMonth + i);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = false;
            const isToday = false;
            const isPastMonth = false;
            const isNextMonth = true;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }
    }

    setMonthWeeks() {
        if (!this.monthDays.length) console.warn('MFMonth.monthDays cannot set weeks without days.');

        let week = [];
        for (let i = 0; i < this.monthDays.length; i++) {
            week.push(this.monthDays[i]);
            
            if ((i + 1) % 7 === 0) {
                this.monthWeeks.push(week);
                week = [];
            }
        }
    }

    getDefaultOptions() {
        return {};
    }
}

export default MFMonth;
