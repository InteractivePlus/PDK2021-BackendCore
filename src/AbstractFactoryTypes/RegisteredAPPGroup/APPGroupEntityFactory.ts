import {PDKAbstractDataTypes, PDKInternalDataTypes} from 'pdk2021-common';

type APPGroupCreateInfo = {
    [key in keyof PDKAbstractDataTypes.APPGroupEntity]: PDKAbstractDataTypes.APPGroupEntity[key]
}

export type {APPGroupCreateInfo};

interface APPGroupEntityFactory{
    getAPPSystemSetting() : PDKAbstractDataTypes.APPSystemSetting;

    createAPPGroupEntity(createInfo: APPGroupCreateInfo) : PDKAbstractDataTypes.APPGroupEntity;
    getAPPGroupEntity(appGroupId : PDKAbstractDataTypes.APPGroupID) : PDKAbstractDataTypes.APPGroupEntity | undefined;
    updateAPPGroupEntity(appGroupId : PDKAbstractDataTypes.APPGroupID, appGroupEntity : PDKAbstractDataTypes.APPGroupEntity, oldAPPGroupEntity?: PDKAbstractDataTypes.APPGroupEntity) : void;
    deleteAPPGroupEntity(appGroupId : PDKAbstractDataTypes.APPGroupID) : void;

    getAPPGroupEntityCount(
        appGroupId?: PDKAbstractDataTypes.APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string
    ) : number;
    searchAPPGroupEntity(
        appGroupId?: PDKAbstractDataTypes.APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.APPGroupEntity>;
    clearAPPGroupEntity(
        appGroupId?: PDKAbstractDataTypes.APPGroupID,
        nickname?: string,
        description?: string,
        avatarSalt?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {APPGroupEntityFactory};