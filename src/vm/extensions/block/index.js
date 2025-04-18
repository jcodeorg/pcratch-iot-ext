import ArgumentType from '../../extension-support/argument-type';
import BlockType from '../../extension-support/block-type';
import Cast from '../../util/cast';

import blockIcon from './block-icon.png';
import translations from './translations.json';

import {PcratchIoT} from './microbit-more';

let formatMessage = messageData => messageData.defaultMessage;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const EXTENSION_ID = 'pcratchIoT';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://jcodeorg.github.io/pcratch-iot-ext/dist/pcratchIoT.mjs';

/**
 * Enum for name of pull mode.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PullModeName = {
    NONE: 'NONE',
    DOWN: 'DOWN',
    UP: 'UP'
};

/**
 * Enum for ID of pull mode.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PullModeID = {
    NONE: 0,
    DOWN: 1,
    UP: 2
};

/**
 * Enum for ID of buttons
 * @readonly
 * @enum {string}
 */
const pcratchiot_ButtonName = {
    P0: 'P0',
    P1: 'P1',
    P2: 'P2',
    A: 'A',
    B: 'B',
    LOGO: 'LOGO'
};

/**
 * Enum for index of pin for buttons
 * @readonly
 * @enum {number}
 */
const pcratchiot_ButtonPinIndex = {
    P0: 0,
    P1: 1,
    P2: 2
};

/**
 * Enum for name of event from button
 * @readonly
 * @enum {string}
 */
const pcratchiot_ButtonEventName = {
    DOWN: 'DOWN',
    UP: 'UP',
    CLICK: 'CLICK',
    LONG_CLICK: 'LONG_CLICK',
    HOLD: 'HOLD',
    DOUBLE_CLICK: 'DOUBLE_CLICK'
};

/**
 * Enum for name of gesture.
 * @readonly
 * @enum {string}
 */
const pcratchiot_GestureName =
{
    TILT_UP: 'TILT_UP',
    TILT_DOWN: 'TILT_DOWN',
    TILT_LEFT: 'TILT_LEFT',
    TILT_RIGHT: 'TILT_RIGHT',
    FACE_UP: 'FACE_UP',
    FACE_DOWN: 'FACE_DOWN',
    FREEFALL: 'FREEFALL',
    G3: 'G3',
    G6: 'G6',
    G8: 'G8',
    SHAKE: 'SHAKE'
};

/**
 * Enum for event type in the Pcratch IoT runtime.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PinEventType = {
    NONE: 0,
    ON_EDGE: 1,
    ON_PULSE: 2,
    ON_TOUCH: 3
};

/**
 * Enum for event value in the Pcratch IoT runtime.
 * @readonly
 * @enum {number}
 */
