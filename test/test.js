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
        it('sends a reminder ', async function () {
            let app = await buildApp();
            return buildApp().then(app =>{
                return app.run().then((signal) => {
                    assert.ok(signal);
                    assert(signal.message.includes(defaultConfig.applet.user.nameOfTheBirthdayPerson));
                }).catch((error) => {
                    assert.fail(error)
                });
            })
        });
    });
})

const defaultConfig = {
    applet: {
        user: {
            nameOfTheBirthdayPerson: 'oooo',
            monthOfTheBirthday: 10,
            dayOfTheBirthday: 20
        }
    },
    geometry: {
        width: 1,
        height: 1,
    }
};


async function buildApp(config) {
    let app = new t.BirthdayReminder();
    await app.processConfig(config || defaultConfig);
    return app;

}
