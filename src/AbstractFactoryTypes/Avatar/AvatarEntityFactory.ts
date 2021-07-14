import {AvatarEntity} from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Avatar/AvatarEntity';

type AvatarCreateEntity = {
    [key in keyof AvatarEntity as Exclude<key,'salt'>]: AvatarEntity[key]
}

export type {AvatarCreateEntity};

interface AvatarEntityFactory{
    getAvatarBySalt(salt: string) : AvatarEntity | undefined,
    uploadNewAvatar(createInfo: AvatarCreateEntity) : AvatarEntity;
    checkAvatarExists(salt: string) : boolean,
    updateAvatar(salt : string, avatarEntity : AvatarEntity, oldAvatarEntity?: AvatarEntity) : void;
}

export type {AvatarEntityFactory};