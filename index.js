const q = require('daskeyboard-applet');
// to access to the logger
const logger = q.logger; 

// this code reminds you the selected birthday 
class BirthdayReminder extends q.DesktopApp {

    constructor() {
        super();
        // every minutes
        this.pollingInterval = 60*1000; // ms
        logger.info("BirthdayReminder, Birthday Reminder ready to go!");
    }

    async run() {
        const NOW = new Date(); 
        const CURRENT_MONTH = NOW.getMonth(); 
        const CURRENT_DAY = NOW.getDate(); 

        // birthday month and day entered by the user
        const MONTH_BIRTHDAY = this.config.monthOfTheBirthday; 
        const DAY_BIRTHDAY = this.config.dayOfTheBirthday; 

        // get the current year if the current date is before the birthday date
        let YEAR_BIRTHDAY = NOW.getFullYear(); 
        // get the year if the current date is after or equal to the birthday date:
        if(MONTH_BIRTHDAY < CURRENT_MONTH || (MONTH_BIRTHDAY == CURRENT_MONTH && DAY_BIRTHDAY < CURRENT_DAY)) {
            YEAR_BIRTHDAY += 1;
        }
        const BIRTHDAY_DATE = new Date(YEAR_BIRTHDAY, MONTH_BIRTHDAY, DAY_BIRTHDAY); 
        // number of days before the birthday
        const DAYS_TO_BIRTHDAY = (BIRTHDAY_DATE - NOW)/(1000*3600*24); 
        logger.info("The birthday is in " + DAYS_TO_BIRTHDAY + " days.");

        // if the current date (month + day) matches with the birthday date entered by the user,
        // the keyboard key must blink in red 
        if (CURRENT_MONTH == MONTH_BIRTHDAY && CURRENT_DAY == DAY_BIRTHDAY) {
            logger.info("BirthdayReminder, today is the birthday time.");
            // red
            const COLOR = '#F11512'; 
            
            return new q.Signal({
                points: [
                    [new q.Point(COLOR, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}.`
            });
        } else {
            // if the current date is far from the birthday date, color = green
            let COLOR = '#60F93B'; 
            // the birthday date is in 1 week
            if (DAYS_TO_BIRTHDAY <= 7) {
                // orange
                COLOR = '#C55D11'; 
            }
            // the birthday date is in 2 weeks:
            else if (DAYS_TO_BIRTHDAY <= 14) {
                // yellow/orange
                COLOR = '#D6BD1D'; 
            }
            // the birthday date is in one month
            else if (DAYS_TO_BIRTHDAY <= 30) {
                // yellow
                COLOR = '#F9E53B'; 
            }
            return new q.Signal({
                points: [
                    [new q.Point(COLOR)]
                ],
                name: 'Birthday Reminder',
                message: `The birthday of ${this.config.nameOfTheBirthdayPerson} is on the 
                ${getMonthName(this.config.monthOfTheBirthday)} ${this.config.dayOfTheBirthday}.`
            });
        }
    }
}

// get the name of the month
function getMonthName(MONTH_NUMBER) {
    const MONTH_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    return MONTH_NAME[MONTH_NUMBER];
}

module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
