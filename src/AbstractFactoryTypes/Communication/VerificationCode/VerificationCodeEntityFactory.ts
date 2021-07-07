import { PDKAbstractDataTypes, PDKInternalDataTypes } from "pdk2021-common";

type VerificationCodeCreateEntity<ParamType> = {
    [key in keyof PDKAbstractDataTypes.VerificationCodeEntity<ParamType> as Exclude<key,'veriCodeID'>]: PDKAbstractDataTypes.VerificationCodeEntity<ParamType>[key]
}

export type {VerificationCodeCreateEntity};

interface VerificationCodeEntityFactory<VerifyTokenInfo>{
    getCommunicationSystemSetting() : PDKAbstractDataTypes.CommunicationSystemSetting;

    createVerificationCode<ParamType>(createInfo: VerificationCodeCreateEntity<ParamType>) : PDKAbstractDataTypes.VerificationCodeEntity<ParamType>;
    revokeCreatedVerificationCode<ParamType>(createdVeriCodeEntity : PDKAbstractDataTypes.VerificationCodeEntity<ParamType>) : void;
    
    verifyVerificationCode(verifyInfo : VerifyTokenInfo) : boolean;
    verifyAndUseVerificationCode(verifyInfo : VerifyTokenInfo) : boolean;
    
    getVerificationCode?(veriCodeID : PDKAbstractDataTypes.VeriCodeEntityID) : PDKAbstractDataTypes.VerificationCodeEntity<unknown> | undefined;
    updateVerificationCode?<ParamType>(veriCodeID: PDKAbstractDataTypes.VeriCodeEntityID, veriCode : PDKAbstractDataTypes.VerificationCodeEntity<ParamType>, oldVeriCode?: PDKAbstractDataTypes.VerificationCodeEntity<ParamType>) : void;
    deleteVerificationCode?(veriCodeID: PDKAbstractDataTypes.VeriCodeEntityID) : void;
    
    checkVerificationCodeExist?(veriCodeID: PDKAbstractDataTypes.VeriCodeEntityID) : boolean;
    
    getVerificationCodeCont?(
        veriCodeID?: PDKAbstractDataTypes.VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: PDKAbstractDataTypes.UserEntityUID,
        relatedAPP?: PDKAbstractDataTypes.APPUID,
        relatedMaskID?: PDKAbstractDataTypes.MaskUID,
        relatedAPPClientID?: PDKAbstractDataTypes.APPClientID,
        relatedAPPOAuthToken?: PDKAbstractDataTypes.OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: PDKAbstractDataTypes.CommunicationMethodWithNone
    ) : number;

    searchVerificationCode?(
        veriCodeID?: PDKAbstractDataTypes.VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: PDKAbstractDataTypes.UserEntityUID,
        relatedAPP?: PDKAbstractDataTypes.APPUID,
        relatedMaskID?: PDKAbstractDataTypes.MaskUID,
        relatedAPPClientID?: PDKAbstractDataTypes.APPClientID,
        relatedAPPOAuthToken?: PDKAbstractDataTypes.OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: PDKAbstractDataTypes.CommunicationMethodWithNone,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.VerificationCodeEntity<unknown>>;
    
    clearVerificationCode?(
        veriCodeID?: PDKAbstractDataTypes.VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: PDKAbstractDataTypes.UserEntityUID,
        relatedAPP?: PDKAbstractDataTypes.APPUID,
        relatedMaskID?: PDKAbstractDataTypes.MaskUID,
        relatedAPPClientID?: PDKAbstractDataTypes.APPClientID,
        relatedAPPOAuthToken?: PDKAbstractDataTypes.OAuthAccessToken,
        triggerClientIP?: string,
        issueUTCTimeMin?: number,
        issueUTCTimeMax?: number,
        expireUTCTimeMin?: number,
        expireUTCTimeMax?: number,
        useScope?: string | number,
        used?: boolean,
        sentMethod?: PDKAbstractDataTypes.CommunicationMethodWithNone,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.VerificationCodeEntity<unknown>>
}

export type {VerificationCodeEntityFactory};