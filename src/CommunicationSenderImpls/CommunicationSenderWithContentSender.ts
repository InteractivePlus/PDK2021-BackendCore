import { CommAddressType, CommunicationSenderInterface } from "../AbstractFactoryTypes/Communication/CommunicationSender/CommunicationInterface";
import { CommunicationContent, VeriCodeCommunicationContentGenerator } from "../AbstractFactoryTypes/Communication/CommunicationSender/Content/CommunicationContent";
import { ContentSenderInterface } from "../AbstractFactoryTypes/Communication/CommunicationSender/Content/ContentSenderInterface";
import {PDKAbstractDataTypes} from '@interactiveplus/pdk2021-common';
import {locales} from 'i18n-codes-js';

class CommunicationSenderWithContentSender<AddressType extends CommAddressType> implements CommunicationSenderInterface<AddressType>{
    contentSender: ContentSenderInterface<AddressType>;
    contentGenerator: VeriCodeCommunicationContentGenerator;
    constructor(
        contentSender: ContentSenderInterface<AddressType>,
        contentGenerator: VeriCodeCommunicationContentGenerator
    ){
        this.contentSender = contentSender;
        this.contentGenerator = contentGenerator;
    }
    sendContent(address : AddressType, content : CommunicationContent) : Promise<void>{
        return this.contentSender.sendContent(address,content);
    }
    canSendTo(address : AddressType) : void{
        return this.contentSender.canSendTo(address);
    }
    sendVeriCode(address : AddressType, veriCode : PDKAbstractDataTypes.VerificationCodeEntity<any>, relatedUser?: PDKAbstractDataTypes.UserEntity, relatedAPP?: PDKAbstractDataTypes.APPEntity, relatedMaskID?: PDKAbstractDataTypes.MaskIDEntity, locale?: locales.LocaleCode) : Promise<void>{
        return this.contentSender.sendContent(address,this.contentGenerator.generateContent(veriCode,relatedUser,relatedAPP,relatedMaskID, locale));
    }
}

export {CommunicationSenderWithContentSender};