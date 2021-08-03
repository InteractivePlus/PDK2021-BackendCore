import { MaskUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity";
import { APPClientID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat";
import { UserEntityUID } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { BackendCaptchaSystemSetting } from "../../AbstractDataTypes/SystemSetting/BackendCaptchaSystemSetting";
import { BaseFactory } from "../BaseFactory";
import { MaskIDEntityFactory } from "../MaskID/MaskIDEntityFactory";
import { APPEntityFactory } from "../RegisteredAPP/APPEntityFactory";
import { UserEntityFactory } from "../User/UserEntityFactory";

interface CaptchaFactoryInstallInfo{
    appEntityFactory: APPEntityFactory,
    userEntityFactory: UserEntityFactory,
    maskIDEntityFactory: MaskIDEntityFactory
}

export type {CaptchaFactoryInstallInfo};

interface CaptchaFactory<CaptchaInfo, CaptchaVerifyInfo> extends BaseFactory<CaptchaFactoryInstallInfo>{
    getCaptchaSystemSetting() : BackendCaptchaSystemSetting;
    
    generateCaptchaWithAPP(client_id: APPClientID, ipAddress : string, mask_uid?: MaskUID) : Promise<CaptchaInfo>;
    generateCaptchaWithPDK(ipAddress : string, user_uid?: UserEntityUID) : Promise<CaptchaInfo>;
    verifyCaptcha(verifyInfo : CaptchaVerifyInfo, ipAddress : string, clientID?: APPClientID | null, user_uid?: UserEntityUID, mask_uid?: MaskUID) : Promise<boolean>;
    verifyAndUseCaptcha(verifyInfo : CaptchaVerifyInfo, ipAddress : string, clientID?: APPClientID | null, user_uid?: UserEntityUID, mask_uid?: MaskUID) : Promise<boolean>;
    
    parseCaptchaVerifyInfo(toParse : any) : Promise<CaptchaVerifyInfo | undefined>;
    
    clearOutdatedAndUsedCaptchas() : Promise<void>;
}

export type {CaptchaFactory};