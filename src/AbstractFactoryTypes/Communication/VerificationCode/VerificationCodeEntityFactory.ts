import { CommunicationMethodWithNone } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/CommunicationMethod";
import { VeriCodeEntityID, VerificationCodeEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity";
import { MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { OAuthAccessToken } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken";
import { APPClientID, APPUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { SearchResult } from "@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult";
import { BackendCommunicationSystemSetting } from "../../../AbstractDataTypes/SystemSetting/BackendCommunicationSystemSetting";
import { BaseFactory } from "../../BaseFactory";

type VerificationCodeCreateEntity<ParamType> = {
    [key in keyof VerificationCodeEntity<ParamType> as Exclude<key,'veriCodeID'>]: VerificationCodeEntity<ParamType>[key]
}

export type {VerificationCodeCreateEntity};

interface VerificationCodeEntityFactory<VerifyCodeInfo> extends BaseFactory{
    getCommunicationSystemSetting() : BackendCommunicationSystemSetting;

    createVerificationCode<ParamType>(createInfo: VerificationCodeCreateEntity<ParamType>) : Promise<VerificationCodeEntity<ParamType>>;
    revokeCreatedVerificationCode<ParamType>(createdVeriCodeEntity : VerificationCodeEntity<ParamType>) : Promise<void>;
    
    verifyVerificationCode(verifyInfo : VerifyCodeInfo) : Promise<boolean>;
    verifyAndUseVerificationCode(verifyInfo : VerifyCodeInfo) : Promise<boolean>;
    /**
     * Check if verifyInfo is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyCodeInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyInfoValid(verifyInfo: any) : Promise<VerifyCodeInfo>;
    
    getVerificationCode?(veriCodeID : VeriCodeEntityID) : Promise<VerificationCodeEntity<unknown> | undefined>;
    updateVerificationCode?<ParamType>(veriCodeID: VeriCodeEntityID, veriCode : VerificationCodeEntity<ParamType>, oldVeriCode?: VerificationCodeEntity<ParamType>) : Promise<void>;
    deleteVerificationCode?(veriCodeID: VeriCodeEntityID) : Promise<void>;
    
    checkVerificationCodeExist?(veriCodeID: VeriCodeEntityID) : Promise<boolean>;
    
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
    ) : Promise<number>;

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
    ) : Promise<SearchResult<VerificationCodeEntity<unknown>>>;
    
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
    ) : Promise<SearchResult<VerificationCodeEntity<unknown>>>;
}

export type {VerificationCodeEntityFactory};