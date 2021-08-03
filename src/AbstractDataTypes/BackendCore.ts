import { VerificationCodeEntityFactory } from "../AbstractFactoryTypes/Communication/VerificationCode/VerificationCodeEntityFactory";
import { MaskIDEntityFactory } from "../AbstractFactoryTypes/MaskID/MaskIDEntityFactory";
import { OAuthTokenFactory } from "../AbstractFactoryTypes/OAuth/Token/OAuthTokenFactory";
import { APPEntityFactory } from "../AbstractFactoryTypes/RegisteredAPP/APPEntityFactory";
import { APPGroupEntityFactory } from "../AbstractFactoryTypes/RegisteredAPPGroup/APPGroupEntityFactory";
import { UserEntityFactory } from "../AbstractFactoryTypes/User/UserEntityFactory";
import { UserTokenFactory } from "../AbstractFactoryTypes/User/UserTokenFactory";
import { UserGroupFactory } from "../AbstractFactoryTypes/UserGroup/UserGroupFactory";
import { CaptchaFactory } from '../AbstractFactoryTypes/Captcha/CaptchaFactory';
import { AuthorizationCodeEntityFactory } from "../AbstractFactoryTypes/OAuth/AuthCode/AuthorizationCodeEntityFactory";
import { BackendSystemSetting } from "./SystemSetting/BackendSystemSetting";
import { StorageRecordFactory } from "../AbstractFactoryTypes/EXT-Storage/StorageRecordFactory";
import { TicketRecordFactory } from "../AbstractFactoryTypes/EXT-Ticket/TicketRecordFactory";

class BackendCore<CaptchaInfo, CaptchaVerifyInfo>{
    constructor(
        public systemSettings: BackendSystemSetting,
        public veriCodeEntityFactory: VerificationCodeEntityFactory,
        public maskIDEntityFactory: MaskIDEntityFactory,
        public oAuthAuthCodeEntityFactory: AuthorizationCodeEntityFactory,
        public oAuthTokenFactory: OAuthTokenFactory,
        public appEntityFactory: APPEntityFactory,
        public appGroupEntityFactory: APPGroupEntityFactory,
        public userTokenFactory: UserTokenFactory,
        public userEntityFactory: UserEntityFactory,
        public userGroupFactory: UserGroupFactory,
        public captchaFactory: CaptchaFactory<CaptchaInfo,CaptchaVerifyInfo>,
        public StorageRecordFactory?: StorageRecordFactory,
        public TicketRecordFactory?: TicketRecordFactory
    ){
        
    }
    
}

export {BackendCore};