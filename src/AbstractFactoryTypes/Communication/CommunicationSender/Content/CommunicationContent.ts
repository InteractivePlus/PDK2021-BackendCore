import {PDKAbstractDataTypes} from 'pdk2021-common';
import {locales} from 'i18n-codes-js';

interface CommunicationContent{
    title?: string,
    content?: string,
    relatedLink?: string
}

export type {CommunicationContent};

interface VeriCodeCommunicationContentGenerator{
    generateContent(VerificationCode : PDKAbstractDataTypes.VeriCodeEntityID, locale?: locales.LocaleCode) : CommunicationContent;
}

export type {VeriCodeCommunicationContentGenerator};