const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger


class BirthdayReminder extends q.DesktopApp {

    constructor() {
        super();
        this.pollingInterval = 7200000; // every two hours
        logger.info("BirthdayReminder, Birthday Reminder ready to go!");
    }

    async run() {
        const now = new Date(); // collect the current date
        const currentMonth = now.getMonth(); // with the current month
        const currentDay = now.getDate(); // and the current day

        const monthOfTheBirthday = this.config.monthOfTheBirthday; // this is the birthday month entered by the user
        const dayOfTheBirthday = this.config.dayOfTheBirthday; // this is the birthday day entered by the user
        logger.info("The birthday is in", dayOfTheBirthday, "days");

        let yearOfTheBirthday = now.getFullYear(); // get the current year if the current date is before the birthday date
        // get the year if the current date is after or equal to the birthday date:
        if(monthOfTheBirthday < currentMonth || (monthOfTheBirthday == currentMonth && dayOfTheBirthday < currentDay)) {
            yearOfTheBirthday += 1;
        }
        const birthdayDate = new Date(yearOfTheBirthday, monthOfTheBirthday, dayOfTheBirthday); // exact date of the birthday year/month/day
        const daysToBirthday = (birthdayDate - now)/(1000*3600*24); // number of days before the birthday

        if (currentMonth == monthOfTheBirthday && currentDay == dayOfTheBirthday) {
            logger.info("BirthdayReminder, you will never forget a birthday.");
            const color = '#F11512'; // red
            return new q.Signal({
                points: [
                    [new q.Point(color, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}`
            });
            // if the current date (month + day) matches with the birthday date entered by the user,
            // the keyboard key must blink in red 
        } else {
            let color = '#60F93B'; // if the current date is far from the birthday date 
            // the birthday date is in one month
            if (daysToBirthday <= 30) {
                color = '#F9E53B'; // keyboard key is yellow
            }
            // the birthday date is in 2 weeks:
            if (daysToBirthday <= 14) {
                color = '#D6BD1D'; // keyboard key is yellow/orange
            }
            // the birthday date is in 1 week
            if (daysToBirthday <= 7) {
                color = '#C55D11'; // keyboard key is orange
            }
            return new q.Signal({
                points: [
                    [new q.Point(color)]
                ],
                name: 'Birthday Reminder',
                message: `The birthday of ${this.config.nameOfTheBirthdayPerson} is on the ${getMonthString(this.config.monthOfTheBirthday)} ${this.config.dayOfTheBirthday}`
            });
        }
    }
}

function getMonthString(monthNumber) {
    const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    return monthString[monthNumber];
}

module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
