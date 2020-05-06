import MFCalendar from './calendar';

import '../scss/style.scss';

const _events = [
    { title: 'Event 0', startTime: '10:30', startDate: 'April 30, 2020', endTime: '16:00', endDate: 'April 30, 2020', location: 'Location 0', description: 'Description for Event 0 lorem ipsum dolor sit amet.' },
    { title: 'Event A', startTime: '10:30', startDate: 'May 5, 2020', endTime: '16:00', endDate: 'May 5 2020', location: 'Location A', description: 'Description for Event A lorem ipsum dolor sit amet.' },
    { title: 'Event B', startTime: '8:00', startDate: 'May 9, 2020', endTime: '12:00', endDate: 'May 9 2020', location: 'Location B', description: 'Description for Event B lorem ipsum dolor sit amet.' },
    { title: 'Event C', startTime: '14:00', startDate: 'May 9, 2020', endTime: '17:00', endDate: 'May 9 2020', location: 'Location C', description: 'Description for Event C lorem ipsum dolor sit amet.' },
    { title: 'Event 5', startTime: '14:00', startDate: 'June 2, 2020', endTime: '17:00', endDate: 'June 2, 2020', location: 'Location 5', description: 'Description for Event 5 lorem ipsum dolor sit amet.' },
]

new MFCalendar({
    /**
     * Whether to render month, week, or day on initialization.
     * Accepts 'month', 'week', 'day'
     * 
     * @type: string
     * default: 'month'
     */
    initialView: 'month',
    
    /** 
     * Date that determines which month/week/day to render on initialization; 
     * ex: 'May 5, 2020' -> if initial view is 'month', renders May; 
     *                   -> if initial view is 'week', renders Sat May 2 - Sun May 10,
     *                   -> if initial view is 'day', renders May 5, 2020
     * Accepts any string that can be passed to Date constructor, or an instance of Date.
     * 
     * string || Date
     * default: new Date()
     */
    initialDate: 'May 4, 2020',

    /**
     * Whether or not to display previous/next buttons to navigate to past or future views.
     * 
     * boolean
     * default: true
     */
    navigation: true,

    /**
     * Whether or not to allow to navigate to past months/weeks/days. If `navigation` is set to false,
     * this option takes no effect.
     * 
     * boolean
     * default: true
     */
    allowPast: true,
    
    /**
     * Whether or not to allow to navigate to future months/weeks/days. If `navigation` is set to false,
     * this option takes no effect.
     * 
     * boolean
     * default: true
     */
    allowFuture: true,

    /**
     * Whether or not the calendar will contain events. Can be left as true even if events are never passed in.
     * 
     * boolean
     * default: true
     */
    hasEvents: true,

    /**
     * Whether or not events should be loaded asynchronously. Set to true if event data is to be fetched from an API;
     * set to false if events data is passed as the `events` option on initialization.
     * 
     * boolean
     * default: false
     */
    asyncEvents: false,

    /**
     * Event data to be displayed with each calendar date.
     * Event schema: {
     *      title: string (required)
     *      startDate: string or Date instance (required); if string, accepts any string that can be used in Date constructor
     *      startTime: string, format 'hh:mm' based on 24 hour cycle. Ex; 2:30pm -> '14:30'
     *      endDate: string or Date instance; if string, accepts any string that can be used in Date constructor
     *      endTime: string, format 'hh:mm' based on 24 hour cycle. Ex; 2:30pm -> '14:30'
     *      location: string
     *      description: string
     * }
     * 
     * Array[Events]
     */
    events: _events,

    /**
     * Month names to use in all month labels; change if displaying calendar in non-english language.
     * Must contain 12 strings; assumes order from January to December
     * 
     * Array[String]
     */
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    
    /**
     * Abbreviated month names to use in all abbreviated month labels; change if displaying calendar 
     * in non-english language.
     * Must contain 12 strings; assumes order from January to December
     * 
     * Array[String]
     */
    monthAbbreviations: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    /**
     * Day names to use in all day labels; change if displaying calendar in non-english language.
     * Must contain 7 strings; assumes order from Saturday to Sunday
     * 
     * Array[String]
     */
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    /**
     * Abbreviated day names to use in all abbreviated day labels; change if displaying calendar in non-english language.
     * Must contain 7 strings; assumes order from Saturday to Sunday
     * 
     * Array[String]
     */
    dayAbbreviations: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    /**
     * Specify views (month/week/day) in which day labels should appear as abbreviated.
     * 
     * Array
     * default: ['month', 'week']
     */
    abbreviateDayNames: ['month', 'week'],
});
