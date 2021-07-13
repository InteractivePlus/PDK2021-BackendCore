import {PDKAbstractDataTypes, PDKInternalDataTypes} from '@interactiveplus/pdk2021-common';

type AuthorizationCodeCreateEntity = {
    [key in keyof PDKAbstractDataTypes.AuthorizationCodeEntity as Exclude<key,'authCode'>]: PDKAbstractDataTypes.AuthorizationCodeEntity[key]
}

export type {AuthorizationCodeCreateEntity};

interface AuthorizationCodeEntityFactory<VerifyAuthCodeInfo>{
    getOAuthSystemSetting() : PDKAbstractDataTypes.OAuthSystemSetting;
    
    createAuthCode(authCodeInfo : AuthorizationCodeCreateEntity) : PDKAbstractDataTypes.AuthorizationCodeEntity;
    
    verifyAuthCode(verifyInfo : VerifyAuthCodeInfo) : boolean;
    verifyAndUseAuthCode(verifyInfo : VerifyAuthCodeInfo) : boolean;

    getAuthorizationCode?(authCode : string) : PDKAbstractDataTypes.AuthorizationCodeEntity | undefined;
    updateAuthorizationCode?(authCode : string, authCodeEntity : PDKAbstractDataTypes.AuthorizationCodeEntity, oldAuthCodeEntity?: PDKAbstractDataTypes.AuthorizationCodeEntity) : void;
    deleteAuthorizationCode?(authCode : string) : void;

    checkAuthorizationCodeExist?(authCode : string) : boolean;
    getAuthorizationCodeCount?(
        authCode?: string,
        authMethod?: PDKAbstractDataTypes.OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        maskUID?: PDKAbstractDataTypes.MaskUID,
        challengeType?: PDKAbstractDataTypes.AuthCodeChallengeType,
        used?: boolean,
        scopes?: PDKAbstractDataTypes.OAuthScope[],
        codeChallenge?: string
    ) : number;
    searchAuthorizationCode?(
        authCode?: string,
        authMethod?: PDKAbstractDataTypes.OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        maskUID?: PDKAbstractDataTypes.MaskUID,
        challengeType?: PDKAbstractDataTypes.AuthCodeChallengeType,
        used?: boolean,
        scopes?: PDKAbstractDataTypes.OAuthScope[],
        codeChallenge?: string,
        numLimit?: number,
        startPosition?: number
    ) : PDKInternalDataTypes.SearchResult<PDKAbstractDataTypes.AuthorizationCodeEntity>;
    clearAuthorizationCode?(
        authCode?: string,
        authMethod?: PDKAbstractDataTypes.OAuthAuthorizationMethod,
        issueTimeGMTMin?: number,
        issueTimeGMTMax?: number,
        expireTimeGMTMin?: number,
        expireTimeGMTMax?: number,
        grantUserRemoteAddr?: string,
        appUID?: PDKAbstractDataTypes.APPUID,
        clientID?: PDKAbstractDataTypes.APPClientID,
        maskUID?: PDKAbstractDataTypes.MaskUID,
        challengeType?: PDKAbstractDataTypes.AuthCodeChallengeType,
        used?: boolean,
        scopes?: PDKAbstractDataTypes.OAuthScope[],
        codeChallenge?: string,
        numLimit?: number,
        startPosition?: number
    ) : void;
}

export type {AuthorizationCodeEntityFactory};