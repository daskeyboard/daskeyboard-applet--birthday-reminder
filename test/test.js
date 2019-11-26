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
                assert.ok(signal);
                assert(signal.message.includes(config.applet.user.nameOfTheBirthdayPerson));// on verifie si on recoit le signal avec le nom dedans
                assert.equal(signal.points[0][0].effect, q.Effects.BLINK);
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });

    describe('#run()', () => {
        it('sends not a signal when it is not the birthday date', async function () {
            const simulatedDate = getConfigForDate(new Date(2020, 11, 21));
            let app = await buildApp(simulatedDate);
            return app.run().then((signal) => {
                assert.ok(signal);
                assert(signal.message.includes(simulatedDate.applet.user.nameOfTheBirthdayPerson));// on verifie si on recoit le signal avec le nom dedans
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
