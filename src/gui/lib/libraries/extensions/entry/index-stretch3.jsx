import React from 'react';
import {FormattedMessage} from 'react-intl';

/**
 * MicroBit More extension
 */

import pcratchIoTIconURL from './entry-icon.png';
import pcratchIoTInsetIconURL from './inset-icon.svg';
import pcratchIoTConnectionIconURL from './connection-icon.svg';
import pcratchIoTConnectionSmallIconURL from './connection-small-icon.svg';

const version = 'v1.4.5.3';
const translations =
{
    "en": {
        "pcratchIoT.entry.name": "Pcratch IoT",
        "pcratchIoT.entry.description": `Play with functions of Pcratch IoT. (${version})`
    },
    "ja": {
        "pcratchIoT.entry.name": "ぷくらっち IoT",
        "pcratchIoT.entry.description": `ぷくらっちIoTのすべての機能で遊ぶ。 (${version})`
    },
    "ja-Hira": {
        "pcratchIoT.entry.name": "ぷくらっち IoT",
        "pcratchIoT.entry.description": `ぷくらっちIoTのすべてのきのうであそぶ。 (${version})`
    }
};

const entry = {
    name: (
        <FormattedMessage
            defaultMessage="Pcratch IoT"
            description="Name for this extension"
            id="pcratchIoT.entry.name"
        />
    ),
    extensionId: 'pcratchIoT',
    extensionURL: null,
    collaborator: 'Programming Education Lab',
    iconURL: pcratchIoTIconURL,
    insetIconURL: pcratchIoTInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage='Play with all of Pcratch IoT.'
            description="Description for the 'Pcratch IoT' extension"
            id="pcratchIoT.entry.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: pcratchIoTConnectionIconURL,
    connectionSmallIconURL: pcratchIoTConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their Pcratch IoT."
            id="gui.extension.microbitMore.description"
        />
    ),
    helpLink: 'https://kitaratch.github.io/',
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
