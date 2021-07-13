import {PDKAbstractDataTypes} from '@interactiveplus/pdk2021-common';

interface BackendAPPSystemSetting extends PDKAbstractDataTypes.APPSystemSetting{
    defaultNewAPPGroupId: PDKAbstractDataTypes.UserGroupGroupID
}

export type {BackendAPPSystemSetting};