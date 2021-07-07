import {PDKAbstractDataTypes, PDKInternalDataTypes} from 'pdk2021-common';

type UserGroupCreateInfo = PDKAbstractDataTypes.UserGroup;

export type {UserGroupCreateInfo};

interface UserGroupFactory{
    getUserSystemSetting() : PDKAbstractDataTypes.UserSystemSetting;
    
    createUserGroup(createInfo : UserGroupCreateInfo) : PDKAbstractDataTypes.UserGroup;

    getUserGroup(groupId : PDKAbstractDataTypes.UserGroupGroupID) : PDKAbstractDataTypes.UserGroup | undefined;
    updateUserGroup(groupId : PDKAbstractDataTypes.UserGroupGroupID, groupEntity : PDKAbstractDataTypes.UserGroup, oldGroupEntity?: PDKAbstractDataTypes.UserGroup) : void;
    deleteUserGroup(groupId : PDKAbstractDataTypes.UserGroupGroupID) : void;

    getUserGroupCount(
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : number;
    searchUserGroup(
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.UserGroup>;
    clearUserGroup(
        groupId?: PDKAbstractDataTypes.UserGroupGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {UserGroupFactory};