import { PDKException, PDKExceptionCode, PDKRequestParamFormatError, PDKUnknownInnerError } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException';
import { PDKAPI, PDKAPIHTTPMethods, PDKExceptionCodeToHTTPCodeTable } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI';
import { PDKPossibleServerReturnErrTypes, PDKServerReturn } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKServerReturn';
import { getJoiValidationErrorFirstPaths } from '@interactiveplus/pdk2021-common/dist/Utilities/JoiCheckFunctions';
import { BackendCore } from '../AbstractDataTypes/BackendCore';

interface BackendAPI<ParamType extends {}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKAPI<ParamType, ReturnDataType, PossibleErrorTypes>{
    
    /**
     * this is the API Function
     * @param params params to be passed into the function
     * @param backendCore core library received
     * @throws {PossibleErrorTypes} error types
     */
    apiFunction<BackendCoreType extends BackendCore<any,any,any,any,any>>(params : ParamType, backendCore : BackendCoreType) : ReturnDataType,
    
    
    additionalParamCheck?: (params: any) => {succeed: boolean, errorParams: (keyof ParamType)[]}
}

export type {BackendAPI};

interface BackendServerReturnType<ParamType extends {},ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes> extends PDKServerReturn<ParamType, ReturnDataType,PossibleErrorTypes>{
    httpCode: number
}

export type {BackendServerReturnType};

function processAPIRequest<ParamType extends {}, ReturnDataType extends {}, PossibleErrorTypes extends PDKPossibleServerReturnErrTypes, BackendCoreType extends BackendCore<any,any,any,any,any>>(
    backendAPI: BackendAPI<ParamType, ReturnDataType, PossibleErrorTypes>,
    urlParams: any,
    getParams: any,
    bodyParams: any,
    backendCore: BackendCoreType,
) : BackendServerReturnType<ParamType, ReturnDataType, PossibleErrorTypes>{
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

        //Finish Checking Params, Let's do this!
        let returnData = backendAPI.apiFunction(parsedRequestParams,backendCore);
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