import { CommAddressType } from "../CommunicationInterface";
import { CommunicationContent } from "./CommunicationContent";

interface ContentSenderInterface<AddressType extends CommAddressType>{
    
    /**
     * Send Content
     * @param address 
     * @param content
     * @throws {PDKSenderServiceError}
     */
    sendContent(address : AddressType, content : CommunicationContent) : Promise<void>;
    
    
    canSendTo(address : AddressType) : void;
}

export type {ContentSenderInterface};