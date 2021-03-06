import { CommunicationMethodWithNone } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/CommunicationMethod";
import { VeriCodeEntityID, VerificationCodeEntity } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/VerificationCode/VerificationCodeEntity";
import { MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { OAuthAccessToken } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken";
import { APPClientID, APPUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { SearchResult } from "@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult";
import { BackendCommunicationSystemSetting } from "../../../AbstractDataTypes/SystemSetting/BackendCommunicationSystemSetting";
import { BaseFactory } from "../../BaseFactory";
import { MaskIDEntityFactory } from "../../MaskID/MaskIDEntityFactory";
import { OAuthTokenFactory } from "../../OAuth/Token/OAuthTokenFactory";
import { APPEntityFactory } from "../../RegisteredAPP/APPEntityFactory";
import { UserEntityFactory } from "../../User/UserEntityFactory";

type VerificationCodeCreateEntity<ParamType> = {
    [key in keyof VerificationCodeEntity<ParamType> as Exclude<key,'veriCodeID'>]: VerificationCodeEntity<ParamType>[key]
}

export type {VerificationCodeCreateEntity};

interface VerificationCodeEntityFactoryInstallInfo{
    userEntityFactory: UserEntityFactory,
    appEntityFactory: APPEntityFactory,
    maskIDEntityFactory: MaskIDEntityFactory,
    oAuthTokenEntityFactory: OAuthTokenFactory
}

export type {VerificationCodeEntityFactoryInstallInfo};

interface VerificationCodeEntityFactory extends BaseFactory<VerificationCodeEntityFactoryInstallInfo>{
    getVerificationCodeMaxLen() : number;
    getVerificationCodeExactLen?() : number;
    getVerificationCodeShortCodeMaxLen() : number;
    getVerificationCodeShortCodeExactLen?(): number;

    getCommunicationSystemSetting() : BackendCommunicationSystemSetting;

    createVerificationCode<ParamType>(createInfo: VerificationCodeCreateEntity<ParamType>) : Promise<VerificationCodeEntity<ParamType>>;
    revokeCreatedVerificationCode<ParamType>(createdVeriCodeEntity : VerificationCodeEntity<ParamType>) : Promise<void>;
    
    verifyVerificationCode(veriCode : VeriCodeEntityID, isShortCode : boolean, uid?: UserEntityUID, appuid?: APPUID | null, client_id?: APPClientID | null, mask_id?: MaskUID, useScope?: string | number) : Promise<boolean>;
    verifyAndUseVerificationCode(veriCode : VeriCodeEntityID, isShortCode : boolean, uid?: UserEntityUID, appuid?: APPUID | null, client_id?: APPClientID | null, mask_id?: MaskUID, useScope?: string | number) : Promise<boolean>;
    
    getVerificationCode?(veriCodeID : VeriCodeEntityID) : Promise<VerificationCodeEntity<unknown> | undefined>;
    updateVerificationCode?<ParamType>(veriCodeID: VeriCodeEntityID, veriCode : VerificationCodeEntity<ParamType>, oldVeriCode?: VerificationCodeEntity<ParamType>) : Promise<void>;
    deleteVerificationCode?(veriCodeID: VeriCodeEntityID) : Promise<void>;
    
    checkVerificationCodeExist?(veriCodeID: VeriCodeEntityID) : Promise<boolean>;
    
    getVerificationCodeCount?(
        veriCodeID?: VeriCodeEntityID,
        isShortID?: boolean,
        relatedUser?: UserEntityUID,
        relatedAPP?: APPUID | null,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID | null,
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
        relatedAPP?: APPUID | null,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID | null,
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
        relatedAPP?: APPUID | null,
        relatedMaskID?: MaskUID,
        relatedAPPClientID?: APPClientID | null,
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