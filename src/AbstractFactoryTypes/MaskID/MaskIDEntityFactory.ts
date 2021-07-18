import { MaskIDEntity, MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { SearchResult } from "@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult";
import { BackendOAuthSystemSetting } from "../../AbstractDataTypes/SystemSetting/BackendOAuthSystemSetting";
import { BaseFactory } from "../BaseFactory";

type MaskIDCreateEntity = {
    [key in keyof MaskIDEntity as Exclude<key,'maskUID'>]: MaskIDEntity[key]
}

export type {MaskIDCreateEntity};

interface MaskIDEntityFactory extends BaseFactory<void>{
    getMaskIDMaxLength() : number;
    getMaskExactLength?(): number;

    getOAuthSystemSetting() : BackendOAuthSystemSetting;

    createMaskIDEntity(createEntity : MaskIDCreateEntity) : Promise<MaskIDEntity>;
    getMaskIDEntity(maskUID: MaskUID) : Promise<MaskIDEntity | undefined>;
    updateMaskIDEntity(maskUID: MaskUID, maskEntity : MaskIDEntity, oldMaskEntity?: MaskIDEntity) : Promise<void>;
    deleteMaskIDEntity(maskUID: MaskUID) : Promise<void>;
    
    getMaskIDEntityCount(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID,
        createTimeMin?: number,
        createTimeMax?: number
    ) : Promise<number>;

    searchMaskIDEntity(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID, 
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<MaskIDEntity>>;

    clearMaskIDEntity(
        maskUID?: MaskUID, 
        displayName?: string,
        userUID?: UserEntityUID, 
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {MaskIDEntityFactory};