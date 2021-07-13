import { AuthorizationCodeEntityFormatSetting } from "../../../pdk2021-common/dist/AbstractDataTypes/ALL";
import { VerificationCodeEntityFactory } from "../AbstractFactoryTypes/Communication/VerificationCode/VerificationCodeEntityFactory";
import { MaskIDEntityFactory } from "../AbstractFactoryTypes/MaskID/MaskIDEntityFactory";
import { OAuthTokenFactory } from "../AbstractFactoryTypes/OAuth/Token/OAuthTokenFactory";
import { APPEntityFactory } from "../AbstractFactoryTypes/RegisteredAPP/APPEntityFactory";
import { APPGroupEntityFactory } from "../AbstractFactoryTypes/RegisteredAPPGroup/APPGroupEntityFactory";
import { UserEntityFactory } from "../AbstractFactoryTypes/User/UserEntityFactory";
import { UserTokenFactory } from "../AbstractFactoryTypes/User/UserTokenFactory";
import { UserGroupFactory } from "../AbstractFactoryTypes/UserGroup/UserGroupFactory";
import { BackendSystemSetting } from "./SystemSetting/BackendSystemSetting";

class BackendCore<VeriCodeVerifyInfo, OAuthAccessTokenVerifyInfo, OAuthRefreshTokenVerifyInfo, UserAccessTokenVerifyInfo, UserRefreshTokenVerifyInfo>{
    constructor(
        public systemSettings: BackendSystemSetting,
        public veriCodeEntityFactory: VerificationCodeEntityFactory<VeriCodeVerifyInfo>,
        public maskIDEntityFactory: MaskIDEntityFactory,
        public oAuthAuthCodeEntityFactory: AuthorizationCodeEntityFormatSetting,
        public oAuthTokenFactory: OAuthTokenFactory<OAuthAccessTokenVerifyInfo, OAuthRefreshTokenVerifyInfo>,
        public appEntityFactory: APPEntityFactory,
        public appGroupEntityFactory: APPGroupEntityFactory,
        public userTokenFactory: UserTokenFactory<UserAccessTokenVerifyInfo,UserRefreshTokenVerifyInfo>,
        public userEntityFactory: UserEntityFactory,
        public userGroupFactory: UserGroupFactory
    ){
        
    }
}

export {BackendCore};