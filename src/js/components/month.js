class MFMonth {
    constructor(options) {
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        this.current = this.options.initialDate;
        this.daysInMonth = (new Date(this.current.year, this.current.month + 1, 0)).getDate();
        this.monthHeaderDays = [];
        this.monthDays = [];
        this.monthWeeks = [];
        this.daysEventsMap = null;

        this.setMonthHeader();
        this.setMonthDays();
        this.setMonthWeeks();
        this.mapEventsToDays();
    }

    setMonthHeader() {
        this.monthHeaderDays = this.options.abbreviateDayNames.includes('month')
            ? this.options.dayAbbreviations.slice()
            : this.options.dayNames.slice();
    }

    setMonthDays() {
        // remainder days from past month
        const firstDayDate = new Date(this.current.year, this.current.month, 1);
        const firstDay = firstDayDate.getDay();
        
        for (let i = 1; i <= firstDay; i++) {
            const fullDate = new Date(this.current.year, this.current.month, i - firstDay);
            const day = fullDate.getDay();
            const dayName = this.options.dayNames[day];
            const isWeekEnd = day === 0 || day === 6;
            const isPast = true;
            const isToday = false;
            const isPastMonth = true;
            const isNextMonth = false;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isWeekEnd, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // days in month being displayed
        for (let i = 1; i <= this.daysInMonth; i++) {
            const fullDate = new Date(this.current.year, this.current.month, i);
            const day = fullDate.getDay();
            const dayName = this.options.dayNames[day];
            const isWeekEnd = day === 0 || day === 6;
            const isPast = day < this.options.today.date;
            const isToday = day === this.options.today.date
                && this.current.month === this.options.today.month;
            const isPastMonth = false;
            const isNextMonth = false;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isWeekEnd, isPast, isToday, isPastMonth, isNextMonth, events
            });
        }

        // remainder days in next month
        const lastGridDay = this.monthDays[this.monthDays.length - 1].day;
        for (let i = 1; i < 7 - lastGridDay; i++) {
            const fullDate = new Date(this.current.year, this.current.month, this.daysInMonth + i);
            const day = fullDate.getDay();
            const dayName = this.options.dayNames[day];
            const isWeekEnd = day === 0 || day === 6;
            const isPast = false;
            const isToday = false;
            const isPastMonth = false;
            const isNextMonth = true;
            const events = [];

            this.monthDays.push({
                fullDate, day, dayName, isWeekEnd, isPast, isToday, isPastMonth, isNextMonth, events
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

    mapEventsToDays() {
        if (!this.options.events) return;

        const { events } = this.options;
        this.daysEventsMap = {};

        events.forEach(event => {
            const startDate = new Date(event.startDate);
            const isInMonth = this.current.month === startDate.getMonth() && this.current.year === startDate.getFullYear();

            if (isInMonth) {
                const key = `${this.current.year}-${this.current.month}-${startDate.getDate()}`;
                this.daysEventsMap[key] = this.daysEventsMap[key] 
                    ? [...this.daysEventsMap[key], event]
                    : [event];
                
                return;
            }

            let isInPastMonth;
            if (this.current.month === 0) {
                isInPastMonth = startDate.getMonth() === 11 && startDate.getFullYear() === this.current.year - 1;
                
                if (isInPastMonth) {
                    const key = `${this.current.year - 1}-11-${startDate.getDate()}`;
                    this.daysEventsMap[key] = this.daysEventsMap[key]
                        ? [...this.daysEventsMap[key], event]
                        : [event];
                    
                    return;
                }
            } else {
                isInPastMonth = startDate.getMonth() === this.current.month - 1 && startDate.getFullYear() === this.current.year;
    
                if (isInPastMonth) {
                    const key = `${this.current.year}-${this.current.month - 1}-${startDate.getDate()}`;
                    this.daysEventsMap[key] = this.daysEventsMap[key]
                        ? [...this.daysEventsMap[key], event]
                        : [event];
                        
                    return;
                }
            }

            let isInNextMonth;
            if (this.current.month === 11) {
                isInNextMonth = startDate.getMonth() === 0 && startDate.getFullYear() === this.current.year + 1;

                if (isInNextMonth) {
                    const key = `${this.current.year + 1}-0-${startDate.getDate()}`;
                    this.daysEventsMap[key] = this.daysEventsMap[key]
                        ? [...this.daysEventsMap[key], event]
                        : [event];

                    return;
                }
            } else {
                isInNextMonth = startDate.getMonth() === this.current.month + 1 && startDate.getFullYear() === this.current.year;

                if (isInNextMonth) {
                    const key = `${this.current.year}-${this.current.month + 1}-${startDate.getDate()}`;
                    this.daysEventsMap[key] = this.daysEventsMap[key]
                        ? [...this.daysEventsMap[key], event]
                        : [event];
                }
            }
        });

        this.monthDays.forEach(monthDay => {
            const year = monthDay.fullDate.getFullYear();
            const month = monthDay.fullDate.getMonth();
            const date = monthDay.fullDate.getDate();
            const key = `${year}-${month}-${date}`;

            if (this.daysEventsMap[key]) {
                monthDay.events.push(this.daysEventsMap[key]);
            }
        });
    }

    getDefaultOptions() {
        return {};
    }
}

export default MFMonth;
