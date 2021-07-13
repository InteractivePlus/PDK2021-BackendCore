import {PDKAbstractDataTypes, PDKInternalDataTypes} from '@interactiveplus/pdk2021-common';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';

type UserTokenCreateInfo = {
    [key in keyof PDKAbstractDataTypes.UserToken as Exclude<key,'accessToken'|'refreshToken'>]: PDKAbstractDataTypes.UserToken[key]
}

export type {UserTokenCreateInfo};

interface UserTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo>{
    getUserSystemSetting() : BackendUserSystemSetting;

    createUserToken(createInfo : UserTokenCreateInfo) : PDKAbstractDataTypes.UserToken;

    verifyUserAccessToken(verifyInfo : VerifyAccessTokenInfo) : boolean;
    setUserAccessTokenInvalid?(accessToken : PDKAbstractDataTypes.UserAccessToken) : void;
    /**
     * Check if verifyInfo for verifying access token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyAccessTokenInfo} Parsed CodeInfo
     * @throws {PDKAbstractDataTypes.PDKRequestParamFormatError}
     */
    checkVerifyAccessTokenInfoValid(verifyInfo: any) : VerifyAccessTokenInfo;

    verifyUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    verifyAndUseUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    /**
     * Check if verifyInfo for verifying refresh token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyRefreshTokenInfo} Parsed CodeInfo
     * @throws {PDKAbstractDataTypes.PDKRequestParamFormatError}
     */
     checkVerifyRefreshTokenInfoValid(verifyInfo: any) : VerifyRefreshTokenInfo;

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