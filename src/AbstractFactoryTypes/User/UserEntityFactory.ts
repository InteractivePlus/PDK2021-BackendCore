import {countries} from 'i18n-codes-js';
import { PhoneNumber, UserEntity, UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';

type UserEntityCreateInfo = {
    [key in keyof UserEntity as Exclude<key,'uid'>]: UserEntity[key]
}

export type {UserEntityCreateInfo};

interface UserEntityFactory{
    getUserSystemSetting() : BackendUserSystemSetting;

    createUser(createInfo : UserEntityCreateInfo) : UserEntity;
    getUser(uid : UserEntityUID) : UserEntity | undefined;
    getUserByUsername(username : string) : UserEntity | undefined;
    getUserByEmail(email : string) : UserEntity | undefined;
    getUserByPhoneNum(phoneNum : PhoneNumber) : UserEntity | undefined;
    updateUser(uid : UserEntityUID, userEntity : UserEntity, oldUserEntity?: UserEntity) : void;
    deleteUser(uid : UserEntityUID) : void;

    getUserCount(
        uid?: UserEntityUID,
        username?: string,
        nickname?: string,
        signature?: string,
        email?: string,
        partialPhone?: string,
        accountCreateTimeGMTMin?: number,
        accountCreateTimeGMTMax?: number,
        accountCreateIP?: string,
        accountCreateArea?: countries.CountryCode,
        accountFrozen?: boolean,
        groupId?: UserGroupGroupID,
        avatarSalt?: string,
        lastLoginTimeGMTMin?: number,
        lastLoginTimeGMTMax?: number,
        lastActiveTimeGMTMin?: number,
        lastActiveTimeGMTMax?: number
    ) : number;
    searchUser(
        uid?: UserEntityUID,
        username?: string,
        nickname?: string,
        signature?: string,
        email?: string,
        partialPhone?: string,
        accountCreateTimeGMTMin?: number,
        accountCreateTimeGMTMax?: number,
        accountCreateIP?: string,
        accountCreateArea?: countries.CountryCode,
        accountFrozen?: boolean,
        groupId?: UserGroupGroupID,
        avatarSalt?: string,
        lastLoginTimeGMTMin?: number,
        lastLoginTimeGMTMax?: number,
        lastActiveTimeGMTMin?: number,
        lastActiveTimeGMTMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<UserEntity>;
    clearUser(
        uid?: UserEntityUID,
        username?: string,
        nickname?: string,
        signature?: string,
        email?: string,
        partialPhone?: string,
        accountCreateTimeGMTMin?: number,
        accountCreateTimeGMTMax?: number,
        accountCreateIP?: string,
        accountCreateArea?: countries.CountryCode,
        accountFrozen?: boolean,
        groupId?: UserGroupGroupID,
        avatarSalt?: string,
        lastLoginTimeGMTMin?: number,
        lastLoginTimeGMTMax?: number,
        lastActiveTimeGMTMin?: number,
        lastActiveTimeGMTMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {UserEntityFactory}