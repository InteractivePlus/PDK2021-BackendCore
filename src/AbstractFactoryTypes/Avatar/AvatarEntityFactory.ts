import {AvatarEntity} from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Avatar/AvatarEntity';
import { BackendAvatarSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAvatarSystemSetting';
import { BaseFactory } from '../BaseFactory';
import { UserEntityFactory } from '../User/UserEntityFactory';

type AvatarCreateEntity = {
    [key in keyof AvatarEntity as Exclude<key,'salt'>]: AvatarEntity[key]
}

export type {AvatarCreateEntity};

interface AvatarEntityFactoryInstallInfo{
    userEntityFactory: UserEntityFactory;
}

export type {AvatarEntityFactoryInstallInfo};

interface AvatarEntityFactory extends BaseFactory<AvatarEntityFactoryInstallInfo>{
    getAvatarSaltLength() : number;

    getAvatarSystemSetting() : BackendAvatarSystemSetting;

    getAvatarBySalt(salt: string) : Promise<AvatarEntity | undefined>,
    uploadNewAvatar(createInfo: AvatarCreateEntity) : Promise<AvatarEntity>;
    checkAvatarExists(salt: string) : Promise<boolean>,
    updateAvatar(salt : string, avatarEntity : AvatarEntity, oldAvatarEntity?: AvatarEntity) : Promise<void>;
}

export type {AvatarEntityFactory};