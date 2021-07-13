import {PDKAbstractDataTypes} from '@interactiveplus/pdk2021-common';

type AvatarCreateEntity = {
    [key in keyof PDKAbstractDataTypes.AvatarEntity as Exclude<key,'salt'>]: PDKAbstractDataTypes.AvatarEntity[key]
}

export type {AvatarCreateEntity};

interface AvatarEntityFactory{
    getAvatarBySalt(salt: string) : PDKAbstractDataTypes.AvatarEntity | undefined,
    uploadNewAvatar(createInfo: AvatarCreateEntity) : PDKAbstractDataTypes.AvatarEntity;
    checkAvatarExists(salt: string) : boolean,
    updateAvatar(salt : string, avatarEntity : PDKAbstractDataTypes.AvatarEntity, oldAvatarEntity?: PDKAbstractDataTypes.AvatarEntity) : void;
}

export type {AvatarEntityFactory};