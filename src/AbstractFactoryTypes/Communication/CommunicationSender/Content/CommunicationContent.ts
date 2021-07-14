import {locales} from 'i18n-codes-js';
import { VerificationCodeEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity';
import { MaskIDEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { APPEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntity';
import { UserEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';

interface CommunicationContent{
    title?: string,
    content?: string,
    relatedLink?: string
}

export type {CommunicationContent};

interface VeriCodeCommunicationContentGenerator{
    generateContent(VerificationCode : VerificationCodeEntity<any>, relatedUser?: UserEntity, relatedAPP?: APPEntity, relatedMaskID?: MaskIDEntity, locale?: locales.LocaleCode) : CommunicationContent;
}

export type {VeriCodeCommunicationContentGenerator};