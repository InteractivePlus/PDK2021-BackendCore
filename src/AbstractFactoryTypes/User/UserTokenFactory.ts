import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { UserAccessToken, UserRefreshToken, UserToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserToken';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';

type UserTokenCreateInfo = {
    [key in keyof UserToken as Exclude<key,'accessToken'|'refreshToken'>]: UserToken[key]
}

export type {UserTokenCreateInfo};

interface UserTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo>{
    getUserSystemSetting() : BackendUserSystemSetting;

    createUserToken(createInfo : UserTokenCreateInfo) : UserToken;

    verifyUserAccessToken(verifyInfo : VerifyAccessTokenInfo) : boolean;
    setUserAccessTokenInvalid?(accessToken : UserAccessToken) : void;
    /**
     * Check if verifyInfo for verifying access token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyAccessTokenInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyAccessTokenInfoValid(verifyInfo: any) : VerifyAccessTokenInfo;

    verifyUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    verifyAndUseUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : boolean;
    /**
     * Check if verifyInfo for verifying refresh token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyRefreshTokenInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
     checkVerifyRefreshTokenInfoValid(verifyInfo: any) : VerifyRefreshTokenInfo;

    getUserToken?(accessToken : UserAccessToken) : UserToken | undefined;
    getUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : UserToken | undefined;
    updateUserToken?(accessToken : UserAccessToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : void;
    updateUserTokenByRefreshToken?(refreshToken : UserRefreshToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : void;
    deleteUserToken?(accessToken : UserAccessToken) : void;
    deleteUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : void;

    getUserTokenCount?(
        userId?: UserEntityUID,
        accessToken?: UserAccessToken,
        refreshToken?: UserRefreshToken,
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
        userId?: UserEntityUID,
        accessToken?: UserAccessToken,
        refreshToken?: UserRefreshToken,
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
    ) : SearchResult<UserToken>;
    clearUserToken(
        userId?: UserEntityUID,
        accessToken?: UserAccessToken,
        refreshToken?: UserRefreshToken,
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