const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger


class BirthdayReminder extends q.DesktopApp {

    constructor() {
        super();
        this.pollingInterval = 7200000;
        logger.info("BirthdayReminder, Birthday Reminder ready to go!");
    }

    async run() {
        var now = new Date();
        var currentMonth = now.getMonth();
        var currentDay = now.getDate();

        const monthOfTheBirthday = this.config.monthOfTheBirthday;
        const dayOfTheBirthday = this.config.dayOfTheBirthday;

        if (currentMonth == monthOfTheBirthday && currentDay == dayOfTheBirthday) {

            logger.info("BirthdayReminder, you will never forget a birthday.");
            return new q.Signal({
                points: [
                    [new q.Point(this.config.reminderColor, q.Effects.BLINK)]
                ],
                name: 'Birthday Reminder',
                message: `Today is the birthday of ${this.config.nameOfTheBirthdayPerson}`
            });
        } else {
            const color = '#000000';
            return new q.Signal({
                points: [
                    [new q.Point(color)]
                ]
            });
            // not time to blink
        }
    }
}


module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();
