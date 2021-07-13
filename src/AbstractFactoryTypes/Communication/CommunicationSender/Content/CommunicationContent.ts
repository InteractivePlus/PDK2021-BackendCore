import {PDKAbstractDataTypes} from '@interactiveplus/pdk2021-common';
import {locales} from 'i18n-codes-js';

interface CommunicationContent{
    title?: string,
    content?: string,
    relatedLink?: string
}

export type {CommunicationContent};

interface VeriCodeCommunicationContentGenerator{
    generateContent(VerificationCode : PDKAbstractDataTypes.VerificationCodeEntity<any>, relatedUser?: PDKAbstractDataTypes.UserEntity, relatedAPP?: PDKAbstractDataTypes.APPEntity, relatedMaskID?: PDKAbstractDataTypes.MaskIDEntity, locale?: locales.LocaleCode) : CommunicationContent;
}

export type {VeriCodeCommunicationContentGenerator};