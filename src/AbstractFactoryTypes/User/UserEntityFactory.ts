import {PDKAbstractDataTypes, PDKInternalDataTypes} from '@interactiveplus/pdk2021-common';
import {countries} from 'i18n-codes-js';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';

type UserEntityCreateInfo = {
    [key in keyof PDKAbstractDataTypes.UserEntity as Exclude<key,'uid'>]: PDKAbstractDataTypes.UserEntity[key]
}

export type {UserEntityCreateInfo};

interface UserEntityFactory{
    getUserSystemSetting() : BackendUserSystemSetting;

    createUser(createInfo : UserEntityCreateInfo) : PDKAbstractDataTypes.UserEntity;
    getUser(uid : PDKAbstractDataTypes.UserEntityUID) : PDKAbstractDataTypes.UserEntity | undefined;
    getUserByUsername(username : string) : PDKAbstractDataTypes.UserEntity | undefined;
    getUserByEmail(email : string) : PDKAbstractDataTypes.UserEntity | undefined;
    getUserByPhoneNum(phoneNum : PDKAbstractDataTypes.PhoneNumber) : PDKAbstractDataTypes.UserEntity | undefined;
    updateUser(uid : PDKAbstractDataTypes.UserEntityUID, userEntity : PDKAbstractDataTypes.UserEntity, oldUserEntity?: PDKAbstractDataTypes.UserEntity) : void;
    deleteUser(uid : PDKAbstractDataTypes.UserEntityUID) : void;

    getUserCount(
        uid?: PDKAbstractDataTypes.UserEntityUID,
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
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
        avatarSalt?: string,
        lastLoginTimeGMTMin?: number,
        lastLoginTimeGMTMax?: number,
        lastActiveTimeGMTMin?: number,
        lastActiveTimeGMTMax?: number
    ) : number;
    searchUser(
        uid?: PDKAbstractDataTypes.UserEntityUID,
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
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
        avatarSalt?: string,
        lastLoginTimeGMTMin?: number,
        lastLoginTimeGMTMax?: number,
        lastActiveTimeGMTMin?: number,
        lastActiveTimeGMTMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.UserEntity>;
    clearUser(
        uid?: PDKAbstractDataTypes.UserEntityUID,
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
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
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