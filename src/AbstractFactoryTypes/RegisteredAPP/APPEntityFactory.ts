import {PDKAbstractDataTypes, PDKInternalDataTypes} from 'pdk2021-common';

type APPEntityCreateInfo = {
    [key in keyof PDKAbstractDataTypes.APPEntity as Exclude<key,'appuid'>]: PDKAbstractDataTypes.APPEntity[key]
}

export type {APPEntityCreateInfo};

interface APPEntityFactory{
    getAPPSystemSetting() : PDKAbstractDataTypes.APPSystemSetting;

    createAPPEntity(createInfo : APPEntityCreateInfo) : PDKAbstractDataTypes.APPEntity;
    
    verifyAPPEntityCredential(clientID : PDKAbstractDataTypes.APPClientID, currentGrantType : PDKAbstractDataTypes.OAuthAuthorizationMethod, clientSecret?: PDKAbstractDataTypes.APPClientSecret) : boolean;

    getAPPEntity(appuid : PDKAbstractDataTypes.APPUID) : PDKAbstractDataTypes.APPEntity | undefined;
    getAPPEntityByClientID(clientID : PDKAbstractDataTypes.APPClientID) : PDKAbstractDataTypes.APPEntity | undefined;
    updateAPPEntity(appuid : PDKAbstractDataTypes.APPUID, appEntity : PDKAbstractDataTypes.APPEntity, oldAPPEntity?: PDKAbstractDataTypes.APPEntity) : void;
    deleteAPPEntity(appuid : PDKAbstractDataTypes.APPUID) : void;

    getAPPEntityCount(
        appuid?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: PDKAbstractDataTypes.UserEntityUID,
        createTimeGMTMin?: number,
        createTimeGMTMax?: number,
        lastModifiedTimeGMTMin?: number,
        lastModifiedTimeGMTMax?: number,
        avatarSalt?: string,
        appGroupId?: string
    ): number;
    searchAPPEntity(
        appuid?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: PDKAbstractDataTypes.UserEntityUID,
        createTimeGMTMin?: number,
        createTimeGMTMax?: number,
        lastModifiedTimeGMTMin?: number,
        lastModifiedTimeGMTMax?: number,
        avatarSalt?: string,
        appGroupId?: string,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.APPEntity>;
    clearAPPEntity(
        appuid?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: PDKAbstractDataTypes.UserEntityUID,
        createTimeGMTMin?: number,
        createTimeGMTMax?: number,
        lastModifiedTimeGMTMin?: number,
        lastModifiedTimeGMTMax?: number,
        avatarSalt?: string,
        appGroupId?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {APPEntityFactory};