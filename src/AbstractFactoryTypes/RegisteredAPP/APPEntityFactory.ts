import { OAuthAuthorizationMethod } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthAuthorizationMethod';
import { APPEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntity';
import { APPClientID, APPClientSecret, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';

type APPEntityCreateInfo = {
    [key in keyof APPEntity as Exclude<key,'appuid'>]: APPEntity[key]
}

export type {APPEntityCreateInfo};

interface APPEntityFactory{
    getAPPSystemSetting() : BackendAPPSystemSetting;

    createAPPEntity(createInfo : APPEntityCreateInfo) : APPEntity;
    
    verifyAPPEntityCredential(clientID : APPClientID, currentGrantType : OAuthAuthorizationMethod, clientSecret?: APPClientSecret) : boolean;

    getAPPEntity(appuid : APPUID) : APPEntity | undefined;
    getAPPEntityByClientID(clientID : APPClientID) : APPEntity | undefined;
    updateAPPEntity(appuid : APPUID, appEntity : APPEntity, oldAPPEntity?: APPEntity) : void;
    deleteAPPEntity(appuid : APPUID) : void;

    getAPPEntityCount(
        appuid?: APPUID,
        clientID?: APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: UserEntityUID,
        createTimeGMTMin?: number,
        createTimeGMTMax?: number,
        lastModifiedTimeGMTMin?: number,
        lastModifiedTimeGMTMax?: number,
        avatarSalt?: string,
        appGroupId?: string
    ): number;
    searchAPPEntity(
        appuid?: APPUID,
        clientID?: APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: UserEntityUID,
        createTimeGMTMin?: number,
        createTimeGMTMax?: number,
        lastModifiedTimeGMTMin?: number,
        lastModifiedTimeGMTMax?: number,
        avatarSalt?: string,
        appGroupId?: string,
        numLimit?: number,
        startPosition?: number
    ) : SearchResult<APPEntity>;
    clearAPPEntity(
        appuid?: APPUID,
        clientID?: APPClientID,
        displayName?: string,
        description?: string,
        relatedUID?: UserEntityUID,
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