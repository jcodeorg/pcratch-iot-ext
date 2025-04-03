let formatMessage = messageData => messageData.defaultMessage;

/**
 * MicroBit More extension
 */

import pcratchIoTIconURL from './entry-icon.png';
import pcratchIoTInsetIconURL from './inset-icon.svg';
import pcratchIoTConnectionIconURL from './connection-icon.svg';
import pcratchIoTConnectionSmallIconURL from './connection-small-icon.svg';
import translations from './translations.json';

const version = 'v0.1.1';

const entry = {
    get name () {
        return `${formatMessage({
            defaultMessage: 'pcratch IoT',
            description: 'Name of this extension',
            id: 'pcratchIoT.entry.name'
        })} (${version})`;
    },
    extensionId: 'pcratchIoT',
    extensionURL: 'https://jcodeorg.github.io/pcratch-iot-ext/dist/pcratchIoT.mjs',
    collaborator: 'Programing Education Lab',
    iconURL: pcratchIoTIconURL,
    insetIconURL: pcratchIoTInsetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Play with all functions of Pcratch IoT.',
            description: "Description for the 'Pcratch Iot' extension",
            id: 'pcratchIoT.entry.description'
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
            description: 'Message to help people connect to their Pcratch IoT.',
            id: 'gui.extension.pcratchIoT.connectingMessage'
        });
    },
    helpLink: 'https://jcodeorg.github.io/pcratch-iot-ext/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
