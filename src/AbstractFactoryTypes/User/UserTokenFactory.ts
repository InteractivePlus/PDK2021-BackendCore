import {PDKAbstractDataTypes, PDKInternalDataTypes} from '@interactiveplus/pdk2021-common';

type UserTokenCreateInfo = {
    [key in keyof PDKAbstractDataTypes.UserToken as Exclude<key,'accessToken'|'refreshToken'>]: PDKAbstractDataTypes.UserToken[key]
}

export type {UserTokenCreateInfo};

interface UserTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo>{
    getUserSystemSetting() : PDKAbstractDataTypes.UserSystemSetting;

    createUserToken(createInfo : UserTokenCreateInfo) : PDKAbstractDataTypes.UserToken;

    verifyUserAccessToken(verifyInfo : VerifyAccessTokenInfo) : boolean;
    setUserAccessTokenInvalid?(accessToken : PDKAbstractDataTypes.UserAccessToken) : void;

    verifyUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    verifyAndUseUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;

    getUserToken?(accessToken : PDKAbstractDataTypes.UserAccessToken) : PDKAbstractDataTypes.UserToken | undefined;
    getUserTokenByRefreshToken?(refreshToken : PDKAbstractDataTypes.UserRefreshToken) : PDKAbstractDataTypes.UserToken | undefined;
    updateUserToken?(accessToken : PDKAbstractDataTypes.UserAccessToken, tokenEntity : PDKAbstractDataTypes.UserToken, oldTokenEntity?: PDKAbstractDataTypes.UserToken) : void;
    updateUserTokenByRefreshToken?(refreshToken : PDKAbstractDataTypes.UserRefreshToken, tokenEntity : PDKAbstractDataTypes.UserToken, oldTokenEntity?: PDKAbstractDataTypes.UserToken) : void;
    deleteUserToken?(accessToken : PDKAbstractDataTypes.UserAccessToken) : void;
    deleteUserTokenByRefreshToken?(refreshToken : PDKAbstractDataTypes.UserRefreshToken) : void;

    getUserTokenCount?(
        userId?: PDKAbstractDataTypes.UserEntityUID,
        accessToken?: PDKAbstractDataTypes.UserAccessToken,
        refreshToken?: PDKAbstractDataTypes.UserRefreshToken,
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
        issueRemoteAddr?: string,
        renewRemoteAddr?: string
    ) : number;
    searchUserToken(
        userId?: PDKAbstractDataTypes.UserEntityUID,
        accessToken?: PDKAbstractDataTypes.UserAccessToken,
        refreshToken?: PDKAbstractDataTypes.UserRefreshToken,
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
        issueRemoteAddr?: string,
        renewRemoteAddr?: string,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.UserToken>;
    clearUserToken(
        userId?: PDKAbstractDataTypes.UserEntityUID,
        accessToken?: PDKAbstractDataTypes.UserAccessToken,
        refreshToken?: PDKAbstractDataTypes.UserRefreshToken,
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
        issueRemoteAddr?: string,
        renewRemoteAddr?: string,
        numLimit?:number,
        startPosition?:number
    ) : void;
}
export type {UserTokenFactory};