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

    /**
     * Checks that options passed in to Calendar on instantiation are of expected types and shape;
     * converts to valid options where possible
     * 
     * @param {object} options Object containing configuration settings for main calendar
     */
    validateOptions(options) {
        const calendarOptions = Object.assign({}, options);
        const defaultOptions = this.getDefaultOptions();

        // validate initial view
        if (options.initialView !== undefined) {
            const validInitialViews = ['month', 'week', 'day'];
            if (typeof options.initialView !== 'string') {
                throw new Error(`options.initialView expects string; ${typeof options.initialView} provided.`);
            }
            if (!validInitialViews.includes(options.initialView)) {
                throw new Error(`options.initialView must be one of 'month', 'week', or 'day'. ${options.initialView} provided.`);
            }
        }

        // validate initial Date
        if (options.initialDate !== undefined) {
            const invalidDateTypes = ['number', 'boolean'];
            const initialDateType = typeof options.initialDate;
            if (invalidDateTypes.includes(initialDateType) || options.initialDate === null) {
                throw new Error(`options.initialDate expects a string or instance of Date; ${initialDateType} provided.`);
            }
            if (initialDateType === 'string') {
                calendarOptions.initialDate = new Date(options.initialDate);
                if (isNaN(calendarOptions.initialDate.getTime())) {
                    throw new Error('options.initialDate is not a valid date.');
                }
            } else if (!options.initialDate instanceof Date || !options.initialDate.getTime) {
                throw new Error('options.initialDate must be string or instance of Date');
            }
        }

        // validate navigation
        if (options.navigation !== undefined) {
            if (typeof options.navigation !== 'boolean') {
                calendarOptions.navigation = !!options.navigation;
            }
        }

        // validate allowPast
        if (options.allowPast !== undefined) {
            if (typeof options.allowPast !== 'boolean') {
                calendarOptions.allowPast = !!options.allowPast;
            }
        }
        if (calendarOptions.navigation === false) {
            calendarOptions.allowPast = false;
        }

        // validate allowFuture
        if (options.allowFuture !== undefined) {
            if (typeof options.allowFuture !== 'boolean') {
                calendarOptions.allowFuture = !!options.allowFuture;
            }
        }
        if (calendarOptions.navigation === false) {
            calendarOptions.allowFuture = false;
        }

        // validate hasEvents
        if (options.hasEvents !== undefined) {
            if (typeof options.hasEvents !== 'boolean') {
                calendarOptions.hasEvents = !!options.hasEvents;
            }
        }

        // validate asyncEvents
        if (options.asyncEvents !== undefined) {
            if (typeof options.asyncEvents !== 'boolean') {
                calendarOptions.asyncEvents = !!options.asyncEvents;
            }
        }
        if (options.hasEvents === false) {
            calendarOptions.asyncEvents = false;
        }

        // validate events
        if (options.events !== undefined) {
            if (!Array.isArray(options.events)) {
                throw new Error(`options.events must be an array; ${typeof options.events} was provided.`);
            }
            options.events.forEach((event, i) => {
                if (!event.title || typeof event.title !== 'string') {
                    throw new Error(`All items in options.events must contain a 'title' property of type string. Item at index ${i} is invalid.`);
                }
                if (!event.startDate) {
                    throw new Error(`All items in options.events must contain a 'startDate' property of type string or instance of Date. Item at index ${i} is invalid.`);
                }
                if (typeof event.startDate === 'number' || typeof event.startDate === 'boolean' || event.startDate === null) {
                    throw new Error(`All items in options.events must contain a 'startDate' property of type string or instance of Date. Item at index ${i} is invalid.`);
                }
                if (typeof event.startDate === 'string') {
                    const date = new Date(event.startDate);
                    if (isNaN(date.getTime())) {
                        throw new Error(`The item at index ${i} of options.events contains an invalid date as startDate.`);
                    }
                } else if (!event.startDate instanceof Date || isNaN(event.startDate.getTime())) {
                    throw new Error(`The item at index ${i} of options.events contains an invalid date as startDate.`);
                }
            });
        }

        return Object.assign(defaultOptions, calendarOptions);
    }
}

export default MFCalendar;
