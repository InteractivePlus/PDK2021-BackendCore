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

interface CaptchaFactory<CaptchaInfo, CaptchaVerifyInfo, CaptchaCreateInfo> extends BaseFactory<CaptchaFactoryInstallInfo>{
    getCaptchaSystemSetting() : BackendCaptchaSystemSetting;

    generateCaptchaWithAPP(createInfo: CaptchaCreateInfo, client_id: APPClientID, ipAddress : string, mask_uid?: MaskUID) : Promise<CaptchaInfo>;
    generateCaptchaWithPDK(createInfo: CaptchaCreateInfo, ipAddress : string, user_uid?: UserEntityUID) : Promise<CaptchaInfo>;
    
    /**
     * 
     * @param verifyInfo 
     * @param ipAddress 
     * @param clientID 
     * @param user_uid 
     * @param mask_uid 
     * @throws {PDKItemExpiredOrUsedError<'captcha_info'>}
     */
    verifyCaptcha(verifyInfo : CaptchaVerifyInfo, ipAddress : string, clientID?: APPClientID | null, user_uid?: UserEntityUID, mask_uid?: MaskUID) : Promise<boolean>;
    
    /**
     * 
     * @param verifyInfo 
     * @param ipAddress 
     * @param clientID 
     * @param user_uid 
     * @param mask_uid 
     * @throws {PDKItemExpiredOrUsedError<'captcha_info'>}
     */
    verifyAndUseCaptcha(verifyInfo : CaptchaVerifyInfo, ipAddress : string, clientID?: APPClientID | null, user_uid?: UserEntityUID, mask_uid?: MaskUID) : Promise<boolean>;
    
    parseCaptchaCreateInfo(toParse : any) : Promise<CaptchaCreateInfo | undefined>;
    parseCaptchaVerifyInfo(toParse : any) : Promise<CaptchaVerifyInfo | undefined>;
    
    clearOutdatedAndUsedCaptchas() : Promise<void>;
}

export type {CaptchaFactory};