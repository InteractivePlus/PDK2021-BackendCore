import { CommunicationContent } from "./Content/CommunicationContent";
import {locales} from 'i18n-codes-js';
import { PhoneNumber, UserEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { VerificationCodeEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity";
import { APPEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntity";
import { MaskIDEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";

type CommAddressType = string | PhoneNumber;

export type {CommAddressType};

interface CommunicationSenderInterface<AddressType extends CommAddressType>{
    /**
     * SendContent
     * @param address 
     * @param content 
     * @throws {PDKSenderServiceError}
     */
    sendContent?(address : AddressType, content : CommunicationContent) : Promise<void>;
    
    canSendTo(address : AddressType) : void;
    
    /**
     * Send Verification Code
     * @param address 
     * @param veriCode 
     * @param locale 
     * @throws {PDKSenderServiceError}
     */
    sendVeriCode(address : AddressType, veriCode : VerificationCodeEntity<any>, relatedUser?: UserEntity, relatedAPP?: APPEntity, relatedMaskID?: MaskIDEntity, locale?: locales.LocaleCode) : Promise<void>;
}

export type {CommunicationSenderInterface};