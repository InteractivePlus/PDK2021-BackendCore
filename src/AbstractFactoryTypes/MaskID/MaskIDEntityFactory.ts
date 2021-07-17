import { MaskIDEntity, MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { APPUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { SearchResult } from "@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult";

type MaskIDCreateEntity = {
    [key in keyof MaskIDEntity as Exclude<key,'maskUID'>]: MaskIDEntity[key]
}

export type {MaskIDCreateEntity};

interface MaskIDEntityFactory{
    createMaskIDEntity(createEntity : MaskIDCreateEntity) : Promise<MaskIDEntity>;
    getMaskIDEntity(maskUID: MaskUID) : Promise<MaskIDEntity | undefined>;
    updateMaskIDEntity(maskUID: MaskUID, maskEntity : MaskIDEntity, oldMaskEntity?: MaskIDEntity) : Promise<void>;
    deleteMaskIDEntity(maskUID: MaskUID) : Promise<void>;
    
    getMaskIDEntityCount(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID, 
        appUID?: APPUID,
        createTimeMin?: number,
        createTimeMax?: number
    ) : Promise<number>;

    searchMaskIDEntity(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID, 
        appUID?: APPUID,
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<MaskIDEntity>>;

    clearMaskIDEntity(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID, 
        appUID?: APPUID,
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {MaskIDEntityFactory};