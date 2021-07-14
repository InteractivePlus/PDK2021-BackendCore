import { APPGroupEntity, APPGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPPGroup/APPGroupEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';

type APPGroupCreateInfo = {
    [key in keyof APPGroupEntity]: APPGroupEntity[key]
}

export type {APPGroupCreateInfo};

interface APPGroupEntityFactory{
    getAPPSystemSetting() : BackendAPPSystemSetting;

    createAPPGroupEntity(createInfo: APPGroupCreateInfo) : APPGroupEntity;
    getAPPGroupEntity(appGroupId : APPGroupID) : APPGroupEntity | undefined;
    updateAPPGroupEntity(appGroupId : APPGroupID, appGroupEntity : APPGroupEntity, oldAPPGroupEntity?: APPGroupEntity) : void;
    deleteAPPGroupEntity(appGroupId : APPGroupID) : void;

    getAPPGroupEntityCount(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : number;
    searchAPPGroupEntity(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<APPGroupEntity>;
    clearAPPGroupEntity(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {APPGroupEntityFactory};