import { CommAddressType, CommunicationSenderInterface } from "../AbstractFactoryTypes/Communication/CommunicationSender/CommunicationInterface";
import { CommunicationContent, VeriCodeCommunicationContentGenerator } from "../AbstractFactoryTypes/Communication/CommunicationSender/Content/CommunicationContent";
import { ContentSenderInterface } from "../AbstractFactoryTypes/Communication/CommunicationSender/Content/ContentSenderInterface";
import { VerificationCodeEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity";
import { APPEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntity';
import {locales} from 'i18n-codes-js';
import { UserEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { MaskIDEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";

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
    sendVeriCode(address : AddressType, veriCode : VerificationCodeEntity<any>, relatedUser?: UserEntity, relatedAPP?: APPEntity, relatedMaskID?: MaskIDEntity, locale?: locales.LocaleCode) : Promise<void>{
        return this.contentSender.sendContent(address,this.contentGenerator.generateContent(veriCode,relatedUser,relatedAPP,relatedMaskID, locale));
    }
}

export {CommunicationSenderWithContentSender};