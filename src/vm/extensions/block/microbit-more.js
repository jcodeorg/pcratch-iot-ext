import BLE from './ble';
import WebSerial from './serial-web';

const uint8ArrayToBase64 = array => window.btoa(String.fromCharCode(...array));
const base64ToUint8Array = base64 => {
    const raw = window.atob(base64);
    return Uint8Array.from(Array.prototype.map.call(raw, x => x.charCodeAt(0)));
};

/**
 * Enum for version of the hardware.
 * @readonly
 * @enum {number}
 */
const pcratchiot_HardwareVersion =
{
    MICROBIT_V1: 1,
    MICROBIT_V2: 2
};

/**
 * Communication route between Scratch and Pcratch IoT
 *
 */
const CommunicationRoute = {
    BLE: 0,
    SERIAL: 1
};

/**
 * Enum for Pcratch IoT BLE command protocol.
 * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
 * @readonly
 * @enum {number}
 */
const BLECommand = {
    CMD_CONFIG: 0x00,
    CMD_PIN: 0x01,
    CMD_DISPLAY: 0x02,
    CMD_AUDIO: 0x03,
    CMD_DATA: 0x04,
    CMD_PIOT: 0x05  // for Pcratch IoT
};

/**
 * Enum for command about gpio pins.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PinCommand =
{
    SET_OUTPUT: 0x01,
    SET_PWM: 0x02,
    SET_SERVO: 0x03,
    SET_PULL: 0x04,
    SET_EVENT: 0x05
};

/**
 * Enum for command about gpio pins.
 * @readonly
 * @enum {number}
 */
const pcratchiot_DisplayCommand =
{
    CLEAR: 0x00,
    TEXT: 0x01,
    PIXELS_0: 0x02,
    PIXELS_1: 0x03
};

/**
 * Enum for PcratchIoT.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PIOTCommand =
{
    NEOPIXEL: 0x01
};

/**
 * Enum for data format.
 * @readonly
 * @enum {number}
 */
const pcratchiot_DataFormat = {
    CONFIG: 0x10, // not used at this version
    PIN_EVENT: 0x11,
    ACTION_EVENT: 0x12,
    DATA_NUMBER: 0x13,
    DATA_TEXT: 0x14
};

/**
 * Enum for action event type.
 * @readonly
 * @enum {number}
 */
const pcratchiot_ActionEvent = {
    BUTTON: 0x01,
    GESTURE: 0x02
};

/**
 * Enum for ID of pin-mode
 * @readonly
 * @enum {string}
 */
const pcratchiot_PinMode = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
    PWM: 'PWM',
    SERVO: 'SERVO',
    TOUCH: 'TOUCH'
};

/**
 * Enum for componentID of buttons
 * @readonly
 * @enum {string}
 */
const pcratchiot_ButtonID = {
    1: 'A',
    2: 'B',
    100: 'P0',
    101: 'P1',
    102: 'P2',
    121: 'LOGO'
};

/**
 * Enum for index in data of button state
 * @readonly
 * @enum {number}
 */
const pcratchiot_ButtonStateIndex = {
    P0: 0,
    P1: 1,
    P2: 2,
    A: 3,
    B: 4,
    LOGO: 5
};

/**
 * Enum for ID of event from button
 * @readonly
 * @enum {string}
 */
const pcratchiot_ButtonEventID = {
    1: 'DOWN',
    2: 'UP',
    3: 'CLICK',
    4: 'LONG_CLICK',
    5: 'HOLD',
    6: 'DOUBLE_CLICK'
};

/**
 * Enum for ID of gesture.
 * @readonly
 * @enum {string}
 */
const pcratchiot_GestureID =
{
    1: 'TILT_UP',
    2: 'TILT_DOWN',
    3: 'TILT_LEFT',
    4: 'TILT_RIGHT',
    5: 'FACE_UP',
    6: 'FACE_DOWN',
    7: 'FREEFALL',
    8: 'G3',
    9: 'G6',
    10: 'G8',
    11: 'SHAKE'
};

/**
 * Enum for data type of data-sending.
 * @readonly
 * @enum {number}
 */
const pcratchiot_SendingDataType = {
    NUMBER: 1,
    TEXT: 2
};

/**
 * Enum for sub-command about configurations.
 * @readonly
 * @enum {number}
 */
const pcratchiot_Config =
{
    MIC: 0x01,
    TOUCH: 0x02
};

/**
 * Enum for sub-command about audio.
 * @readonly
 * @enum {number}
 */
const pcratchiot_AudioCommand =
{
    STOP_TONE: 0x00,
    PLAY_TONE: 0x01
};

