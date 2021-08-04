import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { OAuthAccessToken, OAuthRefreshToken, OAuthToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { OAuthScope } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthScope';
import { BackendOAuthSystemSetting } from '../../../AbstractDataTypes/SystemSetting/BackendOAuthSystemSetting';
import { BaseFactory } from '../../BaseFactory';
import { MaskIDEntityFactory } from '../../MaskID/MaskIDEntityFactory';
import { APPEntityFactory } from '../../RegisteredAPP/APPEntityFactory';
import { UserEntityFactory } from '../../User/UserEntityFactory';
import { APPPermission } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPPermission';
type OAuthTokenCreateInfo = {
    [key in keyof OAuthToken as Exclude<key,'accessToken'|'refreshToken'>]: OAuthToken[key]
}

export type {OAuthTokenCreateInfo};

interface OAuthTokenFactoryInstallInfo{
    maskIDEntityFactory: MaskIDEntityFactory,
    userEntityFactory: UserEntityFactory,
    appEntityFactory: APPEntityFactory
}

export type {OAuthTokenFactoryInstallInfo};

interface OAuthTokenFactoryGrantHistorySearchResult extends Partial<OAuthToken>{
    valid:boolean,
    scopes: OAuthScope[],
    maskUID: MaskUID,
    userUID: UserEntityUID,
    clientID: APPClientID,
    appUID: APPUID,
    identifier: number | string
}

export type {OAuthTokenFactoryGrantHistorySearchResult};

interface OAuthTokenFactory extends BaseFactory<OAuthTokenFactoryInstallInfo>{
    getAccessTokenMaxLen(): number;
    getAccessTokenExactLen?(): number;
    getRefreshTokenMaxLen() : number;
    getRefreshTokenExactLen?() : number;

    getOAuthSystemSetting() : BackendOAuthSystemSetting;

    createOAuthToken(createInfo: OAuthTokenCreateInfo) : Promise<OAuthToken>;

    retrieveOAuthAccessTokenAPPPermissionInfo?(accessToken : OAuthAccessToken) : Promise<APPPermission>;
    verifyOAuthAccessToken(accessToken : OAuthAccessToken, maskUID?: MaskUID, clientID?: APPClientID, requiredScopes?: OAuthScope[]) : Promise<boolean>;
    setOAuthAcessTokenInvalid?(accessToken : OAuthAccessToken) : Promise<void>;

    verifyOAuthRefreshToken(refreshToken : OAuthAccessToken, maskUID?: MaskUID, clientID?: APPClientID) : Promise<boolean>;
    verifyAndUseOAuthRefreshToken(refreshToken : OAuthAccessToken, maskUID?: MaskUID, clientID?: APPClientID) : Promise<OAuthToken | undefined>;

    getOAuthToken?(accessToken : OAuthAccessToken) : Promise<OAuthToken | undefined>;
    getOAuthTokenByRefreshToken?(refreshToken : OAuthRefreshToken) : Promise<OAuthToken | undefined>;
    checkOAuthTokenExist?(accessToken : OAuthAccessToken) : Promise<boolean>;
    checkOAuthRefreshTokenExist?(refreshToken: OAuthRefreshToken) : Promise<boolean>;
    updateOAuthToken?(accessToken : OAuthAccessToken, oAuthToken : OAuthToken, oldOAuthToken?: OAuthToken) : Promise<void>;
    updateOAuthTokenByRefreshToken?(refreshToken: OAuthRefreshToken, oAuthToken : OAuthToken, oldOAuthToken?: OAuthToken) : Promise<void>;
    deleteOAuthToken?(accessToken : OAuthAccessToken) : Promise<void>;
    deleteOAuthTokenByRefreshToken?(refreshToken : OAuthRefreshToken) : Promise<void>;

    getAuthorizedRecordCountByMaskID(maskID : MaskUID) : Promise<number>;
    listAuthorizedRecordsByMaskID(maskID: MaskUID, numLimit? : number, startPosition? : number) : Promise<SearchResult<OAuthTokenFactoryGrantHistorySearchResult>>;
    clearAuthorizedRecordsByMaskID(maskID: MaskUID, numLimit? : number, startPosition? : number) : Promise<void>;
    
    getAuthorizedRecordCountByUID(uid : UserEntityUID) : Promise<number>;
    listAuthorizedRecordsByUID(uid: UserEntityUID, numLimit? : number, startPosition? : number) : Promise<SearchResult<OAuthTokenFactoryGrantHistorySearchResult>>;
    clearAuthorizedRecordsByUID(uid: UserEntityUID, numLimit? : number, startPosition? : number) : Promise<void>;

    deleteAuthorizedAPPGrantByHistoryIdentifier(idenfifier: number | string, operatorUserUID? : UserEntityUID) : Promise<void>;

    getOAuthTokenCount?(
        maskUID?: MaskUID,
        userUID?: UserEntityUID,
        clientID?: APPClientID,
        appUID?: APPUID,
        accessToken?: OAuthAccessToken,
        refreshToken?: OAuthRefreshToken,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        refreshedTimeGMTMin?: number,
        refreshedTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        refreshExpireTimeGMTMin?: number,
        refreshExpireTimeGMTMax?: number,
        valid?: boolean,
        invalidDueToRefresh?: boolean,
        useSideRemoteAddr?: string,
        appSideRemoteAddr?: string,
    ) : Promise<number>;
    searchOAuthToken?(
        maskUID?: MaskUID,
        userUID?: UserEntityUID,
        clientID?: APPClientID,
        appUID?: APPUID,
        accessToken?: OAuthAccessToken,
        refreshToken?: OAuthRefreshToken,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        refreshedTimeGMTMin?: number,
        refreshedTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        refreshExpireTimeGMTMin?: number,
        refreshExpireTimeGMTMax?: number,
        valid?: boolean,
        invalidDueToRefresh?: boolean,
        useSideRemoteAddr?: string,
        appSideRemoteAddr?: string,
        numLimit?: number,
        startPosition?: number
     ) : Promise<SearchResult<OAuthToken>>;
    
     clearOAuthToken?(
        maskUID?: MaskUID,
        userUID?: UserEntityUID,
        clientID?: APPClientID,
        appUID?: APPUID,
        accessToken?: OAuthAccessToken,
        refreshToken?: OAuthRefreshToken,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        refreshedTimeGMTMin?: number,
        refreshedTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        refreshExpireTimeGMTMin?: number,
        refreshExpireTimeGMTMax?: number,
        valid?: boolean,
        invalidDueToRefresh?: boolean,
        useSideRemoteAddr?: string,
        appSideRemoteAddr?: string,
        numLimit?: number,
        startPosition?: number
     ) : Promise<void>;
}

export type {OAuthTokenFactory};