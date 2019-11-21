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

        if (currentMonth == monthOfTheBirthday && currentDay == dayOfTheBirthday) {
            logger.info("BirthdayReminder, you will never forget a birthday.");
            const color = '#00FF00';
            return new q.Signal({
                points: [
                    [new q.Point(color, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}`
            });
            // if the current date (month + day) matches with the birthday date entered by the user,
            // the keyboard key chosen in the dashboard must blink 
        } else {
            return null;
            // not time to blink because the current date doesn't match with the birthday date entered by the user
        }
    }
}

module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
