import MFMonth from './components/month';
import MFWeek from './components/week';
import MFDay from './components/day';

class MFCalendar {
    constructor(options = {}) {
        // set main calendar info
        this.options = this.validateOptions(options);
        this.today = this.setToday();
        this.currentDate = this.createDate(
            this.options.initialDate.getFullYear(),
            this.options.initialDate.getMonth(),
            this.options.initialDate.getDate()
        );
        this.activeView = this.options.initialView;

        // keep cache of previously generated views
        this.memo = {};
        
        // keep track of current month/week/day instances
        this.mfMonth = null;
        this.mfWeek = null;
        this.mfDay = null;

        // create initial view
        this.createInitialView(this.options);

        // set global variable
        window.mfCalendar = this;
    }

    /**
     * Checks that options passed in to Calendar on instantiation are of expected types and shape;
     * converts to valid options where possible
     * 
     * @param {object} options Object containing configuration settings for main calendar
     */
    validateOptions(options) {
        if (typeof options.initialDate === 'string') {
            options.initialDate = new Date(options.initialDate);
        } else if (!options.initialDate instanceof Date) {
            throw new Error('options.initialDate must be string or instance of Date');
        }

        return Object.assign({}, this.getDefaultOptions(), options);
    }

    /**
     * Invokes appropriate method to generate initial view.
     * 
     * @param {object} options Object containing configuration information
     */
    createInitialView(options = {}) {
        switch(this.options.initialView) {
            case 'day': this.createDay(options); break;
            case 'week': this.createWeek(options); break;
            case 'month': 
            default:
                this.createMonth(options);
        }
    }

    /**
     * Instantiates month component with main calendar settings
     * 
     * @param {object} options Object of configuration information for month view
     */
    createMonth(options = {}) {
        const monthOptions = { ...options, initialDate: this.currentDate, today: this.today };

        this.mfMonth = new MFMonth(monthOptions);
        this.activeView = 'month';
    }

    /**
     * Instantiates week component with main calendar settings
     * 
     * @param {object} options Object of configuration information for week view
     */
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
    
    /**
     * Instantiates day component with main calendar settings
     * 
     * @param {object} options Object of configuration information for day view
     */
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

    /**
     * Returns an object wrapping Date instance with additional information for easier access
     * 
     * @param {number} year 4-digit number representing year of date to create
     * @param {number} month Number from 0-11 representing month of date to create
     * @param {number} date Number from 1-31 representing date of date to create
     */
    createDate(year, month, date) {
        const fullDate = new Date(year, month, date);
        const day = fullDate.getDay();
        const dayName = this.options.dayNames[day];
        const monthName = this.options.monthNames[month];

        return { fullDate, date, day, dayName, month, monthName, year };
    }

    /**
     * Returns object with information about current date
     */
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

    /**
     * Returns object with default configuration settings
     */
    getDefaultOptions() {
        const initialDate = new Date();
        const initialView = 'month';
        const navigation = true;
        const allowPast = true;
        const allowFuture = true;
        const hasEvents = true;
        const asyncEvents = false;
        const events = [];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthAbbreviations = monthNames.map(month => month.substr(0, 3));
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayAbbreviations = dayNames.map(day => day.substr(0, 3));
        const abbreviateDayNames = ['month', 'week'];

        return { initialDate, initialView, navigation, allowPast, allowFuture, hasEvents, asyncEvents, events,
            monthNames, monthAbbreviations, dayNames, dayAbbreviations, abbreviateDayNames };
    }
}

export default MFCalendar;
