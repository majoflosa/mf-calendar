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
    // initialDate: 'May 4, 2020'
    events: _events
});