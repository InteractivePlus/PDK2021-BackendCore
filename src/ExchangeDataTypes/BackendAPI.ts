import { PDKCredentialNotMatchError, PDKException, PDKExceptionCode, PDKInnerArgumentError, PDKRequestParamFormatError, PDKUnknownInnerError } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException';
import { PDKAPI, PDKAPIHTTPMethods, PDKExceptionCodeToHTTPCodeTable } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI';
import { PDKPossibleServerReturnErrTypes, PDKServerReturn } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKServerReturn';
import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { OAuthScope } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/OAuthScope';
import { OAuthAccessToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken';
import { APPClientID, APPClientSecret } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { APPPermission } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPPermission';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { UserPermission } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserPermission';
import { UserAccessToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserToken';
import { BackendCore } from '../AbstractDataTypes/BackendCore';

interface BackendAPI<ParamType extends {} | {
    user_access_token: UserAccessToken;
    uid: UserEntityUID;
} | {
    oauth_access_token: OAuthAccessToken;
    client_id: APPClientID;
    client_secret?: APPClientSecret;
}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKAPI<ParamType, ReturnDataType, PossibleErrorTypes>{
    
    /**
     * this is the API Function
     * @param params params to be passed into the function
     * @param backendCore core library received
     * @param remoteIPAddress ipAddress of the request initiator
     * @throws {PossibleErrorTypes} error types
     */
    apiFunction(params : ParamType, backendCore : BackendCore<any,any,any>, remoteIPAddress : string) : Promise<ReturnDataType>,
    
    additionalParamCheck?: (params: any) => {succeed: boolean, errorParams: (keyof ParamType)[]}
}

export type {BackendAPI};

interface BackendServerReturnType<ParamType extends {},ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKServerReturn<ParamType, ReturnDataType,PossibleErrorTypes>{
    httpCode: number
}

export type {BackendServerReturnType};

async function processAPIRequest<ParamType extends {}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes>(
    backendAPI: BackendAPI<ParamType, ReturnDataType, PossibleErrorTypes>,
    urlParams: any,
    getParams: any,
    bodyParams: any,
    backendCore: BackendCore<any,any,any>,
    remoteIPAddr: any
) : Promise<BackendServerReturnType<ParamType, ReturnDataType, PossibleErrorTypes>>{
    try{
        //Merge URLParams, GetParams, BodyParams into one paramType
        let paramField = PDKAPIHTTPMethods[backendAPI.interactMethod].paramInRequestURL ? getParams : bodyParams;
        let realParams = Object.assign({},urlParams,paramField);
        //check paramType matches joitype and additionalParamCheck
        
        let apiParseParamResult = backendAPI.parseParams(realParams,backendCore.systemSettings);
        if(!apiParseParamResult.succeed || apiParseParamResult.parsedParam === undefined){
            throw new PDKRequestParamFormatError(apiParseParamResult.errorParams === undefined ? [] : apiParseParamResult.errorParams);
        }
        let parsedRequestParams : any = apiParseParamResult.parsedParam;
        if(backendAPI.additionalParamCheck !== undefined){
            let additionalCheckRst = backendAPI.additionalParamCheck(parsedRequestParams);
            if(!additionalCheckRst.succeed){
                throw new PDKRequestParamFormatError<keyof ParamType>(
                    additionalCheckRst.errorParams,
                    'Request Param Error'
                );
            }
        }

        {
            //now checking permission / token params
            let relatedUserPermission: UserPermission | undefined = undefined;
            let relatedUID : UserEntityUID | undefined = undefined;
            let relatedUserAccessToken : UserAccessToken | undefined = undefined;

            let relatedMaskID : MaskUID | undefined = undefined;
            let relatedClientID: APPClientID | undefined = undefined;
            let relatedAPPPermission : APPPermission | undefined = undefined;
            let relatedOAuthAccessToken : OAuthAccessToken | undefined = undefined;

            if(backendAPI.authenticationInfo.requireUserToken){
                if(!('user_access_token' in realParams) || typeof(realParams.user_access_token) !== 'string'){
                    throw new PDKRequestParamFormatError(['user_access_token']);
                }else if(!('uid' in realParams) || (typeof(realParams.uid) !== 'number' && typeof(realParams.uid) !== 'string')){
                    throw new PDKRequestParamFormatError(['uid']);
                }
                if(!(await backendCore.userTokenFactory.verifyUserAccessToken(realParams.user_access_token,realParams.uid))){
                    throw new PDKCredentialNotMatchError(['user_access_token'],'User Token Credentials Not Match');
                }
                relatedUID = realParams.uid;
                relatedUserAccessToken = realParams.user_access_token;
            }
            if(backendAPI.authenticationInfo.requireOAuthToken){
                if(!('oauth_access_token' in realParams) || typeof(realParams.oauth_access_token) !== 'string'){
                    throw new PDKRequestParamFormatError(['oauth_access_token']);
                }else if(!('client_id' in realParams) || typeof(realParams.client_id) !== 'string'){
                    throw new PDKRequestParamFormatError(['client_id']);
                }else if(!('mask_uid' in realParams) || (typeof(realParams.mask_uid) !== 'string' || typeof(realParams.mask_uid) !== 'number')){
                    throw new PDKRequestParamFormatError(['mask_uid']);
                }
                let requiredScopes : OAuthScope[] | undefined = backendAPI.oAuthPermissionInfo.requiredScopes;
                //May throw permissionDeniedError<'scopes'> here
                //And may also throw ExpiredOrUsedError<'oauth_access_token'> here
                if(!(await backendCore.oAuthTokenFactory.verifyOAuthAccessToken(realParams.oauth_access_token,realParams.mask_uid,realParams.client_id,requiredScopes))){
                    throw new PDKCredentialNotMatchError(['oauth_access_token']);
                }
                relatedMaskID = realParams.mask_uid;
                relatedClientID = realParams.client_id;
                relatedOAuthAccessToken = realParams.oauth_access_token;
            }
            if(backendAPI.captchaInfo.requiresCaptcha){
                if(!('captcha_info' in realParams)){
                    throw new PDKRequestParamFormatError(['captcha_info']);
                }
                let parsedCaptchaInfo = backendCore.captchaFactory.parseCaptchaVerifyInfo(realParams.captcha_info);
                if(parsedCaptchaInfo === undefined){
                    throw new PDKRequestParamFormatError(['captcha_info']);
                }
                let verifyCaptchaClientID : APPClientID | null | undefined = undefined;
                if(backendAPI.captchaInfo.requiresCaptchaToMatchPDK){
                    verifyCaptchaClientID = null;
                }else if(backendAPI.captchaInfo.requiresCaptchaToMatchClientID){
                    if(relatedClientID === undefined){
                        throw new PDKInnerArgumentError(['oauth_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyCaptchaClientID = relatedClientID;
                }
                let verifyMaskID : MaskUID | undefined = undefined;
                if(backendAPI.captchaInfo.requiresCaptchaToMatchMaskID){
                    if(relatedMaskID === undefined){
                        throw new PDKInnerArgumentError(['oauth_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyMaskID = relatedMaskID;
                }
                let verifyUID : UserEntityUID | undefined;
                if(backendAPI.captchaInfo.requiresCaptchaToMatchUID){
                    if(relatedUID === undefined){
                        throw new PDKInnerArgumentError(['user_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyUID = relatedUID;
                }
                let captchaVerifyInfo = await backendCore.captchaFactory.verifyAndUseCaptcha(parsedCaptchaInfo,remoteIPAddr,verifyCaptchaClientID,verifyUID,verifyMaskID);
                if(!captchaVerifyInfo){
                    throw new PDKCredentialNotMatchError(['captcha_info']);
                }
            }
            if(backendAPI.vericodeInfo.requiresVeriCode){
                if(!('verification_code' in realParams) || typeof(realParams.verification_code) !== 'string'){
                    throw new PDKRequestParamFormatError(['verification_code']);
                }
                let verificationCode : string = realParams.verification_code;
                let isVeriCodeShortCode : boolean = true;
                if('is_vericode_short_code' in realParams){
                    isVeriCodeShortCode = realParams.is_vericode_short_code === true;
                }

                if((isVeriCodeShortCode && !backendAPI.vericodeInfo.enablesShortCode) || (!isVeriCodeShortCode && !backendAPI.vericodeInfo.enablesLongCode)){
                    throw new PDKCredentialNotMatchError(['verification_code']);
                }

                let verifyVeriCodeClientID : APPClientID | null | undefined = undefined;
                if(backendAPI.vericodeInfo.requiresVeriCodeToMatchPDK){
                    verifyVeriCodeClientID = null;
                }else if(backendAPI.vericodeInfo.requiresVeriCodeToMatchClientID){
                    if(relatedClientID === undefined){
                        throw new PDKInnerArgumentError(['oauth_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyVeriCodeClientID = relatedClientID;
                }
                let verifyMaskID : MaskUID | undefined = undefined;
                if(backendAPI.vericodeInfo.requiresVeriCodeToMatchMaskID){
                    if(relatedMaskID === undefined){
                        throw new PDKInnerArgumentError(['oauth_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyMaskID = relatedMaskID;
                }
                let verifyUID : UserEntityUID | undefined;
                if(backendAPI.vericodeInfo.requiresVeriCodeToMatchUID){
                    if(relatedUID === undefined){
                        throw new PDKInnerArgumentError(['user_access_token'],'Looks like the administrator put some wrong configurations!');
                    }
                    verifyUID = relatedUID;
                }
                let vericodeVerifyInfo = await backendCore.veriCodeEntityFactory.verifyAndUseVerificationCode(verificationCode,isVeriCodeShortCode,verifyUID,undefined,verifyVeriCodeClientID,verifyMaskID,backendAPI.vericodeInfo.requiresVeriCodeScope);

                if(!vericodeVerifyInfo){
                    throw new PDKCredentialNotMatchError(['verification_code']);
                }
            }
            if(backendAPI.appPermissionInfo.checkPermissionFunc !== undefined){
                if(relatedOAuthAccessToken === undefined){
                    relatedAPPPermission = undefined;
                }else if(backendCore.oAuthTokenFactory.retrieveOAuthAccessTokenAPPPermissionInfo !== undefined){
                    relatedAPPPermission = await backendCore.oAuthTokenFactory.retrieveOAuthAccessTokenAPPPermissionInfo(relatedOAuthAccessToken);
                }else{
                    //Retrieve Combined APP Permission From BackendCore;

                }
                
                await backendAPI.appPermissionInfo.checkPermissionFunc(relatedAPPPermission);
            }
            if(backendAPI.userPermissionInfo.checkPermissionFunc !== undefined){
                if(relatedUserAccessToken === undefined){
                    relatedUserPermission = undefined;
                }else if(backendCore.userTokenFactory.retrieveUserAccessTokenPermissionInfo !== undefined){
                    relatedUserPermission = await backendCore.userTokenFactory.retrieveUserAccessTokenPermissionInfo(relatedUserAccessToken);
                }else{
                    //Retrieve Combined User Permission From BackendCore
                }

                await backendAPI.userPermissionInfo.checkPermissionFunc(relatedUserPermission);
            }
        }

        //Finish Checking Params, Let's do this!
        let returnData = await backendAPI.apiFunction(parsedRequestParams,backendCore,remoteIPAddr);
        
        let returnHTTPCode = 0;
        if(backendAPI.successfulHTTPCode !== undefined){
            returnHTTPCode = backendAPI.successfulHTTPCode;
        }else{
            let relatedHTTPMethodDescp = PDKAPIHTTPMethods[backendAPI.interactMethod];
            if(typeof(relatedHTTPMethodDescp.successfulHTTPCode) === 'number'){
                returnHTTPCode = relatedHTTPMethodDescp.successfulHTTPCode;
            }else{
                returnHTTPCode = relatedHTTPMethodDescp.successfulHTTPCode[0];
            }
        }

        return {
            errorCode: PDKExceptionCode.NO_ERROR,
            data: returnData,
            httpCode: returnHTTPCode
        };

    }catch(error){
        if(error instanceof PDKException){
            return {
                errorCode: error.errCode,
                errorOutput: error as PossibleErrorTypes,
                httpCode: PDKExceptionCodeToHTTPCodeTable[error.errCode]
            }
        }else{
            return {
                errorCode: PDKExceptionCode.UNKNOWN_INNER_ERROR,
                errorOutput: new PDKUnknownInnerError(error.toString()) as PossibleErrorTypes,
                httpCode: PDKExceptionCodeToHTTPCodeTable[PDKExceptionCode.UNKNOWN_INNER_ERROR]
            }
        }
    }
}

export {processAPIRequest};