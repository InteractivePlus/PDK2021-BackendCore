import { UserGroup, UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendUserSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendUserSystemSetting';

type UserGroupCreateInfo = UserGroup;

export type {UserGroupCreateInfo};

interface UserGroupFactory{
    getUserSystemSetting() : BackendUserSystemSetting;
    
    createUserGroup(createInfo : UserGroupCreateInfo) : UserGroup;

    getUserGroup(groupId : UserGroupGroupID) : UserGroup | undefined;
    updateUserGroup(groupId : UserGroupGroupID, groupEntity : UserGroup, oldGroupEntity?: UserGroup) : void;
    deleteUserGroup(groupId : UserGroupGroupID) : void;

    getUserGroupCount(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : number;
    searchUserGroup(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<UserGroup>;
    clearUserGroup(
        groupId?: UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {UserGroupFactory};