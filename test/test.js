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
        it('checks the birthday name & if selected keyboard key blinks', async function () {
            // create a configuration: the birthday date is the current date
            const config = getConfigForDate(new Date());
            let app = await buildApp(config);
            return app.run().then((signal) => {
                assert.ok(signal);
                // we check if we receive the signal with the birthday name
                assert(signal.message.includes(config.applet.user.nameOfTheBirthdayPerson));
                // check if the key is blinking
                assert.equal(signal.points[0][0].effect, q.Effects.BLINK);
                // check if the key is red
                assert.equal(signal.points[0][0].color, '#F11512');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('checks color of the selected keyboard key more than 1 month before the birthday date', async function () {
            // today dates
            const today = new Date();
            const dayToCome = new Date();
            // we add more than 1 month to the current day in order to simulate the birthday date 
            dayToCome.setDate(today.getDate() +75);
            const simulatedDate = getConfigForDate(dayToCome);
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal);
                // we check if we receive the signal with the birthday name
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));
                // check if the key is not blinking
                assert.equal(signal.points[0][0].effect, q.Effects.SET_COLOR);
                // checks if the color is green
                assert.equal(signal.points[0][0].color, '#60F93B');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('checks color of the selected keyboard key 1 week before the birthday date', async function () {
            const today = new Date();
            const dayToCome = new Date();
            // we add less than 1 week to the current day in order to simulate the birthday date
            dayToCome.setDate(today.getDate() + 6);
            const simulatedDate = getConfigForDate(dayToCome);            
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal);
                // we check if we receive the signal with the birthday name
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson)); 
                // check if the key is not blinking
                assert.equal(signal.points[0][0].effect, q.Effects.SET_COLOR);
                // checks if the color is yellow
                assert.equal(signal.points[0][0].color, '#C55D11');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('checks color of the selected keyboard key 2 weeks before the birthday date', async function () {
            const today = new Date();
            const dayToCome = new Date();
            // we add less than 2 weeks to the current day in order to simulate the birthday date
            dayToCome.setDate(today.getDate() + 14);
            const simulatedDate = getConfigForDate(dayToCome);
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal);
                // we check if we receive the signal with the birthday name
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));
                // check if the key is not blinking
                assert.equal(signal.points[0][0].effect, q.Effects.SET_COLOR);
                // checks if the color is yellow/orange
                assert.equal(signal.points[0][0].color, '#D6BD1D');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('checks color of the selected keyboard key 1 month before the birthday date', async function () {
            const today = new Date();
            const dayToCome = new Date();
            // we add less than 1 month to the current day in order to simulate the birthday date
            dayToCome.setDate(today.getDate() + 27);
            const simulatedDate = getConfigForDate(dayToCome);
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal.points);
                // we check if we receive the signal with the birthday name
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));
                // check if the key is not blinking
                assert.equal(signal.points[0][0].effect, q.Effects.SET_COLOR);
                // checks if the color is orange
                assert.equal(signal.points[0][0].color, '#F9E53B');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });
})

// This function gives the configuration needed for the birthday date
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

// Build application
async function buildApp(config) {
    let app = new t.BirthdayReminder();
    await app.processConfig(config);
    return app;

}
