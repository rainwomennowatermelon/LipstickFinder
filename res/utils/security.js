import React from 'react';
import { sha256, sha224 } from 'js-sha256';

let aes = require('aes-js');

export const encrypt= (key, text) => {

    let aes256key: ?Array<number>;

    let hash = sha256([key, "LipstickFinder"].join(''));
    aes256key = Array.from(
            Array.from(hash)
            .map((c, i) => (i % 2 ? c : null))
            .filter(Boolean)
            .map(c => c.charCodeAt(0))
        );

    const textBytes = aes.utils.utf8.toBytes(text);
    const aesCtr = new aes.ModeOfOperation.ctr(aes256key);
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
};
