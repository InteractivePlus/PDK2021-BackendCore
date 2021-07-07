import {PDKAbstractDataTypes} from 'pdk2021-common';
import code from 'locale-code';

interface CommunicationContent{
    title?: string,
    content?: string,
    relatedLink?: string
}

export type {CommunicationContent};

interface VeriCodeCommunicationContentGenerator{
    generateContent(VerificationCode : PDKAbstractDataTypes.VeriCodeEntityID, locale?: )
}