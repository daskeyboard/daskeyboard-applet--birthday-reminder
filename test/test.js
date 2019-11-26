const q = require('daskeyboard-applet');
var assert = require('assert');
const t = require('../index');

const {
    BirthdayReminder
} = require('../index');

describe('BirthdayReminder', () => {
    describe('#constructor()', function () {
        it('should construct', function () {
            let app = new BirthdayReminder();
            assert.ok(app);
        });
    });
    describe('#run()', () => {
        it('sends a signal with the name of the birthday person in the signal message when it is the birthday date + check if the keyboard key', async function () {
            const config = getConfigForDate(new Date());// create a configuration: the birthday date is the current date
            console.log('<<<<<<', config.applet.user.monthOfTheBirthday+5);
            let app = await buildApp(config);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                assert(signal.message.includes(config.applet.user.nameOfTheBirthdayPerson));// we check if we receive the signal with the birthday name
                assert.equal(signal.points[0][0].effect, q.Effects.BLINK);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('the current date is far from the birthday date', async function () {
            const simulatedDate = getConfigForDate(new Date(2019, 05, 21));
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));// we check if we receive the signal with the birthday name
                console.log('<<<<<<<<<far from the birthday date:', signal.points);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('1 week before the birthday date', async function () {
            const simulatedDate = getConfigForDate(new Date(2019, 10, 28));
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));// we check if we receive the signal with the birthday name
                console.log('<<<<<<<<<1 week:', signal.points);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('2 week before the birthday date', async function () {
            const simulatedDate = getConfigForDate(new Date(2019, 11, 06));
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));// we check if we receive the signal with the birthday name
                console.log('<<<<<<<<<2 week:', signal.points);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('1 month before the birthday date', async function () {
            const simulatedDate = getConfigForDate(new Date(2019, 11, 24));
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));// we check if we receive the signal with the birthday name
                console.log('<<<<<<<<<1 month:', signal.points);
                //assert.equal(signal, null);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });
})

//This function gives the configuration needed for the birthday date
function getConfigForDate(date) {
    const defaultConfig = {
        applet: {
            user: {
                nameOfTheBirthdayPerson: 'Toto',
                monthOfTheBirthday: date.getMonth(),
                dayOfTheBirthday: date.getDate()
            }
        },
        geometry: {
            width: 1,
            height: 1,
        }
    };
    return defaultConfig;
}

//Build application
async function buildApp(config) {
    let app = new t.BirthdayReminder();
    await app.processConfig(config);
    return app;

}
