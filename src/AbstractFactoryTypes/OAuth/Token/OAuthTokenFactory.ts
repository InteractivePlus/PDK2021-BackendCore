import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { OAuthAccessToken, OAuthRefreshToken, OAuthToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendOAuthSystemSetting } from '../../../AbstractDataTypes/SystemSetting/BackendOAuthSystemSetting';
type OAuthTokenCreateInfo = {
    [key in keyof OAuthToken as Exclude<key,'accessToken'|'refreshToken'>]: OAuthToken[key]
}

export type {OAuthTokenCreateInfo};

interface OAuthTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo>{
    getOAuthSystemSetting() : BackendOAuthSystemSetting;
    
    createOAuthToken(createInfo: OAuthTokenCreateInfo) : OAuthToken;

    verifyOAuthAccessToken(verifyInfo : VerifyAccessTokenInfo) : boolean;
    setOAuthAcessTokenInvalid?(accessToken : OAuthAccessToken) : void;

    verifyOAuthRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    verifyAndUseOAuthRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    /**
     * Check if verifyInfo for verifying access code is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyRefreshTokenInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyAccessTokenInfoValid(verifyInfo: any) : VerifyAccessTokenInfo;

    /**
     * Check if verifyInfo for verifying refresh code is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyCodeInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
     checkVerifyRefreshTokenInfoValid(verifyInfo: any) : VerifyRefreshTokenInfo;
    
    getOAuthToken?(accessToken : OAuthAccessToken) : OAuthToken | undefined;
    getOAuthTokenByRefreshToken?(refreshToken : OAuthRefreshToken) : OAuthToken | undefined;
    updateOAuthToken?(accessToken : OAuthAccessToken, oAuthToken : OAuthToken, oldOAuthToken?: OAuthToken) : void;
    updateOAuthTokenByRefreshToken?(refreshToken: OAuthRefreshToken, oAuthToken : OAuthToken, oldOAuthToken?: OAuthToken) : void;
    deleteOAuthToken?(accessToken : OAuthAccessToken) : void;
    deleteOAuthTokenByRefreshToken?(refreshToken : OAuthRefreshToken) : void;

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
    ) : number;
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
     ) : SearchResult<OAuthToken>;
    
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
     ) : void;
}

export type {OAuthTokenFactory};