import {PDKAbstractDataTypes, PDKInternalDataTypes} from 'pdk2021-common';

type MaskIDCreateEntity = {
    [key in keyof PDKAbstractDataTypes.MaskIDEntity as Exclude<key,'maskUID'>]: PDKAbstractDataTypes.MaskIDEntity[key]
}

export type {MaskIDCreateEntity};

interface MaskIDEntityFactory{
    createMaskIDEntity(createEntity : MaskIDCreateEntity) : PDKAbstractDataTypes.MaskIDEntity;
    getMaskIDEntity(maskUID: PDKAbstractDataTypes.MaskUID) : PDKAbstractDataTypes.MaskIDEntity | undefined;
    updateMaskIDEntity(maskUID: PDKAbstractDataTypes.MaskUID, maskEntity : PDKAbstractDataTypes.MaskIDEntity, oldMaskEntity?: PDKAbstractDataTypes.MaskIDEntity) : void;
    deleteMaskIDEntity(maskUID: PDKAbstractDataTypes.MaskUID) : void;
    
    getMaskIDEntityCount(
        maskUID?: PDKAbstractDataTypes.MaskUID, 
        displayName?: string,
        userUID?: PDKAbstractDataTypes.UserEntityUID, 
        appUID?: PDKAbstractDataTypes.APPUID,
        createTimeMin?: number,
        createTimeMax?: number
    ) : number;

    searchMaskIDEntity(
        maskUID?: PDKAbstractDataTypes.MaskUID, 
        displayName?: string,
        userUID?: PDKAbstractDataTypes.UserEntityUID, 
        appUID?: PDKAbstractDataTypes.APPUID,
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.MaskIDEntity>;

    clearMaskIDEntity(
        maskUID?: PDKAbstractDataTypes.MaskUID, 
        displayName?: string,
        userUID?: PDKAbstractDataTypes.UserEntityUID, 
        appUID?: PDKAbstractDataTypes.APPUID,
        createTimeMin?: number,
        createTimeMax?: number,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {MaskIDEntityFactory};