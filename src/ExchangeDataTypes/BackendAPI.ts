import { PDKCredentialNotMatchError, PDKException, PDKExceptionCode, PDKInnerArgumentError, PDKRequestParamFormatError, PDKUnknownInnerError } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException';
import { PDKAPI, PDKAPIHTTPMethods, PDKExceptionCodeToHTTPCodeTable } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI';
import { PDKPossibleServerReturnErrTypes, PDKServerReturn } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKServerReturn';
import { getJoiValidationErrorFirstPaths } from '@interactiveplus/pdk2021-common/dist/Utilities/JoiCheckFunctions';
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
    apiFunction(params : ParamType, backendCore : BackendCore<any,any>, remoteIPAddress : string) : Promise<ReturnDataType>,
    
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
    backendCore: BackendCore<any,any>,
    remoteIPAddr: any
) : Promise<BackendServerReturnType<ParamType, ReturnDataType, PossibleErrorTypes>>{
    try{
        //Merge URLParams, GetParams, BodyParams into one paramType
        let paramField = PDKAPIHTTPMethods[backendAPI.interactMethod].paramInRequestURL ? getParams : bodyParams;
        let realParams = Object.assign({},urlParams,paramField);
        //check paramType matches joitype and additionalParamCheck
        let validationResult = backendAPI.paramJoiType.validate(realParams);
        if(validationResult.error !== undefined){
            throw new PDKRequestParamFormatError<keyof ParamType>(
                getJoiValidationErrorFirstPaths(validationResult.error) as (keyof ParamType)[],
                'Request Param Error'
            );
        }
        let parsedRequestParams = validationResult.value;
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
                if(!('user_access_token' in parsedRequestParams) || typeof(parsedRequestParams.user_access_token) !== 'string'){
                    throw new PDKRequestParamFormatError(['user_access_token']);
                }else if(!('uid' in parsedRequestParams) || (typeof(parsedRequestParams.uid) !== 'number' && typeof(parsedRequestParams.uid) !== 'string')){
                    throw new PDKRequestParamFormatError(['uid']);
                }
                if(!(await backendCore.userTokenFactory.verifyUserAccessToken(parsedRequestParams.user_access_token,parsedRequestParams.uid))){
                    throw new PDKCredentialNotMatchError(['user_access_token'],'User Token Credentials Not Match');
                }
                relatedUID = parsedRequestParams.uid;
                relatedUserAccessToken = parsedRequestParams.user_access_token;
            }
            if(backendAPI.authenticationInfo.requireOAuthToken){
                if(!('oauth_access_token' in parsedRequestParams) || typeof(parsedRequestParams.oauth_access_token) !== 'string'){
                    throw new PDKRequestParamFormatError(['oauth_access_token']);
                }else if(!('client_id' in parsedRequestParams) || typeof(parsedRequestParams.client_id) !== 'string'){
                    throw new PDKRequestParamFormatError(['client_id']);
                }else if(!('mask_uid' in parsedRequestParams) || (typeof(parsedRequestParams.mask_uid) !== 'string' || typeof(parsedRequestParams.mask_uid) !== 'number')){
                    throw new PDKRequestParamFormatError(['mask_uid']);
                }
                let requiredScopes : OAuthScope[] | undefined = backendAPI.oAuthPermissionInfo.requiredScopes;
                //May throw permissionDeniedError<'scopes'> here
                //And may also throw ExpiredOrUsedError<'oauth_access_token'> here
                if(!(await backendCore.oAuthTokenFactory.verifyOAuthAccessToken(parsedRequestParams.oauth_access_token,parsedRequestParams.mask_uid,parsedRequestParams.client_id,requiredScopes))){
                    throw new PDKCredentialNotMatchError(['oauth_access_token']);
                }
                relatedMaskID = parsedRequestParams.mask_uid;
                relatedClientID = parsedRequestParams.client_id;
                relatedOAuthAccessToken = parsedRequestParams.oauth_access_token;
            }
            if(backendAPI.captchaInfo.requiresCaptcha){
                if(!('captcha_info' in parsedRequestParams)){
                    throw new PDKRequestParamFormatError(['captcha_info']);
                }
                let parsedCaptchaInfo = backendCore.captchaFactory.parseCaptchaVerifyInfo(parsedRequestParams.captcha_info);
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