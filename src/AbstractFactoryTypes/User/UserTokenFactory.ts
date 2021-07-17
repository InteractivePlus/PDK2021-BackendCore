import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { UserAccessToken, UserRefreshToken, UserToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserToken';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BaseFactory } from '../BaseFactory';

type UserTokenCreateInfo = {
    [key in keyof UserToken as Exclude<key,'accessToken'|'refreshToken'>]: UserToken[key]
}

export type {UserTokenCreateInfo};

interface UserTokenFactory<VerifyAccessTokenInfo, VerifyRefreshTokenInfo> extends BaseFactory{
    getUserSystemSetting() : BackendUserSystemSetting;

    createUserToken(createInfo : UserTokenCreateInfo) : Promise<UserToken>;

    verifyUserAccessToken(verifyInfo : VerifyAccessTokenInfo) : Promise<boolean>;
    setUserAccessTokenInvalid?(accessToken : UserAccessToken) : Promise<void>;
    /**
     * Check if verifyInfo for verifying access token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyAccessTokenInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyAccessTokenInfoValid(verifyInfo: any) : Promise<VerifyAccessTokenInfo>;

    verifyUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : Promise<boolean>;
    verifyAndUseUserRefreshToken(verifyInfo : VerifyRefreshTokenInfo) : Promise<boolean>;
    /**
     * Check if verifyInfo for verifying refresh token is in correct format
     * @param verifyInfo struct passed by client
     * @returns {VerifyRefreshTokenInfo} Parsed CodeInfo
     * @throws {PDKRequestParamFormatError}
     */
    checkVerifyRefreshTokenInfoValid(verifyInfo: any) : Promise<VerifyRefreshTokenInfo>;

    getUserToken?(accessToken : UserAccessToken) : Promise<UserToken | undefined>;
    getUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : Promise<UserToken | undefined>;
    updateUserToken?(accessToken : UserAccessToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : Promise<void>;
    updateUserTokenByRefreshToken?(refreshToken : UserRefreshToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : Promise<void>;
    deleteUserToken?(accessToken : UserAccessToken) : Promise<void>;
    deleteUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : Promise<void>;

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
    ) : Promise<number>;
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
    ) : Promise<SearchResult<UserToken>>;
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
    ) : Promise<void>;
}
export type {UserTokenFactory};