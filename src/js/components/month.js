class MFMonth {
    constructor(options) {
        this.monthOptions = Object.assign({}, this.getDefaultOptions(), options);
        this.current = this.monthOptions.initialDate;
        this.daysInMonth = (new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0)).getDate();
        this.monthGrid = [];

        this.createMonthGrid();
    }

    createMonthGrid() {
        // remainder days from past month
        const firstDayDate = new Date(this.current.getFullYear(), this.current.getMonth(), 1);
        const firstDay = firstDayDate.getDay();
        
        for (let i = 1; i <= firstDay; i++) {
            const fullDate = new Date(this.current.getFullYear(), this.current.getMonth(), i - firstDay);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = true;
            const isToday = false;
            const isPastMonth = true;
            const isNextMonth = false;
            const events = [];

            this.monthGrid.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // days in month being displayed
        for (let i = 1; i <= this.daysInMonth; i++) {
            const fullDate = new Date(this.current.getFullYear(), this.current.getMonth(), i);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = day < this.monthOptions.today.date;
            const isToday = day === this.monthOptions.today.date
                && this.current.getMonth() === this.monthOptions.today.month;
            const isPastMonth = false;
            const isNextMonth = false;
            const events = [];

            this.monthGrid.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // remainder days in next month
        const lastGridDay = this.monthGrid[this.monthGrid.length - 1].day;
        for (let i = 1; i < 7 - lastGridDay; i++) {
            const fullDate = new Date(this.current.getFullYear(), this.current.getMonth(), this.daysInMonth + i);
            const day = fullDate.getDay();
            const dayName = this.monthOptions.dayNames[day];
            const isPast = false;
            const isToday = false;
            const isPastMonth = false;
            const isNextMonth = true;
            const events = [];

            this.monthGrid.push({
                fullDate, day, dayName, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }
    }

    getDefaultOptions() {
        return {};
    }
}

export default MFMonth;
