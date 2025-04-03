import React from 'react';
import {FormattedMessage} from 'react-intl';

/**
 * MicroBit More extension
 */

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';
import connectionIconURL from './connection-icon.svg';
import connectionSmallIconURL from './connection-small-icon.svg';

const version = '0.1.6';
const translations =
{
    "en": {
        "pcratchIoT.entry.name": "Pcratch IoT",
        "pcratchIoT.entry.description": `Play with all functions of Pcratch IoT.(${version})`
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
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Play with all functions of Pcratch IoT."
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
    connectionIconURL: connectionIconURL,
    connectionSmallIconURL: connectionSmallIconURL,
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
