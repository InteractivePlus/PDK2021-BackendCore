import {countries} from 'i18n-codes-js';
import { PhoneNumber, UserEntity, UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { BaseFactory } from '../BaseFactory';
import { AvatarEntityFactory } from '../Avatar/AvatarEntityFactory';
import { UserGroupFactory } from '../UserGroup/UserGroupFactory';

type UserEntityCreateInfo = {
    [key in keyof UserEntity as Exclude<key,'uid'>]: UserEntity[key]
}

export type {UserEntityCreateInfo};

interface UserEntityFactoryInstallInfo{
    avatarEntityFactory: AvatarEntityFactory,
    userGroupFactory: UserGroupFactory
}

export type {UserEntityFactoryInstallInfo};

interface UserEntityFactory extends BaseFactory<UserEntityFactoryInstallInfo>{
    getUserUIDMaxLen() : number;
    getUserUIDExactLen?(): number;
    isUserUIDNumber() : boolean;

    getUserSystemSetting() : BackendUserSystemSetting;

    createUser(createInfo : UserEntityCreateInfo) : Promise<UserEntity>;
    getUser(uid : UserEntityUID) : Promise<UserEntity | undefined>;
    checkUIDExist(uid : UserEntityUID) : Promise<boolean>;
    getUserByUsername(username : string) : Promise<UserEntity | undefined>;
    checkUsernameExist(username: string) : Promise<boolean>;
    getUserByEmail(email : string) : Promise<UserEntity | undefined>;
    checkEmailExist(email : string) : Promise<boolean>;
    getUserByPhoneNum(phoneNum : PhoneNumber) : Promise<UserEntity | undefined>;
    checkPhoneNumExist(phoneNum : PhoneNumber) : Promise<boolean>;
    checkAnyIdentifierExist(username: string, email?: string, phoneNum?: PhoneNumber) : Promise<('username' | 'email' | 'phoneNum')[] | undefined>;
    updateUser(uid : UserEntityUID, userEntity : UserEntity, oldUserEntity?: UserEntity) : Promise<void>;
    deleteUser(uid : UserEntityUID) : Promise<void>;

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
    ) : Promise<number>;
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
    ) : Promise<SearchResult<UserEntity>>;
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
    ) : Promise<void>;
}

export type {UserEntityFactory}