import MFMonth from './components/month';
import MFWeek from './components/week';
import MFDay from './components/day';

class MFCalendar {
    constructor(options = {}) {
        if (typeof options.initialDate === 'string') {
            options.initialDate = new Date(options.initialDate);
        } else if (!options.initialDate instanceof Date) {
            throw new Error('options.initialDate must be string or instance of Date');
        }

        this.options = Object.assign({}, this.getDefaultOptions(), options);
        this.today = this.setToday();
        this.currentDate = this.createDate(
            this.options.initialDate.getFullYear(),
            this.options.initialDate.getMonth(),
            this.options.initialDate.getDate()
        );
        this.activeView = this.options.initialView;
        this.memo = {};
        
        this.mfMonth = null;
        this.mfWeek = null;
        this.mfDay = null;

        this.createInitialView(this.options);

        window.mfCalendar = this;
    }

    createInitialView(options = {}) {
        switch(this.options.initialView) {
            case 'day': this.createDay(options); break;
            case 'week': this.createWeek(options); break;
            case 'month': 
            default:
                this.createMonth(options);
        }
    }

    createMonth(options = {}) {
        const monthOptions = { ...options, initialDate: this.currentDate, today: this.today };

        this.mfMonth = new MFMonth(monthOptions);
        this.activeView = 'month';
    }

    createWeek(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.options.initialDate,
            monthNames: options.monthNames || this.options.monthNames,
            dayNames: options.dayNames || this.options.dayNames,
            events: options.events
        };

        this.mfWeek = new MFWeek(data);
        this.activeView = 'week';
    }
    
    createDay(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.options.initialDate,
            monthNames: options.monthNames || this.options.monthNames,
            dayNames: options.dayNames || this.options.dayNames,
            events: options.events
        };

        this.mfDay = new MFDay(data);
        this.activeView = 'day';
    }

    createDate(year, month, date) {
        const fullDate = new Date(year, month, date);
        const day = fullDate.getDay();
        const dayName = this.options.dayNames[day];
        const monthName = this.options.monthNames[month];

        return { fullDate, date, day, dayName, month, monthName, year };
    }

    setToday() {
        const fullDate = new Date();
        const date = fullDate.getDate();
        const day = fullDate.getDay();
        const dayName = this.options.dayNames[day];
        const month = fullDate.getMonth();
        const monthName = this.options.monthNames[month];
        const year = fullDate.getFullYear();

        return { fullDate, date, day, dayName, month, monthName, year };
    }

    getDefaultOptions() {
        const initialDate = new Date();
        const initialView = 'month';
        const navigation = true;
        const allowPast = true;
        const hasEvents = true;
        const asyncEvents = false;
        const events = [];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthAbbreviations = monthNames.map(month => month.substr(0, 3));
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayAbbreviations = dayNames.map(day => day.substr(0, 3));
        const abbreviateDayNames = ['month', 'week'];

        return { initialDate, initialView, navigation, allowPast, hasEvents, asyncEvents, events, monthNames,
            monthAbbreviations, dayNames, dayAbbreviations, abbreviateDayNames };
    }
}

export default MFCalendar;
