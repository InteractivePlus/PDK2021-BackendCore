import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { AuthCodeChallengeType } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/AuthCode/AuthCodeFormat';
import { AuthCode, AuthorizationCodeEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/AuthCode/AuthorizationCodeEntity';
import { OAuthAuthorizationMethod } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthAuthorizationMethod';
import { OAuthScope } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthScope';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendOAuthSystemSetting } from '../../../AbstractDataTypes/SystemSetting/BackendOAuthSystemSetting';
import { BaseFactory } from '../../BaseFactory';
import { MaskIDEntityFactory } from '../../MaskID/MaskIDEntityFactory';
import { APPEntityFactory } from '../../RegisteredAPP/APPEntityFactory';

type AuthorizationCodeCreateEntity = {
    [key in keyof AuthorizationCodeEntity as Exclude<key,'authCode'>]: AuthorizationCodeEntity[key]
}

export type {AuthorizationCodeCreateEntity};

interface AuthorizationCodeEntityFactoryInstallInfo{
    appEntityFactory: APPEntityFactory,
    maskIDEntityFactory: MaskIDEntityFactory
}

export type {AuthorizationCodeEntityFactoryInstallInfo};

interface AuthorizationCodeEntityFactory extends BaseFactory<AuthorizationCodeEntityFactoryInstallInfo>{
    getOAuthCodeMaxLength() : number;
    getOAuthCodeExactLength?() : number;

    getOAuthSystemSetting() : BackendOAuthSystemSetting;
    
    createAuthCode(authCodeInfo : AuthorizationCodeCreateEntity) : Promise<AuthorizationCodeEntity>;
    
    verifyAuthCode(authCode : AuthCode, authMethod?: OAuthAuthorizationMethod, clientID?: APPClientID, maskUID?: MaskUID, codeVerifier?: string) : Promise<boolean>;
    verifyAndUseAuthCode(authCode : AuthCode, authMethod?: OAuthAuthorizationMethod, clientID?: APPClientID, maskUID?: MaskUID, codeVerifier?: string) : Promise<boolean>;

    getAuthorizationCode?(authCode : string) : Promise<AuthorizationCodeEntity | undefined>;
    updateAuthorizationCode?(authCode : string, authCodeEntity : AuthorizationCodeEntity, oldAuthCodeEntity?: AuthorizationCodeEntity) : Promise<void>;
    deleteAuthorizationCode?(authCode : string) : Promise<void>;

    checkAuthorizationCodeExist?(authCode : string) : Promise<boolean>;
    getAuthorizationCodeCount?(
        authCode?: string,
        authMethod?: OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: APPUID,
        clientID?: APPClientID,
        maskUID?: MaskUID,
        challengeType?: AuthCodeChallengeType,
        used?: boolean,
        scopes?: OAuthScope[],
        codeChallenge?: string
    ) : Promise<number>;
    searchAuthorizationCode?(
        authCode?: string,
        authMethod?: OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: APPUID,
        clientID?: APPClientID,
        maskUID?: MaskUID,
        challengeType?: AuthCodeChallengeType,
        used?: boolean,
        scopes?: OAuthScope[],
        codeChallenge?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<AuthorizationCodeEntity>>;
    clearAuthorizationCode?(
        authCode?: string,
        authMethod?: OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: APPUID,
        clientID?: APPClientID,
        maskUID?: MaskUID,
        challengeType?: AuthCodeChallengeType,
        used?: boolean,
        scopes?: OAuthScope[],
        codeChallenge?: string,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {AuthorizationCodeEntityFactory};