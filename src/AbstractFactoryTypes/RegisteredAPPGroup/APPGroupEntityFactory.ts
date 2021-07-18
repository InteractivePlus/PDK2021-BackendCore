import { APPGroupEntity, APPGroupID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPPGroup/APPGroupEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';
import { AvatarEntityFactory } from '../Avatar/AvatarEntityFactory';
import { BaseFactory } from '../BaseFactory';

type APPGroupCreateInfo = {
    [key in keyof APPGroupEntity]: APPGroupEntity[key]
}

export type {APPGroupCreateInfo};

interface APPGroupEntityFactoryInstallInfo{
    avatarEntityFactory: AvatarEntityFactory
}

export type {APPGroupEntityFactoryInstallInfo};

interface APPGroupEntityFactory extends BaseFactory<APPGroupEntityFactoryInstallInfo>{
    getAPPGroupIDMaxLen() : number;

    getAPPSystemSetting() : BackendAPPSystemSetting;

    createAPPGroupEntity(createInfo: APPGroupCreateInfo) : Promise<APPGroupEntity>;
    getAPPGroupEntity(appGroupId : APPGroupID) : Promise<APPGroupEntity | undefined>;
    updateAPPGroupEntity(appGroupId : APPGroupID, appGroupEntity : APPGroupEntity, oldAPPGroupEntity?: APPGroupEntity) : Promise<void>;
    deleteAPPGroupEntity(appGroupId : APPGroupID) : void;

    getAPPGroupEntityCount(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : Promise<number>;
    searchAPPGroupEntity(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<APPGroupEntity>>;
    clearAPPGroupEntity(
        appGroupId?: APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {APPGroupEntityFactory};