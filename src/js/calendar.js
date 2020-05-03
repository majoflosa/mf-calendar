import MFMonth from './components/month';
import MFWeek from './components/week';
import MFDay from './components/day';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class MFCalendar {
    constructor(options = {}) {
        this.monthNames = monthNames;
        this.dayNames = dayNames;
        this.today = this.setToday();
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        
        this.mfMonth = null;
        this.mfWeek = null;
        this.mfDay = null;
        
        window.mfCalendar = this;
    }

    createMonth(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.today.fullDate,
        };

        this.mfMonth = new MFMonth(data);
    }

    createWeek(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.today.fullDate,
        };

        this.mfWeek = new MFWeek(data);
    }
    
    createDay(options = {}) {
        const data = {
            today: this.today,
            initialDate: options.initialDate || this.today.fullDate,
        };

        this.mfDay = new MFDay(data);
    }

    setToday() {
        const fullDate = new Date();
        const date = fullDate.getDate();
        const day = fullDate.getDay();
        const dayName = this.dayNames[day];
        const month = fullDate.getMonth();
        const monthName = this.monthNames[month];
        const year = fullDate.getFullYear();

        return { fullDate, date, day, dayName, month, monthName, year };
    }

    getDefaultOptions() {
        const initialDate = new Date();
        const initialView = 'month';
        const navigation = true;
        const allowPast = true;
        const hasEvents = true;

        return { initialDate, initialView, navigation, allowPast, hasEvents };
    }
}

export default MFCalendar;
