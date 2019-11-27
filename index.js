const q = require('daskeyboard-applet');
// to access to the logger
const logger = q.logger; 


class BirthdayReminder extends q.DesktopApp {

    constructor() {
        super();
        // every two hours
        this.pollingInterval = 7200000; 
        logger.info("BirthdayReminder, Birthday Reminder ready to go!");
    }

    async run() {
        // collect the current date
        const now = new Date(); 
        // with the current month
        const currentMonth = now.getMonth(); 
        // and the current day
        const currentDay = now.getDate(); 

        // this is the birthday month entered by the user
        const monthOfTheBirthday = this.config.monthOfTheBirthday; 
        // this is the birthday day entered by the user
        const dayOfTheBirthday = this.config.dayOfTheBirthday; 

        // get the current year if the current date is before the birthday date
        let yearOfTheBirthday = now.getFullYear(); 
        // get the year if the current date is after or equal to the birthday date:
        if(monthOfTheBirthday < currentMonth || (monthOfTheBirthday == currentMonth && dayOfTheBirthday < currentDay)) {
            yearOfTheBirthday += 1;
        }
        // exact date of the birthday year/month/day
        const birthdayDate = new Date(yearOfTheBirthday, monthOfTheBirthday, dayOfTheBirthday); 
        // number of days before the birthday
        const daysToBirthday = (birthdayDate - now)/(1000*3600*24); 
        logger.info("The birthday is in " + daysToBirthday + " days.");

        if (currentMonth == monthOfTheBirthday && currentDay == dayOfTheBirthday) {
            logger.info("BirthdayReminder, you will never forget a birthday.");
            // red
            const color = '#F11512'; 
            return new q.Signal({
                points: [
                    [new q.Point(color, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}.`
            });
            // if the current date (month + day) matches with the birthday date entered by the user,
            // the keyboard key must blink in red 
        } else {
            // if the current date is far from the birthday date, color = green
            let color = '#60F93B'; 
            // the birthday date is in one month
            if (daysToBirthday <= 30) {
                // yellow
                color = '#F9E53B'; 
            }
            // the birthday date is in 2 weeks:
            if (daysToBirthday <= 14) {
                // yellow/orange
                color = '#D6BD1D'; 
            }
            // the birthday date is in 1 week
            if (daysToBirthday <= 7) {
                // orange
                color = '#C55D11'; 
            }
            return new q.Signal({
                points: [
                    [new q.Point(color)]
                ],
                name: 'Birthday Reminder',
                message: `The birthday of ${this.config.nameOfTheBirthdayPerson} is on the 
                ${getMonthString(this.config.monthOfTheBirthday)} ${this.config.dayOfTheBirthday}.`
            });
        }
    }
}

// get the string month
function getMonthString(monthNumber) {
    const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    return monthString[monthNumber];
}

module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
