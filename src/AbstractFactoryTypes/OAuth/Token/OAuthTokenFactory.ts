import {PDKAbstractDataTypes, PDKInternalDataTypes} from '@interactiveplus/pdk2021-common';
type OAuthTokenCreateInfo = {
    [key in keyof PDKAbstractDataTypes.OAuthToken as Exclude<key,'accessToken'|'refreshToken'>]: PDKAbstractDataTypes.OAuthToken[key]
}

export type {OAuthTokenCreateInfo};

interface OAuthTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo>{
    getOAuthSystemSetting() : PDKAbstractDataTypes.OAuthSystemSetting;
    
    createOAuthToken(createInfo: OAuthTokenCreateInfo) : PDKAbstractDataTypes.OAuthToken;

    verifyOAuthAccessToken(verifyInfo : VerifyAccessTokenInfo) : boolean;
    setOAuthAcessTokenInvalid?(accessToken : PDKAbstractDataTypes.OAuthAccessToken) : void;

    verifyOAuthRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    verifyAndUseOAuthRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    
    getOAuthToken?(accessToken : PDKAbstractDataTypes.OAuthAccessToken) : PDKAbstractDataTypes.OAuthToken | undefined;
    getOAuthTokenByRefreshToken?(refreshToken : PDKAbstractDataTypes.OAuthRefreshToken) : PDKAbstractDataTypes.OAuthToken | undefined;
    updateOAuthToken?(accessToken : PDKAbstractDataTypes.OAuthAccessToken, oAuthToken : PDKAbstractDataTypes.OAuthToken, oldOAuthToken?: PDKAbstractDataTypes.OAuthToken) : void;
    updateOAuthTokenByRefreshToken?(refreshToken: PDKAbstractDataTypes.OAuthRefreshToken, oAuthToken : PDKAbstractDataTypes.OAuthToken, oldOAuthToken?: PDKAbstractDataTypes.OAuthToken) : void;
    deleteOAuthToken?(accessToken : PDKAbstractDataTypes.OAuthAccessToken) : void;
    deleteOAuthTokenByRefreshToken?(refreshToken : PDKAbstractDataTypes.OAuthRefreshToken) : void;

    getOAuthTokenCount?(
        maskUID?: PDKAbstractDataTypes.MaskUID,
        userUID?: PDKAbstractDataTypes.UserEntityUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        appUID?: PDKAbstractDataTypes.APPUID,
        accessToken?: PDKAbstractDataTypes.OAuthAccessToken,
        refreshToken?: PDKAbstractDataTypes.OAuthRefreshToken,
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
        maskUID?: PDKAbstractDataTypes.MaskUID,
        userUID?: PDKAbstractDataTypes.UserEntityUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        appUID?: PDKAbstractDataTypes.APPUID,
        accessToken?: PDKAbstractDataTypes.OAuthAccessToken,
        refreshToken?: PDKAbstractDataTypes.OAuthRefreshToken,
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
     ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.OAuthToken>;
    
     clearOAuthToken?(
        maskUID?: PDKAbstractDataTypes.MaskUID,
        userUID?: PDKAbstractDataTypes.UserEntityUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        appUID?: PDKAbstractDataTypes.APPUID,
        accessToken?: PDKAbstractDataTypes.OAuthAccessToken,
        refreshToken?: PDKAbstractDataTypes.OAuthRefreshToken,
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