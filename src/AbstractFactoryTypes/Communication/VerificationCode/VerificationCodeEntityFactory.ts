import { CommunicationMethodWithNone } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/CommunicationMethod";
import { VeriCodeEntityID, VerificationCodeEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity";
import { MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { OAuthAccessToken } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken";
import { APPClientID, APPUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { SearchResult } from "@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult";
import { BackendCommunicationSystemSetting } from "../../../AbstractDataTypes/SystemSetting/BackendCommunicationSystemSetting";

type VerificationCodeCreateEntity<ParamType> = {
    [key in keyof VerificationCodeEntity<ParamType> as Exclude<key,'veriCodeID'>]: VerificationCodeEntity<ParamType>[key]
}

export type {VerificationCodeCreateEntity};

interface VerificationCodeEntityFactory<VerifyCodeInfo>{
    getCommunicationSystemSetting() : BackendCommunicationSystemSetting;

    createVerificationCode<ParamType>(createInfo: VerificationCodeCreateEntity<ParamType>) : VerificationCodeEntity<ParamType>;
    revokeCreatedVerificationCode<ParamType>(createdVeriCodeEntity : VerificationCodeEntity<ParamType>) : void;
    
    verifyVerificationCode(verifyInfo : VerifyCodeInfo) : boolean;
    verifyAndUseVerificationCode(verifyInfo : VerifyCodeInfo) : boolean;
    /**
     * Check if verifyInfo is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyCodeInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyInfoValid(verifyInfo: any) : VerifyCodeInfo;
    
    getVerificationCode?(veriCodeID : VeriCodeEntityID) : VerificationCodeEntity<unknown> | undefined;
    updateVerificationCode?<ParamType>(veriCodeID: VeriCodeEntityID, veriCode : VerificationCodeEntity<ParamType>, oldVeriCode?: VerificationCodeEntity<ParamType>) : void;
    deleteVerificationCode?(veriCodeID: VeriCodeEntityID) : void;
    
    checkVerificationCodeExist?(veriCodeID: VeriCodeEntityID) : boolean;
    
    getVerificationCodeCont?(
        veriCodeID?: VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: UserEntityUID,
        relatedAPP?: APPUID,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID,
        relatedAPPOAuthToken?: OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: CommunicationMethodWithNone
    ) : number;

    searchVerificationCode?(
        veriCodeID?: VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: UserEntityUID,
        relatedAPP?: APPUID,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID,
        relatedAPPOAuthToken?: OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: CommunicationMethodWithNone,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<VerificationCodeEntity<unknown>>;
    
    clearVerificationCode?(
        veriCodeID?: VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: UserEntityUID,
        relatedAPP?: APPUID,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID,
        relatedAPPOAuthToken?: OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: CommunicationMethodWithNone,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<VerificationCodeEntity<unknown>>
}

export type {VerificationCodeEntityFactory};