/**
 * A time interval to wait (in milliseconds) before reporting to the BLE socket
 * that data has stopped coming from the peripheral.
 */
const BLETimeout = 4500;

/**
 * A string to report to the BLE socket when the Pcratch IoT has stopped receiving data.
 * @type {string}
 */
const BLEDataStoppedError = 'Pcratch IoT extension stopped receiving data';

const MM_SERVICE = {
    ID: '0b50f3e4-607f-4151-9091-7d008d6ffc5c',
    COMMAND_CH: '0b500100-607f-4151-9091-7d008d6ffc5c',
    STATE_CH: '0b500101-607f-4151-9091-7d008d6ffc5c',
    MOTION_CH: '0b500102-607f-4151-9091-7d008d6ffc5c',
    PIN_EVENT_CH: '0b500110-607f-4151-9091-7d008d6ffc5c',
    ACTION_EVENT_CH: '0b500111-607f-4151-9091-7d008d6ffc5c',
    ANALOG_IN_CH: [
        '0b500120-607f-4151-9091-7d008d6ffc5c',
        '0b500121-607f-4151-9091-7d008d6ffc5c',
        '0b500122-607f-4151-9091-7d008d6ffc5c'
    ],
    MESSAGE_CH: '0b500130-607f-4151-9091-7d008d6ffc5c'
};

/**
 * Enum for axis menu options.
 * @readonly
 * @enum {string}
 */
const AxisSymbol = {
    X: 'x',
    Y: 'y',
    Z: 'z',
    Absolute: 'absolute'
};

/**
 * The unit-value of the gravitational acceleration from Pcratch IoT.
 * @type {number}
 */
const G = 1024;

/**
 * Manage communication with a MicroBit peripheral over a Scrath Link client socket.
 */
export class PcratchIoT {

    /**
     * Construct a MicroBit communication object.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     * @param {string} extensionId - the id of the extension
     */
    constructor (runtime, extensionId) {

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
        this.runtime = runtime;

        /**
         * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
         * @type {BLE}
         * @private
         */
        this._ble = null;
        this.runtime.registerPeripheralExtension(extensionId, this);

        /**
         * The id of the extension this peripheral belongs to.
         */
        this._extensionId = extensionId;

        this.digitalLevel = {};
        this.lightLevel = 0;
        this.temperature = 0;
        this.soundLevel = 0;
        this.pitch = 0;
        this.roll = 0;
        this.acceleration = {
            x: 0,
            y: 0,
            z: 0
        };
        this.compassHeading = 0;
        this.magneticForce = {
            x: 0,
            y: 0,
            z: 0
        };

        this.buttonState = {};

        /**
         * The most recently received button events for each buttons.
         * @type {Object} - Store of buttons which has events.
         * @private
         */
        this.buttonEvents = {};
        Object.keys(pcratchiot_ButtonStateIndex).forEach(name => {
            this.buttonEvents[name] = {};
        });

        /**
         * The most recently received gesture events.
         * @type {Object <number, number>} - Store of gesture ID and timestamp.
         * @private
         */
        this.gestureEvents = {};


        /**
         * The most recently received events for each pin.
         * @type {Object} - Store of pins which has events.
         * @private
         */
        this._pinEvents = {};

        /**
         * The most recently received data from Pcratch IoT.
         * @type {Object} - Store of received data
         * @private
         */
        this.receivedData = {};

        this.analogIn = [0, 1, 2];
        this.analogValue = [];
        this.analogIn.forEach(pinIndex => {
            this.analogValue[pinIndex] = 0;
        });

        // this.gpio = [0, 1, 2, 8, 12, 13, 14, 15, 16];
        this.gpio = [0, 1, 2, 16, 17, 18, 19, 20, 21];
        this.gpio.forEach(pinIndex => {
            this.digitalLevel[pinIndex] = 0;
        });

        /**
         * Interval ID for data reading timeout.
         * @type {number}
         * @private
         */
        this._timeoutID = null;

        /**
         * A flag that is true while we are busy sending data to the BLE socket.
         * @type {boolean}
         * @private
         */
        this.bleBusy = true;

        /**
         * ID for a timeout which is used to clear the busy flag if it has been
         * true for a long time.
         */
        this.bleBusyTimeoutID = null;

        this.onDisconnect = this.onDisconnect.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this.onNotify = this.onNotify.bind(this);

        this.stopTone = this.stopTone.bind(this);
        if (this.runtime) {
            this.runtime.on('PROJECT_STOP_ALL', this.stopTone);
        }

        this.analogInUpdateInterval = 100; // milli-seconds
        this.analogInLastUpdated = [Date.now(), Date.now(), Date.now()];

        /**
         * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
         * @type {number}
         */
        this.sendCommandInterval = 30;

        this.initConfig();

        // keyboard state monitor
        this.keyState = {};
        document.body.addEventListener('keydown', e => {
            this.keyState[e.code] = {
                key: e.key,
                code: e.code,
                alt: e.altKey,
                ctrl: e.ctrlKey,
                meta: e.metaKey,
                shift: e.shiftKey
            };
        });
        document.body.addEventListener('keyup', e => {
            delete this.keyState[e.code];
        });
    }

