let formatMessage = messageData => messageData.defaultMessage;

/**
 * MicroBit More extension
 */

import piotExtIconURL from './entry-icon.png';
import piotExtInsetIconURL from './inset-icon.svg';
import piotExtConnectionIconURL from './connection-icon.svg';
import piotExtConnectionSmallIconURL from './connection-small-icon.svg';
import translations from './translations.json';

const version = 'v0.0.1';

const entry = {
    get name () {
        return `${formatMessage({
            defaultMessage: 'Pcratch IoT extension',
            description: 'Name of this extension',
            id: 'piotExt.entry.name'
        })} (${version})`;
    },
    extensionId: 'piotExt',
    extensionURL: 'https://jcodeorg.github.io/pcratch-iot-ext/dist/piotext.mjs',
    collaborator: 'Programing Education Lab',
    iconURL: piotExtIconURL,
    insetIconURL: piotExtInsetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Play with all functions of Pcratch IoT.',
            description: "Description for the 'Pcratch Iot' extension",
            id: 'piotExt.entry.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: piotExtConnectionIconURL,
    connectionSmallIconURL: piotExtConnectionSmallIconURL,
    get connectingMessage () {
        return formatMessage({
            defaultMessage: 'Connecting',
            description: 'Message to help people connect to their Pcratch IoT.',
            id: 'gui.extension.piotExt.connectingMessage'
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
