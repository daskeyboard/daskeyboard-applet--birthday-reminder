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

        const currentTimestamp = new Date(now.getFullYear(), currentMonth, currentDay); // get the current date year/month/day
        let yearOfTheBirthday = now.getFullYear(); // get the current year if the current date is before the birthday date
        // get the year if the current date is after or equal to the birthday date:
        if(monthOfTheBirthday < currentMonth || (monthOfTheBirthday == currentMonth && dayOfTheBirthday < currentDay)) {
            yearOfTheBirthday += 1;
        }
        const birthdayTimestamp = new Date(yearOfTheBirthday, monthOfTheBirthday, dayOfTheBirthday); // exact date of the birthday year/month/day
        const daysToBirthday = (birthdayTimestamp - currentTimestamp)/(1000*3600*24); // number of days before the birthday
        const month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        if (currentMonth == monthOfTheBirthday && currentDay == dayOfTheBirthday) {
            logger.info("BirthdayReminder, you will never forget a birthday.");
            return new q.Signal({
                points: [
                    [new q.Point(this.config.reminderColor, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}`
            });
            // if the current date (month + day) matches with the birthday date entered by the user,
            // the keyboard key chosen in the dashboard must blink 
        } else {
            let color = '#60F93B'; // if the current date is far from the birthday date
            // the birthday date is in one month
            if (daysToBirthday <= 30) {
                color = '#F9E53B'; // keyboard key is yellow
            }
            // the birthday date is in 2 weeks:
            if (daysToBirthday <= 14) {
                color = '#EE922B'; // keyboard key is orange
            }
            // the birthday date is in 1 week
            if (daysToBirthday <= 7) {
                color = '#F11512'; // keyboard key is red
            }
            return new q.Signal({
                points: [
                    [new q.Point(color)]
                ],
                name: 'Birthday Reminder',
                message: `The birthday of ${this.config.nameOfTheBirthdayPerson} is on the ${month[this.config.monthOfTheBirthday]} ${this.config.dayOfTheBirthday}`
            });
        }
    }
}

module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
