import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { UserAccessToken, UserRefreshToken, UserToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserToken';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BaseFactory } from '../BaseFactory';
import { UserEntityFactory } from './UserEntityFactory';
import { UserPermission } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserPermission';

type UserTokenCreateInfo = {
    [key in keyof UserToken as Exclude<key,'accessToken'|'refreshToken'>]: UserToken[key]
}

export type {UserTokenCreateInfo};

interface UserTokenFactoryInstallInfo{
    userEntityFactory: UserEntityFactory
}

export type {UserTokenFactoryInstallInfo};

interface UserTokenFactory extends BaseFactory<UserTokenFactoryInstallInfo>{
    getAccessTokenMaxLen() : number;
    getAccessTokenExactLen?() : number;
    getRefreshTokenMaxLen() : number;
    getRefreshTokenExactLen?() : number;

    getUserSystemSetting() : BackendUserSystemSetting;

    createUserToken(createInfo : UserTokenCreateInfo) : Promise<UserToken>;

    retrieveUserAccessTokenPermissionInfo?(accessToken: UserAccessToken) : Promise<UserPermission>;

    verifyUserAccessToken(accessToken: UserAccessToken, userId: UserEntityUID) : Promise<boolean>;
    setUserAccessTokenInvalid?(accessToken : UserAccessToken) : Promise<void>;

    verifyUserRefreshToken(refreshToken : UserRefreshToken, userId: UserEntityUID) : Promise<boolean>;
    verifyAndUseUserRefreshToken(refreshToken : UserRefreshToken, userId: UserEntityUID) : Promise<UserToken | undefined>;

    getUserToken?(accessToken : UserAccessToken) : Promise<UserToken | undefined>;
    checkUserTokenExist?(accessToken : UserAccessToken) : Promise<boolean>;
    getUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : Promise<UserToken | undefined>;
    checkUserRefreshTokenExist?(refreshToken: UserRefreshToken) : Promise<boolean>;
    updateUserToken?(accessToken : UserAccessToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : Promise<void>;
    updateUserTokenByRefreshToken?(refreshToken : UserRefreshToken, tokenEntity : UserToken, oldTokenEntity?: UserToken) : Promise<void>;
    deleteUserToken?(accessToken : UserAccessToken) : Promise<void>;
    deleteUserTokenByRefreshToken?(refreshToken : UserRefreshToken) : Promise<void>;

    clearUserOwnedToken(uid: UserEntityUID) : Promise<void>;

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
    searchUserToken?(
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
    clearUserToken?(
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