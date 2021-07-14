import {APPSystemSetting} from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/SystemSetting/APPSystemSetting';
import { UserGroupGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/UserGroup/UserGroup';

interface BackendAPPSystemSetting extends APPSystemSetting{
    defaultNewAPPGroupId: UserGroupGroupID
}

export type {BackendAPPSystemSetting};