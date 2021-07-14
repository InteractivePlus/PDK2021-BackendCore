import {UserSystemSetting} from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/SystemSetting/UserSystemSetting';
import { UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';

interface BackendUserSystemSetting extends UserSystemSetting{
    defaultNewUserGroupId: UserGroupGroupID,
    passwordEncrypt(passwordToEncrypt : string) : string
}

export type {BackendUserSystemSetting};