const pcratchiot_PinEvent = {
    RISE: 2,
    FALL: 3,
    PULSE_HIGH: 4,
    PULSE_LOW: 5
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
 * Scratch 3.0 blocks to interact with a MicroBit peripheral.
 */
class pcratchIoTBlocks {

    /**
     * A translation object which is used in this class.
     * @param {FormatObject} formatter - translation object
     */
    static set formatMessage (formatter) {
        formatMessage = formatter;
        if (formatMessage) setupTranslations();
    }

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return formatMessage({
            id: 'pcratch_iot.name',
            default: 'Pcratch IoT',
            description: 'name of the extension'
        });
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * @return {array} - text and values for each gestures menu element
     */
    get GESTURES_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.tiltUp',
                    default: 'titl up',
                    description: 'label for tilt up gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.TILT_UP
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.tiltDown',
                    default: 'titl down',
                    description: 'label for tilt down gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.TILT_DOWN
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.tiltLeft',
                    default: 'titl left',
                    description: 'label for tilt left gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.TILT_LEFT
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.tiltRight',
                    default: 'titl right',
                    description: 'label for tilt right gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.TILT_RIGHT
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.faceUp',
                    default: 'face up',
                    description: 'label for face up gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.FACE_UP
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.faceDown',
                    default: 'face down',
                    description: 'label for face down gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.FACE_DOWN
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.freefall',
                    default: 'freefall',
                    description: 'label for freefall gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.FREEFALL
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.g3',
                    default: '3G',
                    description: 'label for 3G gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.G3
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.g6',
                    default: '6G',
                    description: 'label for 6G gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.G6
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.g8',
                    default: '8G',
                    description: 'label for 3G gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.G8
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.gesturesMenu.shake',
                    default: 'shake',
                    description: 'label for shaken gesture in gesture picker for Pcratch IoT extension'
                }),
                value: pcratchiot_GestureName.SHAKE
            }

        ];
    }


    /**
     * @return {array} - text and values for each buttons menu element
     */
    get BUTTON_ID_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.buttonIDMenu.a',
                    default: 'A',
                    description: 'label for "A" element in button picker for Pcratch IoT extension'
                }),
                value: pcratchiot_ButtonName.A
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.buttonIDMenu.b',
                    default: 'B',
                    description: 'label for "B" element in button picker for Pcratch IoT extension'
                }),
                value: pcratchiot_ButtonName.B
            }
        ];
    }

    /**
     * @return {array} - Menu items for button event selector.
     */
    get BUTTON_EVENT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.buttonEventMenu.down',
                    default: 'down',
                    description: 'label for button down event'
                }),
                value: pcratchiot_ButtonEventName.DOWN
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.buttonEventMenu.up',
                    default: 'up',
                    description: 'label for button up event'
                }),
                value: pcratchiot_ButtonEventName.UP
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.buttonEventMenu.click',
                    default: 'click',
                    description: 'label for button click event'
                }),
                value: pcratchiot_ButtonEventName.CLICK
            // },
            // // These events are not in use because they are unstable in coal-microbit-v2.
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.buttonEventMenu.hold',
            //         default: 'hold',
            //         description: 'label for button hold event'
            //     }),
            //     value: pcratchiot_ButtonEventName.HOLD
            // },
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.buttonEventMenu.longClick',
            //         default: 'long click',
            //         description: 'label for button long click event'
            //     }),
            //     value: pcratchiot_ButtonEventName.LONG_CLICK
            // },
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.buttonEventMenu.doubleClick',
            //         default: 'double click',
            //         description: 'label for button double click event'
            //     }),
            //     value: pcratchiot_ButtonEventName.DOUBLE_CLICK
            }
        ];
    }

    /**
     * @return {array} - text and values for each buttons menu element
     */
    get TOUCH_ID_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.touchIDMenu.logo',
                    default: 'LOGO',
                    description: 'label for "LOGO" element in touch button picker for Pcratch IoT extension'
                }),
                value: pcratchiot_ButtonName.LOGO
            },
            {
                text: 'P0',
                value: pcratchiot_ButtonName.P0
            },
            {
                text: 'P1',
                value: pcratchiot_ButtonName.P1
            },
            {
                text: 'P2',
                value: pcratchiot_ButtonName.P2
            }
        ];
    }

    /**
     * @return {array} - Menu items for touch event selector.
     */
    get TOUCH_EVENT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.touchEventMenu.touched',
                    default: 'touched',
                    description: 'label for touched event'
                }),
                value: pcratchiot_ButtonEventName.DOWN
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.touchEventMenu.released',
                    default: 'released',
                    description: 'label for released event'
                }),
                value: pcratchiot_ButtonEventName.UP
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.touchEventMenu.tapped',
                    default: 'tapped',
                    description: 'label for tapped event'
                }),
                value: pcratchiot_ButtonEventName.CLICK
            // },
            // // These events are not in use because they are unstable in coal-microbit-v2.
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.touchEventMenu.hold',
            //         default: 'hold',
            //         description: 'label for hold event in touch'
            //     }),
            //     value: pcratchiot_ButtonEventName.HOLD
            // },
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.touchEventMenu.longTapped',
            //         default: 'long tapped',
            //         description: 'label for long click event in touch'
            //     }),
            //     value: pcratchiot_ButtonEventName.LONG_CLICK
            // },
            // {
            //     text: formatMessage({
            //         id: 'pcratch_iot.touchEventMenu.doubleTapped',
            //         default: 'double tapped',
            //         description: 'label for double click event in touch'
            //     }),
            //     value: pcratchiot_ButtonEventName.DOUBLE_CLICK
            }
        ];
    }

    get ANALOG_IN_PINS_MENU () {
        return this._pcratch.analogIn.map(
            pinIndex =>
                Object.create({
                    text: `P${pinIndex.toString()}`,
                    value: pinIndex.toString()
                })
        );
    }


    get GPIO_MENU () {
        return this._pcratch.gpio.map(
            pinIndex =>
                Object.create({
                    text: `P${pinIndex.toString()}`,
                    value: pinIndex.toString()
                })
        );
    }

    get DIGITAL_VALUE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.digitalValueMenu.Low',
                    default: 'Low',
                    description: 'label for low value in digital output menu for Pcratch IoT extension'
                }),
                value: 'false'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.digitalValueMenu.High',
                    default: 'High',
                    description: 'label for high value in digital output menu for Pcratch IoT extension'
                }),
                value: 'true'
            }
        ];
    }

    get AXIS_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.axisMenu.x',
                    default: 'x',
                    description: 'label of X axis.'
                }),
                value: AxisSymbol.X
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.axisMenu.y',
                    default: 'y',
                    description: 'label of Y axis.'
                }),
                value: AxisSymbol.Y
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.axisMenu.z',
                    default: 'z',
                    description: 'label of Z axis.'
                }),
                value: AxisSymbol.Z
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.axisMenu.absolute',
                    default: 'absolute',
                    description: 'label of absolute value.'
                }),
                value: AxisSymbol.Absolute
            }
        ];
    }

    /**
     * @return {array} - text and values for each pin mode menu element
     */
    get PIN_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinModeMenu.pullNone',
                    default: 'pull none',
                    description: 'label for pullNone mode'
                }),
                value: pcratchiot_PullModeName.NONE
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinModeMenu.pullUp',
                    default: 'pull up',
                    description: 'label for pullUp mode'
                }),
                value: pcratchiot_PullModeName.UP
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinModeMenu.pullDown',
                    default: 'pull down',
                    description: 'label for pullDown mode'
                }),
                value: pcratchiot_PullModeName.DOWN
            }
        ];
    }

    /**
     * @return {array} - Menu items for event selector.
     */
    get PIN_EVENT_MENU () {
        return [
            /*
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventMenu.pulseLow',
                    default: 'low pulse',
                    description: 'label for low pulse event'
                }),
                value: 'PULSE_LOW'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventMenu.pulseHigh',
                    default: 'high pulse',
                    description: 'label for high pulse event'
                }),
                value: 'PULSE_HIGH'
            },
            */
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventMenu.fall',
                    default: 'fall',
                    description: 'label for fall event'
                }),
                value: 'FALL'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventMenu.rise',
                    default: 'rise',
                    description: 'label for rise event'
                }),
                value: 'RISE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for event selector.
     */
    get PIN_EVENT_TIMESTAMP_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTimestampMenu.pulseLow',
                    default: 'low pulse',
                    description: 'label for low pulse event'
                }),
                value: 'PULSE_LOW'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTimestampMenu.pulseHigh',
                    default: 'high pulse',
                    description: 'label for high pulse event'
                }),
                value: 'PULSE_HIGH'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTimestampMenu.fall',
                    default: 'fall',
                    description: 'label for fall event'
                }),
                value: 'FALL'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTimestampMenu.rise',
                    default: 'rise',
                    description: 'label for rise event'
                }),
                value: 'RISE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for event listening.
     */
    get PIN_EVENT_TYPE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTypeMenu.none',
                    default: 'none',
                    description: 'label for remove event listener'
                }),
                value: 'NONE'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTypeMenu.pulse',
                    default: 'pulse',
                    description: 'label for pulse event type'
                }),
                value: 'ON_PULSE'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.pinEventTypeMenu.edge',
                    default: 'edge',
                    description: 'label for edge event type'
                }),
                value: 'ON_EDGE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for connection state.
     */
    get CONNECTION_STATE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'pcratch_iot.connectionStateMenu.connected',
                    default: 'connected',
                    description: 'label for connected'
                }),
                value: 'connected'
            },
            {
                text: formatMessage({
                    id: 'pcratch_iot.connectionStateMenu.disconnected',
                    default: 'disconnected',
                    description: 'label for disconnected'
                }),
                value: 'disconnected'
            }
        ];
    }

    /**
     * Construct a set of MicroBit blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
        // Create a new MicroBit peripheral instance _pcratch
        this._pcratch = new PcratchIoT(this.runtime, pcratchIoTBlocks.EXTENSION_ID);

        /**
         * The previous timestamps of button events.
         * @type {Object.<number, Object.<number, number>>} button ID to object with event and timestamp.
         */
        this.prevButtonEvents = {};

        /**
         * The previous timestamps of gesture events.
         * @type {Object.<number, number>} key: event ID, value: timestamp.
         */
        this.prevGestureEvents = {};

        /**
         * The previous timestamps of pin events.
         * @type {Object.<number, Object.<number, number>>} pin index to object with event and timestamp.
         */
        this.prevPinEvents = {};

        /**
         * The previous timestamps of messages.
         * @type {Object.<number, Object>} pin index to object with event and timestamp.
         */
        this.prevReceivedData = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        setupTranslations();
        return {
            id: pcratchIoTBlocks.EXTENSION_ID,
            name: pcratchIoTBlocks.EXTENSION_NAME,
            extensionURL: pcratchIoTBlocks.extensionURL,
            blockIconURI: blockIcon,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'whenConnectionChanged',
                    text: formatMessage({ // pcratchiot_. -> pcratch_iot.
                        id: 'pcratch_iot.whenConnectionChanged',
                        default: 'when Pcratch IoT [STATE]',
                        description: 'when a Pcratch IoT connection state changed'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        STATE: {
                            type: ArgumentType.STRING,
                            menu: 'connectionStateMenu',
                            defaultValue: 'connected'
                        }
                    }
                },
                '---',
                /*
                {
                    opcode: 'whenButtonEvent',
                    text: formatMessage({
                        id: 'pcratch_iot.whenButtonEvent',
                        default: 'when button [NAME] is [EVENT]',
                        description: 'when the selected button on the Pcratch IoT get the selected event'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'buttonIDMenu',
                            defaultValue: pcratchiot_ButtonName.A
                        },
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'buttonEventMenu',
                            defaultValue: pcratchiot_ButtonEventName.DOWN
                        }
                    }
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({
                        id: 'pcratch_iot.isButtonPressed',
                        default: 'button [NAME] pressed?',
                        description: 'is the selected button on the Pcratch IoT pressed?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'buttonIDMenu',
                            defaultValue: pcratchiot_ButtonName.A
                        }
                    }
                },
                {
                    opcode: 'whenTouchEvent',
                    text: formatMessage({
                        id: 'pcratch_iot.whenTouchEvent',
                        default: 'when pin [NAME] is [EVENT]',
                        description: 'when the selected touch pin on the Pcratch IoT is touched'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'touchIDMenu',
                            defaultValue: pcratchiot_ButtonName.LOGO
                        },
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'touchEventMenu',
                            defaultValue: pcratchiot_ButtonEventName.DOWN
                        }
                    }
                },
                {
                    opcode: 'isPinTouched',
                    text: formatMessage({
                        id: 'pcratch_iot.isPinTouched',
                        default: 'pin [NAME] is touched?',
                        description: 'is the selected pin is touched?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'touchIDMenu',
                            defaultValue: pcratchiot_ButtonName.LOGO
                        }
                    }
                },
                '---',
                {
                    opcode: 'whenGesture',
                    text: formatMessage({
                        id: 'pcratch_iot.whenGesture',
                        default: 'when [GESTURE]',
                        description: 'when the selected gesture is detected by the Pcratch IoT'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'gestures',
                            defaultValue: pcratchiot_GestureName.SHAKE
                        }
                    }
                },
                '---',
                {
                    opcode: 'displayMatrix',
                    text: formatMessage({
                        id: 'pcratch_iot.displayMatrix',
                        default: 'display pattern [MATRIX] ',
                        description: 'display a pattern on the Pcratch IoT display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MATRIX: {
                            type: ArgumentType.MATRIX,
                            defaultValue: '0101010101100010101000100'
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'pcratch_iot.displayText',
                        default: 'display text [TEXT] delay [DELAY] ms',
                        description: 'display text on the Pcratch IoT display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello!'
                        },
                        DELAY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 120
                        }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'pcratch_iot.clearDisplay',
                        default: 'clear display',
                        description: 'display nothing on the Pcratch IoT display'
                    }),
                    blockType: BlockType.COMMAND
                },
                */
                '---',
                {
                    opcode: 'getLightLevel',
                    text: formatMessage({
                        id: 'pcratch_iot.lightLevel',
                        default: 'light intensity',
                        description: 'how much the amount of light falling on the LEDs on Pcratch IoT'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getTemperature',
                    text: formatMessage({
                        id: 'pcratch_iot.temperature',
                        default: 'temperature',
                        description: 'temperature (celsius) on the surface of CPU of Pcratch IoT'
                    }),
                    blockType: BlockType.REPORTER
                },
                /*
                {
                    opcode: 'getCompassHeading',
                    text: formatMessage({
                        id: 'pcratch_iot.compassHeading',
                        default: 'angle with the North',
                        description: 'angle from the North to the Pcratch IoT heading direction'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getPitch',
                    text: formatMessage({
                        id: 'pcratch_iot.pitch',
                        default: 'pitch',
                        description: 'nose up movement of the Pcratch IoT from level'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getRoll',
                    text: formatMessage({
                        id: 'pcratch_iot.roll',
                        default: 'roll',
                        description: 'clockwise circular movement of the Pcratch IoT from level'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getSoundLevel',
                    text: formatMessage({
                        id: 'pcratch_iot.soundLevel',
                        default: 'humidity',
                        description: 'level of the sound from microphone on Pcratch IoT'
                    }),
                    blockType: BlockType.REPORTER
                },
                */
                // getSoundLevel は、湿度として利用します
                {
                    opcode: 'getHumidity',
                    text: formatMessage({
                        id: 'pcratch_iot.humidity',
                        default: 'humidity',
                        description: 'level of the sound from microphone on Pcratch IoT'
                    }),
                    blockType: BlockType.REPORTER
                },
                /*
                {
                    opcode: 'getMagneticForce',
                    text: formatMessage({
                        id: 'pcratch_iot.magneticForce',
                        default: 'magnetic force',
                        description: 'value of magnetic force (micro tesla)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'axis',
                            defaultValue: AxisSymbol.Absolute
                        }
                    }
                },
                {
                    opcode: 'getAcceleration',
                    text: formatMessage({
                        id: 'pcratch_iot.acceleration',
                        default: 'acceleration [AXIS]',
                        description: 'value of acceleration on the axis (milli-g)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'axis',
                            defaultValue: AxisSymbol.X
                        }
                    }
                },
                '---',
                {
                    opcode: 'getAnalogValue',
                    text: formatMessage({
                        id: 'pcratch_iot.analogValue',
                        default: 'analog value of pin [PIN]',
                        description: 'analog input value of the pin'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'analogInPins',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'setPullMode',
                    text: formatMessage({
                        id: 'pcratch_iot.setPullMode',
                        default: 'set pin [PIN] to input [MODE]',
                        description: 'set a pin into the mode'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'pinMode',
                            defaultValue: pcratchiot_PullModeName.UP
                        }
                    }
                },
                */
                {
                    opcode: 'isPinHigh',
                    text: formatMessage({
                        id: 'pcratch_iot.isPinHigh',
                        default: '[PIN] pin is high?',
                        description: 'is the selected pin high as digital?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'setDigitalOut',
                    text: formatMessage({
                        id: 'pcratch_iot.setDigitalOut',
                        default: 'set [PIN] Digital [LEVEL]',
                        description: 'set pin to Digital Output mode and the level(High = true)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        LEVEL: {
                            type: ArgumentType.STRING,
                            menu: 'digitalValueMenu',
                            defaultValue: 'false'
                        }
                    }
                },
                {
                    opcode: 'setAnalogOut',
                    text: formatMessage({
                        id: 'pcratch_iot.setAnalogOut',
                        default: 'set [PIN] PWM to [LEVEL] %',
                        description: 'set pin to PWM mode and the level(0 to 100)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        LEVEL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                /*
                {
                    opcode: 'setServo',
                    text: formatMessage({
                        id: 'pcratch_iot.setServo',
                        default: 'set [PIN] Servo [ANGLE]',
                        description: 'set pin to Servo mode and the angle(0 to 180)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RANGE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2000
                        },
                        CENTER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1500
                        }
                    }
                },
                */
                {
                    opcode: 'playTone',
                    text: formatMessage({
                        id: 'pcratch_iot.playTone',
                        default: 'play tone [FREQ] Hz volume [VOL] %',
                        description: 'play tone on the speaker'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FREQ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        VOL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'stopTone',
                    text: formatMessage({
                        id: 'pcratch_iot.stopTone',
                        default: 'stop tone',
                        description: 'stop tone on the speaker'
                    }),
                    blockType: BlockType.COMMAND
                },
                '---',
                /*
                {
                    opcode: 'listenPinEventType',
                    text: formatMessage({
                        id: 'pcratch_iot.listenPinEventType',
                        default: 'listen [EVENT_TYPE] event on [PIN]',
                        description: 'listen the event on the pin'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        EVENT_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventTypeMenu',
                            defaultValue: 'NONE'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                */
                {
                    opcode: 'whenPinEvent',
                    text: formatMessage({
                        id: 'pcratch_iot.whenPinEvent',
                        default: 'when catch [EVENT] at pin [PIN]',
                        description: 'when catch the event at the pin'

                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventMenu',
                            defaultValue: 'FALL'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                /*
                {
                    opcode: 'getPinEventValue',
                    text: formatMessage({
                        id: 'pcratch_iot.getPinEventValue',
                        default: 'value of [EVENT] at [PIN]',
                        description: 'value of the value of the event (timestamp of the edge or duration of the pulse)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventTimestampMenu',
                            defaultValue: 'PULSE_LOW'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'whenDataReceived',
                    text: formatMessage({
                        id: 'pcratch_iot.whenDataReceived',
                        default: 'when data with label [LABEL] received from Pcratch IoT',
                        description: 'when the data which has the label received'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'label-01'
                        }
                    }
                },
                {
                    opcode: 'getDataLabeled',
                    text: formatMessage({
                        id: 'pcratch_iot.getDataLabeled',
                        default: 'data of label [LABEL]',
                        description: 'the last data which has the label'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'label-01'
                        }
                    }
                },
                {
                    opcode: 'sendData',
                    text: formatMessage({
                        id: 'pcratch_iot.sendData',
                        default: 'send data [DATA] with label [LABEL] to Pcratch IoT',
                        description: 'send data content with label to Pcratch IoT'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'label-01'
                        },
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                */
                {
                    opcode: 'getRGB',
                    text: formatMessage({
                        id: 'pcratch_iot.getRGB',
                        default: 'RGB [R] [G] [B]',
                        description: 'get the RGB value'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'setNeoPixcelColor',
                    text: formatMessage({
                        id: 'pcratch_iot.setNeoPixcelColor',
                        default: 'set [N] NeoPixcel with color [COLOR]',
                        description: 'set NeoPixcel color'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            defaultValue: '0,0,0'
                        }
                    }
                }
            ],
            menus: {
                buttonIDMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_ID_MENU
                },
                buttonEventMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_EVENT_MENU
                },
                touchIDMenu: {
                    acceptReporters: false,
                    items: this.TOUCH_ID_MENU
                },
                touchEventMenu: {
                    acceptReporters: false,
                    items: this.TOUCH_EVENT_MENU
                },
                gestures: {
                    acceptReporters: false,
                    items: this.GESTURES_MENU
                },
                analogInPins: {
                    acceptReporters: false,
                    items: this.ANALOG_IN_PINS_MENU
                },
                digitalValueMenu: {
                    acceptReporters: true,
                    items: this.DIGITAL_VALUE_MENU
                },
                gpio: {
                    acceptReporters: false,
                    items: this.GPIO_MENU
                },
                axis: {
                    acceptReporters: false,
                    items: this.AXIS_MENU
                },
                pinMode: {
                    acceptReporters: false,
                    items: this.PIN_MODE_MENU
                },
                pinEventTypeMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_TYPE_MENU
                },
                pinEventMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_MENU
                },
                pinEventTimestampMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_TIMESTAMP_MENU
                },
                connectionStateMenu: {
                    acceptReporters: false,
                    items: this.CONNECTION_STATE_MENU
                }
            },
            translationMap: translations
        };
    }

    /**
     * Update the previous occured time of all button events.
     */
    updatePrevButtonEvents () {
        this.prevButtonEvents = {};
        Object.entries(this._pcratch.buttonEvents).forEach(([componentID, events]) => {
            this.prevButtonEvents[componentID] = {};
            Object.entries(events).forEach(([eventName, timestamp]) => {
                this.prevButtonEvents[componentID][eventName] = timestamp;
            });
        });
    }

    /**
     * Test whether the event raised at the button.
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the button.
     * @param {string} args.EVENT - name of event to catch.
     * @return {boolean} - true if the event raised.
     */
    whenButtonEvent (args) {
        if (!this.updateLastButtonEventTimer) {
            this.updateLastButtonEventTimer = setTimeout(() => {
                this.updatePrevButtonEvents();
                this.updateLastButtonEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const buttonName = args.NAME;
        const eventName = args.EVENT;
        const lastTimestamp =
            this._pcratch.getButtonEventTimestamp(buttonName, eventName);
        if (lastTimestamp === null) return false;
        if (!this.prevButtonEvents[buttonName]) return true;
        return lastTimestamp !== this.prevButtonEvents[buttonName][eventName];
    }

    /**
     * Test whether the A or B button is pressed
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the button.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean} - whether the button is pressed or not.
     */
    isButtonPressed (args) {
        const buttonName = args.NAME;
        return this._pcratch.isButtonPressed(buttonName);
    }


    /**
     * Test whether the touch event raised at the pin.
     * @param {object} args - the block's arguments.q
     * @param {string} args.NAME - name of the pin to catch.
     * @param {string} args.EVENT - event to catch.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean|Promise<boolean>|undefined} - true if the event raised or promise that or undefinde if yield.
     */
    whenTouchEvent (args, util) {
        const buttonName = args.NAME;
        if (buttonName === pcratchiot_ButtonName.LOGO) {
            return this.whenButtonEvent(args);
        }
        if (this._pcratch.isPinTouchMode(pcratchiot_ButtonPinIndex[buttonName])) {
            return this.whenButtonEvent(args);
        }
        const configPromise = this._pcratch.configTouchPin(pcratchiot_ButtonPinIndex[buttonName], util);
        if (!configPromise) return; // This thread was yielded.
        return configPromise.then(() => this.whenButtonEvent(args));
    }

    /**
     * Test whether the touch-pin is touched.
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the pin.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean|Promise<boolean>|undefined} - true if touched or promise that or undefinde if yield.
     */
    isPinTouched (args, util) {
        const buttonName = args.NAME;
        if (buttonName === pcratchiot_ButtonName.LOGO) {
            return this._pcratch.isTouched(buttonName);
        }
        if (this._pcratch.isPinTouchMode(pcratchiot_ButtonPinIndex[buttonName])) {
            return this._pcratch.isTouched(buttonName);
        }
        const configPromise = this._pcratch.configTouchPin(pcratchiot_ButtonPinIndex[buttonName], util);
        if (!configPromise) return; // This thread was yielded.
        return configPromise.then(() => this._pcratch.isTouched(buttonName));
    }

    /**
     * Update the last occured time of all gesture events.
     */
    updatePrevGestureEvents () {
        this.prevGestureEvents = {};
        Object.entries(this._pcratch.gestureEvents).forEach(([gestureName, timestamp]) => {
            this.prevGestureEvents[gestureName] = timestamp;
        });
    }

    /**
     * Test whether the gesture event raised.
     * @param {object} args - the block's arguments.
     * @param {string} args.GESTURE - name of the gesture.
     * @return {boolean} - true if the event raised.
     */
    whenGesture (args) {
        if (!this.updateLastGestureEventTimer) {
            this.updateLastGestureEventTimer = setTimeout(() => {
                this.updatePrevGestureEvents();
                this.updateLastGestureEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const gestureName = args.GESTURE;
        const lastTimestamp =
            this._pcratch.getGestureEventTimestamp(gestureName);
        if (lastTimestamp === null) return false;
        if (!this.prevGestureEvents[gestureName]) return true;
        return lastTimestamp !== this.prevGestureEvents[gestureName];
    }

    /**
     * Display pixcel pattern on the 5x5 LED matrix with brightness and write mode.
     * @param {object} args - the block's arguments.
     * @param {string} args.MATRIX - the pattern of the pixels.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves after a tick or undefinde if yield.
     */
    displayMatrix (args, util) {
        const matrixString = Cast.toString(args.MATRIX)
            .replace(/[０-９，]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0)); // zenkaku to hankaku
        let matrixData;
        if (matrixString.includes(',')) {
            // comma separated values
            matrixData = matrixString.split(/[,\n]/);
        } else if (/[ \t]\d*[ \t]/g.test(matrixString)) {
            // space|tab separated values
            matrixData = matrixString.split(/\s/g);
        } else {
            // 0|1 pattern.
            matrixData = matrixString.replace(/\s/g, '')
                .split('');
            matrixData = matrixData.map(level => ((level === '0') ? 0 : 100));
        }
        matrixData = matrixData.map(brightness =>
            (Math.max(0,
                Math.min(100,
                    Number(brightness)) * 255 / 100))); // percent to 8bits value
        const matrix = [];
        for (let line = 0; line < 5; line++) {
            matrix[line] = [];
            for (let col = 0; col < 5; col++) {
                matrix[line][col] = matrixData[(line * 5) + col];
            }
        }
        return this._pcratch.displayPixels(matrix, util);
    }

    /**
     * Display text on the 5x5 LED matrix.
     * Displayable character is ascii and non-ascii is replaced to '?'.
     * @param {object} args - the block's arguments.
     * @param {string} args.TEXT - The contents to display.
     * @param {number} args.DELAY - The time to delay between characters, in milliseconds.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after the text is done printing or undefinde if yield.
     * Note the limit is 18 characters
     * The print time is calculated by multiplying the number of horizontal pixels
     * by the default scroll delay of 120ms.
     * The number of horizontal pixels = 6px for each character in the string,
     * 1px before the string, and 5px after the string.
     */
    displayText (args, util) {
        // zenkaku to hankaku
        const text = Cast.toString(args.TEXT)
            .replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0))
            .replace(/”/g, '"')
            .replace(/’/g, "'")
            .replace(/‘/g, '`')
            .replace(/￥/g, '\\')
            // eslint-disable-next-line no-irregular-whitespace
            .replace(/　/g, ' ')
            .replace(/〜/g, '~');
        let delay = parseInt(args.DELAY, 10);
        delay = isNaN(delay) ? 120 : delay; // Use default delay if NaN.
        const resultPromise = this._pcratch.displayText(text, delay, util);
        if (!resultPromise) return; // This thread was yielded.
        const yieldDelay = delay * ((6 * text.length) + 6);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, yieldDelay);
        });
    }

    /**
     * Turn all 5x5 matrix LEDs off.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after a tick or undefinde if yield.
     */
    displayClear (args, util) {
        const matrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        return this._pcratch.displayPixels(matrix, util);
    }

    /**
     * Test the selected pin is high as digital.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @return {boolean} - true if the pin is high.
     */
    isPinHigh (args) {
        return this._pcratch.isPinHigh(parseInt(args.PIN, 10));
    }

    /**
     * Get amount of light (0 - 255) on the LEDs.
     * @param {object} args - the block's arguments.
     * @return {number} - light level.
     */
    getLightLevel () {
        const level = this._pcratch.readLightLevel();
        return Math.round(level * 1000 / 255) / 10;
    }

    /**
     * Get temperature (integer in celsius) of Pcratch IoT.
     * @param {object} args - the block's arguments.
     * @return {number} - value of temperature [centigrade].
     */
    getTemperature () {
        return this._pcratch.readTemperature();
    }

    /**
     * Get loudness of the sound from microphone on Pcratch IoT.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves digital input value of the pin or undefinde if yield.
     */
    getHumidity (args, util) {
        const resultPromise = this._pcratch.configMic(true, util);
        if (!resultPromise) return; // This thread was yielded.
        return resultPromise
            .then(micState => {
                if (micState) {
                    return Math.round(this._pcratch.readSoundLevel() * 1000 / 255) / 10;
                }
                return 0;
            });
    }

    /**
     * Return angle from the north to the Pcratch IoT heading direction.
     * @return {number} - degree of compass heading angle from the north (0 - 359 degrees).
     */
    getCompassHeading () {
        return this._pcratch.readCompassHeading();
    }

    /**
     * Return analog value of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves analog input value of the pin or undefined if this process was yield.
     */
    getAnalogValue (args, util) {
        const pinIndex = parseInt(args.PIN, 10);
        const resultPromise = this._pcratch.readAnalogIn(pinIndex, util);
        if (!resultPromise) return;
        return resultPromise.then(level => Math.round(level * 100 * 10 / 1024) / 10);
    }

    /**
     * Return digital value of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @return {number} - digital input value of the pin.
     */
    getDigitalValue (args) {
        return this._pcratch.readDigitalLevel(parseInt(args.PIN, 10));
    }

    /**
     * Send data with label.
     * @param {object} args - the block's arguments.
     * @property {string} args.LABEL - label of the data.
     * @property {string} args.DATA - content of the data.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves when the process was done or undefined if this process was yield.
     */
    sendData (args, util) {
        if (args.LABEL.length <= 0) {
            return;
        }
        return this._pcratch.sendData(args.LABEL, args.DATA, util);
    }

    /**
     * Set pull mode of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {pcratchiot_PullModeName} args.MODE - mode to set.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setPullMode (args, util) {
        return this._pcratch.setPullMode(parseInt(args.PIN, 10), pcratchiot_PullModeID[args.MODE], util);
    }

    /**
     * Set the pin to Output mode and level.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {boolean | string | number} args.LEVEL - value to be set.
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setDigitalOut (args, util) {
        let level = (args.LEVEL === true);
        level = level || (args.LEVEL === 'true');
        if (!level) {
            const num = Number(args.LEVEL);
            if (!isNaN(num)) {
                level = (num > 0);
            }
        }
        return this._pcratch.setPinOutput(parseInt(args.PIN, 10), level, util);
    }

    /**
     * Set the pin to PWM mode and level.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {number} args.LEVEL - value[%] for PWM.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setAnalogOut (args, util) {
        let percent = parseInt(args.LEVEL, 10);
        if (isNaN(percent)) {
            return;
        }
        percent = Math.max(0, Math.min(percent, 100));
        const level = Math.round(percent * 1024 / 100);
        return this._pcratch.setPinPWM(
            parseInt(args.PIN, 10),
            level,
            util
        );
    }

    /**
     * Set the pin to Servo mode and angle.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setServo (args, util) {
        let angle = parseInt(args.ANGLE, 10);
        if (isNaN(angle)) return;
        angle = Math.max(0, angle);
        angle = Math.min(angle, 180);
        // let range = parseInt(args.RANGE, 10);
        // if (isNaN(range)) range = 0;
        // range = Math.max(0, range);
        // let center = parseInt(args.CENTER, 10);
        // if (isNaN(center)) range = 0;
        // center = Math.max(0, center);
        return this._pcratch.setPinServo(parseInt(args.PIN, 10), angle, null, null, util);
    }

    /**
     * Return the value of magnetic force [micro tesla] on axis.
     * @param {object} args - the block's arguments.
     * @property {AxisSymbol} AXIS - the axis (X, Y, Z, Absolute).
     * @return {number} - value of magnetic force.
     */
    getMagneticForce (args) {
        return this._pcratch.readMagneticForce(args.AXIS);
    }

    /**
     * Return the value of acceleration on the specified axis.
     * @param {object} args - the block's arguments.
     * @param {AxisSymbol} args.AXIS - direction to get.
     * @return {number} - value of acceleration.
     */
    getAcceleration (args) {
        return this._pcratch.readAcceleration(args.AXIS);
    }

    /**
     * Return pitch [degrees] of the Pcratch IoT heading direction.
     * @return {number} - degree of pitch.
     */
    getPitch () {
        return this._pcratch.readPitch();
    }

    /**
     * Read roll [degrees] of the Pcratch IoT heading direction.
     * @return {number} - degree of roll.
     */
    getRoll () {
        return this._pcratch.readRoll();
    }


    /**
     * Play tone on the speaker.
     * @param {object} args - the block's arguments.
     * @param {string} args.FREQ - wave frequency to play
     * @param {string} args.VOL laudness of tone
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    playTone (args, util) {
        const frequency = parseFloat(args.FREQ);
        let volume = parseInt(args.VOL, 10);
        volume = Math.min(100, (Math.max(0, volume)));
        return this._pcratch.playTone(frequency, volume, util);
    }

    /**
     * Stop playing tone on the speaker.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    stopTone (args, util) {
        return this._pcratch.stopTone(util);
    }

    /**
     * Set listening event type at the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT_TYPE - event to listen.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
    */
    listenPinEventType (args, util) {
        return this._pcratch.listenPinEventType(parseInt(args.PIN, 10), pcratchiot_PinEventType[args.EVENT_TYPE], util);
    }

    /**
     * Rerutn value (timestamp of the edge or duration of the pulse) of the event or 0 when the event is not received.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT - event value to get.
     * @param {object} util - utility object provided by the runtime.
     * @return {number} - timestamp of the event or 0.
     */
    getPinEventValue (args) {
        const value = this._pcratch.getPinEventValue(parseInt(args.PIN, 10), pcratchiot_PinEvent[args.EVENT]);
        return value ? value : 0;
    }

    /**
     * Update the previous occured time of all pin events.
     */
    updatePrevPinEvents () {
        this.prevPinEvents = {};
        Object.entries(this._pcratch._pinEvents).forEach(([pinIndex, events]) => {
            this.prevPinEvents[pinIndex] = {};
            Object.entries(events).forEach(([eventID, eventData]) => {
                this.prevPinEvents[pinIndex][eventID] = {};
                Object.entries(eventData).forEach(([key, value]) => {
                    this.prevPinEvents[pinIndex][eventID][key] = value;
                });
            });
        });
    }

    /**
     * Return the previous timestamp of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {pcratchiot_PinEvent} eventID - ID of the event to get.
     * @return {?number} Timestamp of the previous event or null.
     */
    getPrevPinEventTimestamp (pinIndex, eventID) {
        if (this.prevPinEvents[pinIndex] && this.prevPinEvents[pinIndex][eventID]) {
            return this.prevPinEvents[pinIndex][eventID].timestamp;
        }
        return null;
    }

    /**
     * Test whether the event raised at the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT - event to catch.
     * @return {boolean} - true if the event raised.
     */
    whenPinEvent (args) {
        if (!this.updateLastPinEventTimer) {
            this.updateLastPinEventTimer = setTimeout(() => {
                this.updatePrevPinEvents();
                this.updateLastPinEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const pinIndex = parseInt(args.PIN, 10);
        const eventID = pcratchiot_PinEvent[args.EVENT];
        const lastTimestamp =
            this._pcratch.getPinEventTimestamp(pinIndex, eventID);
        if (lastTimestamp === null) return false;
        const prevTimestamp = this.getPrevPinEventTimestamp(pinIndex, eventID);
        if (prevTimestamp === null) return true;
        return lastTimestamp !== prevTimestamp;
    }

    /**
     * Rerutn the last content of the messge or undefined if the data which has the label is not received.
     * @param {object} args - the block's arguments.
     * @param {number} args.LABEL - label of the data.
     * @return {?(string | number)} - content of the data or empty string when the data was null
     */
    getDataLabeled (args) {
        const data = this._pcratch.getDataLabeled(args.LABEL);
        if (data === null) {
            return '';
        }
        return data;
    }

    /**
     * Update the previous occured time of all received data.
     */
    updatePrevReceivedData () {
        this.prevReceivedData = {};
        Object.entries(this._pcratch.receivedData).forEach(([label, contentObject]) => {
            this.prevReceivedData[label] = {};
            Object.entries(contentObject).forEach(([key, value]) => {
                this.prevReceivedData[label][key] = value;
            });
        });
    }

    /**
     * Return the previous timestamp of the data or undefined if the data was not received.
     * @param {string} label - label of the data.
     * @return {?number} Timestamp of the previous data or null.
     */
    getPrevReceivedDataTimestamp (label) {
        if (this.prevReceivedData[label]) {
            return this.prevReceivedData[label].timestamp;
        }
        return null;
    }

    /**
     * Test whether the data received which had the label.
     * @param {object} args - the block's arguments.
     * @param {number} args.LABEL - label of the data.
     * @return {boolean} - true if the data received.
     */
    whenDataReceived (args) {
        if (!this.updateLastDataTimer) {
            this.updateLastDataTimer = setTimeout(() => {
                this.updatePrevReceivedData();
                this.updateLastDataTimer = null;
            }, this.runtime.currentStepTime);
        }
        const label = args.LABEL;
        const lastTimestamp =
            this._pcratch.getDataTimestamp(label);
        if (lastTimestamp === null) return false;
        const prevTimestamp = this.getPrevReceivedDataTimestamp(label);
        if (prevTimestamp === null) return true;
        return lastTimestamp !== prevTimestamp;
    }

    /**
     * Test whether a Pcratch IoT connected.
     * @param {object} args - the block's arguments.
     * @property {string} args.STATE - the state of connection to check.
     * @return {boolean} - true if the state is matched.
     */
    whenConnectionChanged (args) {
        const state = (args.STATE === 'connected');
        return (state === this._pcratch.isConnected());
    }

    /**
     * Return the RGB string
     * @param {object} args - the block's arguments.
     * @property {number} args.R - Red.
     * @property {number} args.G - Green.
     * @property {number} args.B - Blue.
     * @return {string} Comma-separated RGB string.
     */
    getRGB (args) {
        return `${args.R},${args.G},${args.B}`;
    }

    /**
     * Rerutn the last content of the messge or undefined if the data which has the label is not received.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     * @property {number} args.N - number.
     * @property {string} args.COLOR - Comma-separated RGB string.
     */
    setNeoPixcelColor (args, util) {
        return this._pcratch.setNeoPixcelColor(args.N, args.COLOR, util);
    }
    
}

export {
    pcratchIoTBlocks as default,
    pcratchIoTBlocks as blockClass
};
