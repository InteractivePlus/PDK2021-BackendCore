import { StorageRecordEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/EXT-Storage/StorageRecordEntity';
import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';
import { BaseFactory } from '../BaseFactory';
import { APPEntityFactory } from '../RegisteredAPP/APPEntityFactory';
import { UserEntityFactory } from '../User/UserEntityFactory';

type StorageRecordFactoryCreateInfo<DataType> = StorageRecordEntity<DataType>;

export type {StorageRecordFactoryCreateInfo};

interface StorageRecordFactoryInstallInfo{
    userEntityFactory: UserEntityFactory,
    appEntityFactory: APPEntityFactory
}

export type {StorageRecordFactoryInstallInfo};

interface StorageRecordFactory extends BaseFactory<StorageRecordFactoryInstallInfo>{
    getAbsoluteDataMaxLengthInBytes?() : number;

    getAPPSystemSetting() : BackendAPPSystemSetting;

    getStorageRecordEntity(uid: UserEntityUID | null, maskUID: MaskUID | null | undefined, clientID: APPClientID | null, appuid: APPUID | null) : Promise<StorageRecordEntity<any> | undefined>;
    
    createStorageRecordEntity(createInfo : StorageRecordFactoryCreateInfo<any>) : Promise<void>;
    updateStorageRecordEntity(storageRecord : StorageRecordEntity<any>) : Promise<void>;

    putStorageRecordDataByClientID(uid: UserEntityUID | null, maskUID: MaskUID | null | undefined, clientID: APPClientID | null, appuid: APPUID | null, data?: any) : Promise<void>;

    getAPPStorageRecordNumByClientID(clientID: APPClientID | null) : Promise<number>;
    getAPPStorageRecordNumByAPPUID(appuid: APPUID | null) : Promise<number>;


    getStorageRecordNum(
        uid?: UserEntityUID | null, 
        maskUID?: MaskUID | null, 
        clientID?: APPClientID | null, 
        appuid?: APPUID | null
    ) : Promise<number>;
    searchStorageRecord(
        uid?: UserEntityUID | null, 
        maskUID?: MaskUID | null, 
        clientID?: APPClientID | null, 
        appuid?: APPUID | null,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<StorageRecordEntity<any>>>;

    clearStorageRecord(
        uid?: UserEntityUID | null, 
        maskUID?: MaskUID | null, 
        clientID?: APPClientID | null,
        appuid?: APPUID | null,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {StorageRecordFactory};