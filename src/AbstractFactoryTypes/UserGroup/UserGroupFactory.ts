import { UserGroup, UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { AvatarEntityFactory } from '../Avatar/AvatarEntityFactory';
import { BaseFactory } from '../BaseFactory';

type UserGroupCreateInfo = UserGroup;

export type {UserGroupCreateInfo};

interface UserGroupFactoryInstallInfo{
    avatarEntityFactory: AvatarEntityFactory
}

export type {UserGroupFactoryInstallInfo};

interface UserGroupFactory extends BaseFactory<UserGroupFactoryInstallInfo>{
    getUserGroupIDMaxLen() : number;

    getUserSystemSetting() : BackendUserSystemSetting;
    
    createUserGroup(createInfo : UserGroupCreateInfo) : Promise<UserGroup>;

    getUserGroup(groupId : UserGroupGroupID) : Promise<UserGroup | undefined>;
    checkUserGroupIDExist(groupId: UserGroupGroupID) : Promise<boolean>;
    updateUserGroup(groupId : UserGroupGroupID, groupEntity : UserGroup, oldGroupEntity?: UserGroup) : Promise<void>;
    deleteUserGroup(groupId : UserGroupGroupID) : Promise<void>;

    getUserGroupCount(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : Promise<number>;
    searchUserGroup(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<UserGroup>>;
    clearUserGroup(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {UserGroupFactory};