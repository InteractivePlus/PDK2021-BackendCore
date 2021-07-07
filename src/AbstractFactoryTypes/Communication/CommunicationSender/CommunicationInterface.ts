import { PDKAbstractDataTypes } from "pdk2021-common";
import { CommunicationContent } from "./Content/CommunicationContent";

type CommAddressType = string | PDKAbstractDataTypes.PhoneNumber;

interface CommunicationSender<AddressType extends CommAddressType, ContentType>{
    sendContent?(address : AddressType, content : CommunicationContent) : void;
    sendVeriCode(address : AddressType, veriCode : PDKAbstractDataTypes.VeriCodeEntityID) : void;
}

export type {CommunicationSender};