    /**
     * Initialize configuration of the Pcratch IoT.
     */
    initConfig () {
        this.config = {};
        this.config.mic = false;
        this.config.pinMode = {};
    }

    /**
     * Start updating process for Pcratch IoT state and motion.
     */
    startUpdater () {
        if (this.updater) {
            clearTimeout(this.updater);
        }
        if (this.bleAccessWaiting) {
            this.updater = setTimeout(() => this.startUpdater(), 0);
            return;
        }
        this.updateState()
            .then(() => this.updateMotion())
            .finally(() => {
                this.updater = setTimeout(
                    () => this.startUpdater(),
                    this.microbitUpdateInterval
                );
            });
    }

    /**
     * Stop updating process for Pcratch IoT state and motion.
     */
    stopUpdater () {
        clearTimeout(this.updater);
    }

    /**
     * @param {string} text - the text to display.
     * @param {number} delay - The time to delay between characters, in milliseconds.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    displayText (text, delay, util) {
        const textLength = Math.min(18, text.length);
        const textData = new Uint8Array(textLength + 1);
        for (let i = 0; i < textLength; i++) {
            textData[i] = text.charCodeAt(i);
        }
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_DISPLAY << 5) | pcratchiot_DisplayCommand.TEXT,
                message: new Uint8Array([
                    Math.min(255, (Math.max(0, delay) / 10)),
                    ...textData
                ])
            }],
            util
        );
    }

    /**
     * Send display pixcels command to Pcratch IoT.
     * @param {Array.<Array.<number>>} matrix - pattern to display.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    displayPixels (matrix, util) {
        const cmdSet = [
            {
                id: (BLECommand.CMD_DISPLAY << 5) | pcratchiot_DisplayCommand.PIXELS_0,
                message: new Uint8Array([
                    ...matrix[0],
                    ...matrix[1],
                    ...matrix[2]
                ])
            },
            {
                id: (BLECommand.CMD_DISPLAY << 5) | pcratchiot_DisplayCommand.PIXELS_1,
                message: new Uint8Array([
                    ...matrix[3],
                    ...matrix[4]
                ])
            }
        ];
        return this.sendCommandSet(cmdSet, util);
    }

    /**
     * Set pull mode to the pin.
     * @param {number} pinIndex - index of the pin
     * @param {pcratchiot_PullModeID} pullMode - pull mode to set
     * @param {BlockUtility} util - utility object provided from the runtime
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPullMode (pinIndex, pullMode, util) {
        this.config.pinMode[pinIndex] = pcratchiot_PinMode.INPUT;
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | pcratchiot_PinCommand.SET_PULL,
                message: new Uint8Array([
                    pinIndex,
                    pullMode
                ])
            }],
            util
        );
    }

    /**
     * Set pin to digital output mode on the level.
     * @param {number} pinIndex - Index of pin.
     * @param {boolean} level - Value in digital (true = High)
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinOutput (pinIndex, level, util) {
        this.config.pinMode[pinIndex] = pcratchiot_PinMode.OUTPUT;
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | pcratchiot_PinCommand.SET_OUTPUT,
                message: new Uint8Array(
                    [
                        pinIndex,
                        (level ? 1 : 0)
                    ]
                )
            }],
            util
        );
    }

    /**
     * Set the pin to PWM mode on the level.
     * @param {number} pinIndex - index of the pin
     * @param {number} level - value of analog output [0..1024].
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinPWM (pinIndex, level, util) {
        this.config.pinMode[pinIndex] = pcratchiot_PinMode.PWM;
        const dataView = new DataView(new ArrayBuffer(2));
        dataView.setUint16(0, level, true);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | pcratchiot_PinCommand.SET_PWM,
                message: new Uint8Array(
                    [
                        pinIndex,
                        dataView.getUint8(0),
                        dataView.getUint8(1)
                    ]
                )
            }],
            util
        );
    }


    /**
     * Set the pin to Servo mode on the angle in the range and center.
     * @param {number} pinIndex - index of the pin.
     * @param {number} angle - the level to set on the output pin, in the range 0 - 180.
     * @param {number} range - the span of possible values. '0' means default(2000).
     * @param {number} center - the center point from which to calculate the lower and upper bounds.
     *                          '0' means default(1500).
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinServo (pinIndex, angle, range, center, util) {
        this.config.pinMode[pinIndex] = pcratchiot_PinMode.SERVO;
        if (!range || range < 0) range = 0;
        if (!center || center < 0) center = 0;
        const dataView = new DataView(new ArrayBuffer(6));
        dataView.setUint16(0, angle, true);
        dataView.setUint16(2, range, true);
        dataView.setUint16(4, center, true);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | pcratchiot_PinCommand.SET_SERVO,
                message: new Uint8Array(
                    [
                        pinIndex,
                        dataView.getUint8(0),
                        dataView.getUint8(1),
                        dataView.getUint8(2),
                        dataView.getUint8(3),
                        dataView.getUint8(4),
                        dataView.getUint8(5)
                    ]
                )
            }],
            util);
    }

    /**
     * Read light level from the light sensor.
     * @param {object} util - utility object provided by the runtime.
     * @return {number} - value of the light level [0..255].
     */
    readLightLevel () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.lightLevel;
    }

    /**
     * Update data of the analog input.
     * @param {number} pinIndex - index of the pin to get value.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves value of analog input or undefined if this process was yield.
     */
    readAnalogIn (pinIndex, util) {
        if (!this.isConnected()) {
            return Promise.resolve(0);
        }
        if ((Date.now() - this.analogInLastUpdated[pinIndex]) < this.analogInUpdateInterval) {
            return Promise.resolve(this.analogValue[pinIndex]);
        }
        if (this.bleBusy) {
            this.bleAccessWaiting = true;
            if (util) util.yield(); // re-try this call after a while.
            return; // Do not return Promise.resolve() to re-try.
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
            this.bleAccessWaiting = false;
        }, 1000);
        return new Promise(resolve => this._ble.read(
            MM_SERVICE.ID,
            MM_SERVICE.ANALOG_IN_CH[pinIndex],
            false)
            .then(result => {
                window.clearTimeout(this.bleBusyTimeoutID);
                this.bleBusy = false;
                this.bleAccessWaiting = false;
                if (!result) {
                    return resolve(this.analogValue[pinIndex]);
                }
                const data = base64ToUint8Array(result.message);
                const dataView = new DataView(data.buffer, 0);
                this.analogValue[pinIndex] = dataView.getUint16(0, true);
                this.analogInLastUpdated = Date.now();
                resolve(this.analogValue[pinIndex]);
            })
        );
    }

    /**
     * Update data of digital level, light level, temperature, sound level.
     * @return {Promise} - a Promise that resolves updated data holder.
     */
    updateState () {
        if (!this.isConnected()) return Promise.resolve(this);
        if (this.bleBusy) {
            return Promise.resolve(this);
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
        }, 1000);
        return new Promise(resolve => {
            this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.STATE_CH,
                false)
                .then(result => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                    this.bleBusy = false;
                    if (!result) return resolve(this);
                    const data = base64ToUint8Array(result.message);
                    const dataView = new DataView(data.buffer, 0);
                    // Digital Input
                    const gpioData = dataView.getUint32(0, true);
                    for (let i = 0; i < this.gpio.length; i++) {
                        this.digitalLevel[this.gpio[i]] = (gpioData >> this.gpio[i]) & 1;
                    }
                    Object.keys(pcratchiot_ButtonStateIndex).forEach(
                        name => {
                            this.buttonState[name] = (gpioData >> (24 + pcratchiot_ButtonStateIndex[name])) & 1;
                        });
                    this.lightLevel = dataView.getUint8(4);
                    this.temperature = dataView.getUint8(5) - 128;
                    this.soundLevel = dataView.getUint8(6);
                    this.resetConnectionTimeout();
                    resolve(this);
                });
        });
    }

    /**
     * Read temperature (integer in celsius) from the Pcratch IoT cpu.
     * @return {number} - degrees of temperature [centigrade].
     */
    readTemperature () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.temperature;
    }

    /**
     * Configure microphone.
     * @param {boolean} use - true to use microphone.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves state of the microphone or undefined if the process was yield.
     */
    configMic (use, util) {
        use = (use === true);
        if (!this.isConnected()) {
            return Promise.resolve(false);
        }
        if (this.config.mic === use) {
            return Promise.resolve(this.config.mic);
        }
        const sendPromise = this.sendCommandSet(
            [{
                id: (BLECommand.CMD_CONFIG << 5) | pcratchiot_Config.MIC,
                message: new Uint8Array([(use ? 1 : 0)]) // use microphone
            }],
            util
        );
        if (sendPromise) {
            return sendPromise
                .then(() => {
                    this.config.mic = use;
                    return this.config.mic;
                });
        }
        return;
    }

    /**
     * Play tone on the speaker.
     * @param {number} frequency - wave frequency to play [Hz]
     * @param {number} volume laudness of tone [%]
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
     */
    playTone (frequency, volume, util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        const frequencyData = new DataView(new ArrayBuffer(4));
        frequencyData.setUint32(0, Math.round(1000000 / frequency), true);
        volume = Math.round(volume * 0xff / 100);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_AUDIO << 5) | pcratchiot_AudioCommand.PLAY_TONE,
                message: new Uint8Array([
                    frequencyData.getUint8(0),
                    frequencyData.getUint8(1),
                    frequencyData.getUint8(2),
                    frequencyData.getUint8(3),
                    volume
                ])
            }],
            util
        );
    }

    /**
     * Stop playing tone on the speaker.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
     */
    stopTone (util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_AUDIO << 5) | pcratchiot_AudioCommand.STOP_TONE,
                message: new Uint8Array([])
            }],
            util
        );
    }

    /**
     * Read sound level.
     * @return {number} - level of loudness (0 .. 255).
     */
    readSoundLevel () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.soundLevel;
    }

    /**
     * Update data of acceleration, magnetic force.
     * @return {Promise} - a Promise that resolves updated data holder.
     */
    updateMotion () {
        if (!this.isConnected()) return Promise.resolve(this);
        if (this.bleBusy) {
            return Promise.resolve(this);
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
        }, 1000);
        return new Promise(resolve => {
            this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.MOTION_CH,
                false)
                .then(result => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                    this.bleBusy = false;
                    if (!result) return resolve(this);
                    const data = base64ToUint8Array(result.message);
                    const dataView = new DataView(data.buffer, 0);
                    // Accelerometer
                    this.pitch = Math.round(dataView.getInt16(0, true) * 180 / Math.PI / 1000);
                    this.roll = Math.round(dataView.getInt16(2, true) * 180 / Math.PI / 1000);
                    this.acceleration.x = 1000 * dataView.getInt16(4, true) / G;
                    this.acceleration.y = 1000 * dataView.getInt16(6, true) / G;
                    this.acceleration.z = 1000 * dataView.getInt16(8, true) / G;
                    // Magnetometer
                    this.compassHeading = dataView.getUint16(10, true);
                    this.magneticForce.x = dataView.getInt16(12, true);
                    this.magneticForce.y = dataView.getInt16(14, true);
                    this.magneticForce.z = dataView.getInt16(16, true);
                    this.resetConnectionTimeout();
                    resolve(this);
                });
        });
    }

    /**
     * Read pitch [degrees] of the Pcratch IoT heading direction.
     * @return {number} - degree of pitch.
     */
    readPitch () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.pitch;
    }

    /**
     * Read roll [degrees] of the Pcratch IoT heading direction.
     * @return {number} - degree of roll.
     */
    readRoll () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.roll;
    }

    /**
     * Read the value of gravitational acceleration [milli-g] for the axis.
     * @param {AxisSymbol} axis - direction of acceleration.
     * @return {number} - value of acceleration.
     */
    readAcceleration (axis) {
        if (!this.isConnected()) {
            return 0;
        }
        if (axis === AxisSymbol.Absolute) {
            return Math.round(
                Math.sqrt(
                    (this.acceleration.x ** 2) +
                            (this.acceleration.y ** 2) +
                            (this.acceleration.z ** 2)
                )
            );
        }
        return this.acceleration[axis];
    }

    /**
     * Read the angle (degrees) of heading direction from the north.
     * @return {number} - degree of compass heading.
     */
    readCompassHeading () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.compassHeading;
    }


    /**
     * Read value of magnetic force [micro teslas] for the axis.
     * @param {AxisSymbol} axis - direction of magnetic force.
     * @return {number} - value of magnetic force.
     */
    readMagneticForce (axis) {
        if (!this.isConnected()) {
            return 0;
        }
        if (axis === AxisSymbol.Absolute) {
            return Math.round(
                Math.sqrt(
                    (this.magneticForce.x ** 2) +
                            (this.magneticForce.y ** 2) +
                            (this.magneticForce.z ** 2)
                )
            );
        }
        return this.magneticForce[axis];
    }

    /**
     * Start to scan Bluetooth LE devices to find Pcratch IoT with MicroBit More service.
     */
    scanBLE () {
        const connectorClass = BLE;
        this._ble = new connectorClass(
            this.runtime,
            this._extensionId,
            {
                filters: [
                    {namePrefix: 'BBC micro:bit'},
                    {namePrefix: 'PcratchIoT'},
                    {services: [MM_SERVICE.ID]}
                ]
            },
            this._onConnect,
            this.onDisconnect
        );
    }

    /**
     * Start to scan USB serial devices to find Pcratch IoT v2.
     */
    scanSerial () {
        this._ble = new WebSerial(
            this.runtime,
            this._extensionId,
            {
                filters: [
                    {usbVendorId: 0x0d28, usbProductId: 0x0204}
                ]
            },
            this._onConnect,
            this.onDisconnect
        );
    }

    /**
     * Whether the key is pressed at this moment.
     * @param {string} key - key in keyboard event
     * @returns {boolean} - return true when the key is pressed
     */
    isKeyPressing (key) {
        return Object.values(this.keyState).find(state => state.key === key);
    }

    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.bleBusy = true;
        if (('serial' in navigator) && this.isKeyPressing('Shift')) {
            this.scanSerial();
        } else {
            this.scanBLE();
        }
        // The key state is cleared because the keyup event will be dropped by the browser dialog.
        this.keyState = {};
    }

    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    /**
     * Disconnect from the Pcratch IoT.
     */
    disconnect () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.onDisconnect();
    }

    /**
     * Reset all the state and timeout/interval ids.
     */
    onDisconnect () {
        this.stopUpdater();
        if (this._timeoutID) {
            window.clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }

    /**
     * Return true if connected to the Pcratch IoT.
     * @return {boolean} - whether the Pcratch IoT is connected.
     */
    isConnected () {
        let connected = false;
        if (this._ble) {
            connected = this._ble.isConnected();
        }
        return connected;
    }

    /**
     * Send a command to Pcratch IoT.
     * @param {object} command command to send.
     * @param {number} command.id ID of the command.
     * @param {Uint8Array} command.message Contents of the command.
     * @return {Promise} a Promise that resolves when the data was sent and after send command interval.
     */
    sendOneCommand (command) {
        console.log('sendOneCommand M4');
        const data = new Uint8Array([
            command.id,
            ...command.message
        ])
        return this._ble.write(
            MM_SERVICE.ID,
            MM_SERVICE.COMMAND_CH,
            data,
            null,
            true // true // resolve after peripheral's response. // false
        )
    }

    /**
     * コマンドを順次処理し、すべてのコマンドが終了したら解決するプロミスを返却
     * @param {Array.<{id: number, message: Uint8Array}>} commands array of command.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {Promise} a Promise that resolves when all commands are processed.
     */
    sendCommandSet(commands, util) {
        return new Promise((resolve, reject) => {
            const processNextCommand = (index) => {
                if (index >= commands.length) {
                    resolve();
                    return;
                }

                const command = commands[index];
                this.sendOneCommand(command)
                    .then(() => {
                        setTimeout(() => processNextCommand(index + 1), 1); // 1ms: sendCommandInterval
                    })
                    .catch(error => {
                        console.error('Error processing command:', error);
                        reject(error);
                    });
            };

            processNextCommand(0);
        });
    }
    
    /**
     * Starts reading data from peripheral after BLE has connected to it.
     */
    _onConnect () {
        this._ble.read(
            MM_SERVICE.ID,
            MM_SERVICE.COMMAND_CH,
            false)
            .then(result => {
                if (!result) {
                    throw new Error('Config is not readable');
                }
                const data = base64ToUint8Array(result.message);
                const dataView = new DataView(data.buffer, 0);
                this.hardware = dataView.getUint8(0);
                this.protocol = dataView.getUint8(1);
                this.route = dataView.getUint8(2);
                this._ble.startNotifications(
                    MM_SERVICE.ID,
                    MM_SERVICE.ACTION_EVENT_CH,
                    this.onNotify);
                this._ble.startNotifications(
                    MM_SERVICE.ID,
                    MM_SERVICE.PIN_EVENT_CH,
                    this.onNotify);
                if (this.hardware === pcratchiot_HardwareVersion.MICROBIT_V1) {
                    this.microbitUpdateInterval = 100; // milliseconds
                } else {
                    this._ble.startNotifications(
                        MM_SERVICE.ID,
                        MM_SERVICE.MESSAGE_CH,
                        this.onNotify);
                    this.microbitUpdateInterval = 50; // milliseconds
                }
                if (this.route === CommunicationRoute.SERIAL) {
                    this.sendCommandInterval = 100; // milliseconds
                } else {
                    this.sendCommandInterval = 30; // milliseconds
                }
                this.initConfig();
                this.bleBusy = false;
                this.startUpdater();
                this.resetConnectionTimeout();
            })
            .catch(err => this._ble.handleDisconnectError(err));
    }

    /**
     * Process the data from the incoming BLE characteristic.
     * @param {string} msg - the incoming BLE data.
     * @private
     */
    onNotify (msg) {
        const data = base64ToUint8Array(msg);
        const dataView = new DataView(data.buffer, 0);
        const dataFormat = dataView.getUint8(19);
        if (dataFormat === pcratchiot_DataFormat.ACTION_EVENT) {
            const actionEventType = dataView.getUint8(0);
            if (actionEventType === pcratchiot_ActionEvent.BUTTON) {
                const buttonName = pcratchiot_ButtonID[dataView.getUint16(1, true)];
                const eventName = pcratchiot_ButtonEventID[dataView.getUint8(3)];
                this.buttonEvents[buttonName][eventName] = dataView.getUint32(4, true); // Timestamp
            } else if (actionEventType === pcratchiot_ActionEvent.GESTURE) {
                const gestureName = pcratchiot_GestureID[dataView.getUint8(1)];
                this.gestureEvents[gestureName] = dataView.getUint32(2, true); // Timestamp
            }
        } else if (dataFormat === pcratchiot_DataFormat.PIN_EVENT) {
            const pinIndex = dataView.getUint8(0);
            if (!this._pinEvents[pinIndex]) {
                this._pinEvents[pinIndex] = {};
            }
            const event = dataView.getUint8(1);
            this._pinEvents[pinIndex][event] =
            {
                value: dataView.getUint32(2, true), // timesamp of the edge or duration of the pulse
                timestamp: Date.now() // received time
            };
        } else if (dataFormat === pcratchiot_DataFormat.DATA_NUMBER) {
            const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
            this.receivedData[label] =
            {
                content: dataView.getFloat32(8, true),
                timestamp: Date.now()
            };
        } else if (dataFormat === pcratchiot_DataFormat.DATA_TEXT) {
            const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
            this.receivedData[label] =
            {
                content: new TextDecoder().decode(data.slice(8, 20).filter(char => (char !== 0))),
                timestamp: Date.now()
            };
        }
        this.resetConnectionTimeout();
    }

    /**
     * Cancel disconnect timeout and start counting again.
     */
    resetConnectionTimeout () {
        if (this._timeoutID) window.clearTimeout(this._timeoutID);
        this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
    }

    /**
     * Return whether the pin value is high.
     * @param {number} pin - the pin to check.
     * @return {boolean} - whether the pin is high or not.
     */
    isPinHigh (pin) {
        const level = this.readDigitalLevel(pin);
        return level === 1;
    }

    /**
     * Read digital input from the pin.
     * @param {number} pin - the pin to read.
     * @return {number} - digital input value of the pin [0|1].
     */
    readDigitalLevel (pin) {
        if (!this.isConnected()) {
            return 0;
        }
        return this.digitalLevel[pin];
    }

    /**
     * Return whether the button is pressed.
     * @param {string} buttonName - name of the button
     * @return {boolean} - true when it is pressed
     */
    isButtonPressed (buttonName) {
        if (!this.isConnected()) {
            return false;
        }
        return this.buttonState[buttonName] === 1;
    }

    /**
     * Return whether the pin is touch-mode.
     * @param {number} pinIndex - indesx of the pin
     * @return {boolean} - true when it is touch-mode
     */
    isPinTouchMode (pinIndex) {
        return this.config.pinMode[pinIndex] === pcratchiot_PinMode.TOUCH;
    }

    /**
     * Configurate touch mode of the pin.
     * @param {number} pinIndex - index of the pin as a button.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves when configured or undefined if the process was yield.
     */
    configTouchPin (pinIndex, util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        if (this.isPinTouchMode(pinIndex)) {
            return Promise.resolve();
        }
        const sendPromise = this.sendCommandSet(
            [{
                id: (BLECommand.CMD_CONFIG << 5) | pcratchiot_Config.TOUCH,
                message: new Uint8Array([
                    pinIndex,
                    1
                ])
            }],
            util
        );
        if (sendPromise) {
            return sendPromise
                .then(() => {
                    this.config.pinMode[pinIndex] = pcratchiot_PinMode.TOUCH;
                });
        }
        return;
    }

    /**
     * Return whether the touche-pin is touched.
     * @param {string} buttonName - ID to check.
     * @return {boolean} - whether the id is high or not.
     */
    isTouched (buttonName) {
        if (!this.isConnected()) {
            return false;
        }
        return this.buttonState[buttonName] === 1;
    }

    /**
     * Return the last timestamp of the button event or undefined if the event is not received.
     * @param {pcratchiot_ButtonName} buttonName - name of the button to get the event.
     * @param {pcratchiot_ButtonEventName} eventName - name of event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getButtonEventTimestamp (buttonName, eventName) {
        if (this.buttonEvents[buttonName] && this.buttonEvents[buttonName][eventName]) {
            return this.buttonEvents[buttonName][eventName];
        }
        return null;
    }

    /**
     * Return the last timestamp of the gesture event or undefined if the event is not received.
     * @param {pcratchiot_GestureName} gestureName - name of the event.
     * @return {?number} Timestamp of the last event or null.
     */
    getGestureEventTimestamp (gestureName) {
        if (this.gestureEvents[gestureName]) {
            return this.gestureEvents[gestureName];
        }
        return null;
    }

    /**
     * Return the last value of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {pcratchiot_PinEvent} event - event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getPinEventValue (pinIndex, event) {
        if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
            return this._pinEvents[pinIndex][event].value;
        }
        return null;
    }

    /**
     * Return the last timestamp of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {pcratchiot_PinEvent} event - event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getPinEventTimestamp (pinIndex, event) {
        if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
            return this._pinEvents[pinIndex][event].timestamp;
        }
        return null;
    }

    /**
     * Set event type to be get from the pin.
     * @param {number} pinIndex - Index of the pin to set.
     * @param {pcratchiot_PinEventType} eventType - Event type to set.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    listenPinEventType (pinIndex, eventType, util) {
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | pcratchiot_PinCommand.SET_EVENT,
                message: new Uint8Array([
                    pinIndex,
                    eventType
                ])
            }],
            util
        );
    }

    /**
     * Send data to Pcratch IoT.
     * @param {string} label - label of the data [ascii]
     * @param {string} content - content of the data [ascii | number]
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when sending done or undefined if this process was yield.
     */
    sendData (label, content, util) {
        const labelData = new Array(8)
            .fill()
            .map((_value, index) => label.charCodeAt(index));
        const contentNumber = Number(content);
        let contentData;
        let type;
        if (Number.isNaN(contentNumber)) {
            type = pcratchiot_SendingDataType.TEXT;
            contentData = content
                .split('')
                .map(ascii => ascii.charCodeAt(0))
                .slice(0, 11);
        } else {
            type = pcratchiot_SendingDataType.NUMBER;
            const dataView = new DataView(new ArrayBuffer(4));
            dataView.setFloat32(0, contentNumber, true);
            contentData = [
                dataView.getUint8(0),
                dataView.getUint8(1),
                dataView.getUint8(2),
                dataView.getUint8(3)
            ];
        }
        return this.sendCommandSet(
            [{
                id: ((BLECommand.CMD_DATA << 5) | type),
                message: new Uint8Array([
                    ...labelData,
                    ...contentData])
            }],
            util);
    }

    /**
     * Return the last data with the label or undefined if no data received with the label.
     * @param {string} label - label to get.
     * @return {?(number | string)} data of the label or null.
     */
    getDataLabeled (label) {
        if (this.receivedData[label]) {
            return this.receivedData[label].content;
        }
        return null;
    }

    /**
     * Return the last timestamp of the data or undefined if the data is not received.
     * @param {string} label - label of the data.
     * @return {?number} Timestamp of the last data or null.
     */
    getDataTimestamp (label) {
        if (this.receivedData[label]) {
            return this.receivedData[label].timestamp;
        }
        return null;
    }

    /**
     * Set NeoPixcel Color
     * @property {number} args.N - number.
     * @property {string} args.COLOR - Comma-separated RGB string.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when sending done or undefined if this process was yield.
     */
    setNeoPixcelColor(n, color, util) {
        let r, g, b;
        try {
            [r, g, b] = color.split(',').map(Number);
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                throw new Error('Invalid RGB values');
            }
        } catch (error) {
            console.error('Error parsing RGB values:', error);
            r = 0;
            g = 0;
            b = 0;
        }
        // NeoPixel の色を設定するためのコマンドを作成
        const command = {
            id: (BLECommand.CMD_PIOT << 5) | pcratchiot_PIOTCommand.NEOPIXEL,
            message: new Uint8Array([n, r, g, b])
        };
        // コマンドを送信
        return this.sendCommandSet([command], util);
    }


}
