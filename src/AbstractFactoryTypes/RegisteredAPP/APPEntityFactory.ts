import { OAuthAuthorizationMethod } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthAuthorizationMethod';
import { APPEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntity';
import { APPClientID, APPClientSecret, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';
import { AvatarEntityFactory } from '../Avatar/AvatarEntityFactory';
import { BaseFactory } from '../BaseFactory';
import { APPGroupEntityFactory } from '../RegisteredAPPGroup/APPGroupEntityFactory';
import { UserEntityFactory } from '../User/UserEntityFactory';

type APPEntityCreateInfo = {
    [key in keyof APPEntity as Exclude<key,'appuid'>]: APPEntity[key]
}

export type {APPEntityCreateInfo};

interface APPEntityFactoryInstallInfo{
    userEntityFactory: UserEntityFactory,
    avatarEntityFactory: AvatarEntityFactory,
    appGroupEntityFactory: APPGroupEntityFactory
}

export type {APPEntityFactoryInstallInfo};

interface APPEntityFactory extends BaseFactory<APPEntityFactoryInstallInfo>{
    getAPPUIDMaxLen() : number;
    getAPPUIDExactLen?(): number;
    isAPPUIDNumber() : boolean;
    getAPPClientIDMaxLen() : number;
    getAPPClientIDExactLen?() : number;

    getAPPSystemSetting() : BackendAPPSystemSetting;

    createAPPEntity(createInfo : APPEntityCreateInfo) : Promise<APPEntity>;
    
    verifyAPPEntityCredential(clientID : APPClientID, currentGrantType : OAuthAuthorizationMethod, clientSecret?: APPClientSecret) : Promise<boolean>;

    checkAPPUIDExist(appuid : APPUID) : Promise<boolean>;
    checkAPPClientIDExist(appClientID : APPClientID) : Promise<boolean>;
    getAPPEntity(appuid : APPUID) : Promise<APPEntity | undefined>;
    getAPPEntityByClientID(clientID : APPClientID) : Promise<APPEntity | undefined>;
    updateAPPEntity(appuid : APPUID, appEntity : APPEntity, oldAPPEntity?: APPEntity) : Promise<void>;
    deleteAPPEntity(appuid : APPUID) : Promise<void>;

    /**
     * Fetch APPUID / ClientID occupied by PDK
     * @returns {APPUID} occupied by this PDK system
    */
    getPDKReservedAPPUID() : APPUID;

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
    ): Promise<number>;
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
    ) : Promise<SearchResult<APPEntity>>;
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
    ) : Promise<void>;
}

export type {APPEntityFactory};