import {PDKAbstractDataTypes} from '@interactiveplus/pdk2021-common';

interface BackendUserSystemSetting extends PDKAbstractDataTypes.UserSystemSetting{
    defaultNewUserGroupId: PDKAbstractDataTypes.UserGroupGroupID,
    passwordEncrypt(passwordToEncrypt : string) : string
}

export type {BackendUserSystemSetting};