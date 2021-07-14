import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { AuthCodeChallengeType } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/AuthCode/AuthCodeFormat';
import { AuthorizationCodeEntity } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/AuthCode/AuthorizationCodeEntity';
import { OAuthAuthorizationMethod } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthAuthorizationMethod';
import { OAuthScope } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthScope';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendOAuthSystemSetting } from '../../../AbstractDataTypes/SystemSetting/BackendOAuthSystemSetting';

type AuthorizationCodeCreateEntity = {
    [key in keyof AuthorizationCodeEntity as Exclude<key,'authCode'>]: AuthorizationCodeEntity[key]
}

export type {AuthorizationCodeCreateEntity};

interface AuthorizationCodeEntityFactory<VerifyAuthCodeInfo>{
    getOAuthSystemSetting() : BackendOAuthSystemSetting;
    
    createAuthCode(authCodeInfo : AuthorizationCodeCreateEntity) : AuthorizationCodeEntity;
    
    verifyAuthCode(verifyInfo : VerifyAuthCodeInfo) : boolean;
    verifyAndUseAuthCode(verifyInfo : VerifyAuthCodeInfo) : boolean;

    getAuthorizationCode?(authCode : string) : AuthorizationCodeEntity | undefined;
    updateAuthorizationCode?(authCode : string, authCodeEntity : AuthorizationCodeEntity, oldAuthCodeEntity?: AuthorizationCodeEntity) : void;
    deleteAuthorizationCode?(authCode : string) : void;

    checkAuthorizationCodeExist?(authCode : string) : boolean;
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
    ) : number;
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
    ) : SearchResult<AuthorizationCodeEntity>;
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
    ) : void;
}

export type {AuthorizationCodeEntityFactory};