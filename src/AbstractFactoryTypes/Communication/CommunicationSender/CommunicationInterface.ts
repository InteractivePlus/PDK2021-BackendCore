import { PDKAbstractDataTypes } from "@interactiveplus/pdk2021-common";
import { CommunicationContent } from "./Content/CommunicationContent";
import {locales} from 'i18n-codes-js';

type CommAddressType = string | PDKAbstractDataTypes.PhoneNumber;

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
    sendVeriCode(address : AddressType, veriCode : PDKAbstractDataTypes.VerificationCodeEntity<any>, relatedUser?: PDKAbstractDataTypes.UserEntity, relatedAPP?: PDKAbstractDataTypes.APPEntity, relatedMaskID?: PDKAbstractDataTypes.MaskIDEntity, locale?: locales.LocaleCode) : Promise<void>;
}

export type {CommunicationSenderInterface};