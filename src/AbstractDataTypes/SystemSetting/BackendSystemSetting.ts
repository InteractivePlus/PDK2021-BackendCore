import { BackendAPPSystemSetting } from './BackendAPPSystemSetting';
import { BackendAvatarSystemSetting } from './BackendAvatarSystemSetting';
import { BackendCaptchaSystemSetting } from './BackendCaptchaSystemSetting';
import { BackendCommunicationSystemSetting } from './BackendCommunicationSystemSetting';
import { BackendOAuthSystemSetting } from './BackendOAuthSystemSetting';
import { BackendUserSystemSetting } from './BackendUserSystemSetting';

interface BackendSystemSetting{
    avatarSystemSetting: BackendAvatarSystemSetting;
    appSystemSetting: BackendAPPSystemSetting;
    oAuthSystemSetting: BackendOAuthSystemSetting;
    userSystemSetting: BackendUserSystemSetting;
    communicationSystemSetting: BackendCommunicationSystemSetting;
    captchaSystemSetting: BackendCaptchaSystemSetting;
}
export type {BackendSystemSetting};