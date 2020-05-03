import MFMonth from './components/month';
import MFWeek from './components/week';
import MFDay from './components/day';

class MFCalendar {
    constructor(options = {}) {
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        this.today = this.setToday();
        this.currentDate = this.options.initialDate;
        
        this.mfMonth = null;
        this.mfWeek = null;
        this.mfDay = null;

        this.createInitialView();

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
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.options.initialDate,
            monthNames: options.monthNames || this.options.monthNames,
            dayNames: options.dayNames || this.options.dayNames,
        };

        this.mfMonth = new MFMonth(data);
    }

    createWeek(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.options.initialDate,
            monthNames: options.monthNames || this.options.monthNames,
            dayNames: options.dayNames || this.options.dayNames,
        };

        this.mfWeek = new MFWeek(data);
    }
    
    createDay(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.options.initialDate,
            monthNames: options.monthNames || this.options.monthNames,
            dayNames: options.dayNames || this.options.dayNames,
        };

        this.mfDay = new MFDay(data);
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
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return { initialDate, initialView, navigation, allowPast, hasEvents, monthNames, dayNames };
    }
}

export default MFCalendar;
