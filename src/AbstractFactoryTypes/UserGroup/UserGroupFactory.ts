import { UserGroup, UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';
import { BaseFactory } from '../BaseFactory';

type UserGroupCreateInfo = UserGroup;

export type {UserGroupCreateInfo};

interface UserGroupFactory extends BaseFactory<void>{
    getUserGroupIDMaxLen() : number;
    
    getUserSystemSetting() : BackendUserSystemSetting;
    
    createUserGroup(createInfo : UserGroupCreateInfo) : Promise<UserGroup>;

    getUserGroup(groupId : UserGroupGroupID) : Promise<UserGroup | undefined>;
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