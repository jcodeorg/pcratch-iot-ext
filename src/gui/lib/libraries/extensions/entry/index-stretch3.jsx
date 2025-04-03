import formatMessage from 'format-message';

/**
 * MicroBit More extension
 */

import pcratchIoTIconURL from './entry-icon.png';
import pcratchIoTInsetIconURL from './inset-icon.svg';
import pcratchIoTConnectionIconURL from './connection-icon.svg';
import pcratchIoTConnectionSmallIconURL from './connection-small-icon.svg';
import translations from './translations.json';

const version = 'v0.1.5';

const entry = {
    get name () {
        return `${formatMessage({
            defaultMessage: 'Pcratch IoT',
            description: 'Name of this extension',
            id: 'pcratchIoT.entry.name'
        })} (${version})`;
    },
    extensionId: 'pcratchIoT',
    extensionURL: null,
    collaborator: 'Programing Education Lab',
    iconURL: pcratchIoTIconURL,
    insetIconURL: pcratchIoTInsetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Play with all functions of micro:bit.',
            description: "Description for the 'Microbit More' extension",
            id: 'mbitMore.entry.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: pcratchIoTConnectionIconURL,
    connectionSmallIconURL: pcratchIoTConnectionSmallIconURL,
    get connectingMessage () {
        return formatMessage({
            defaultMessage: 'Connecting',
            description: 'Message to help people connect to their micro:bit.',
            id: 'gui.extension.microbit.connectingMessage'
        });
    },
    helpLink: 'https://microbit-more.github.io/',
    translationMap: translations
};

export default entry;
