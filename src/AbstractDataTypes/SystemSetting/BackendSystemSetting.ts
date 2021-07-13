import { BackendAPPSystemSetting } from './BackendAPPSystemSetting';
import { BackendCommunicationSystemSetting } from './BackendCommunicationSystemSetting';
import { BackendOAuthSystemSetting } from './BackendOAuthSystemSetting';
import { BackendUserSystemSetting } from './BackendUserSystemSetting';

interface BackendSystemSetting{
    appSystemSetting: BackendAPPSystemSetting;
    oAuthSystemSetting: BackendOAuthSystemSetting;
    userSystemSetting: BackendUserSystemSetting;
    communicationSystemSetting: BackendCommunicationSystemSetting;
    
}
export type {BackendSystemSetting};