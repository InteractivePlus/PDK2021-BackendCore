import { PDKAbstractDataTypes } from "pdk2021-common";
import { CommunicationSenderInterface } from "../../AbstractFactoryTypes/Communication/CommunicationSender/CommunicationInterface";
import axios, {AxiosResponse} from 'axios';
import {locales} from 'i18n-codes-js';

/**
 * 短信通短信发送接口
 * www.dxton.com / www.106jiekou.com
 */

type DXTonAcceptedEncoding = 'gbk' | 'utf8';

export type {DXTonAcceptedEncoding};

class DXTonSMSVericodeSender implements CommunicationSenderInterface<PDKAbstractDataTypes.PhoneNumber>{
    encoding : DXTonAcceptedEncoding;
    account : string;
    apiSecret : string;
    allowIntlPhoneNum : boolean; //If this is set to false, only sms message to country code +86 is allowed.
    constructor(account : string, apiSecret : string, encoding : DXTonAcceptedEncoding = 'utf8', allowIntlPhoneNum : boolean = false){
        this.encoding = encoding;
        this.account = account;
        this.apiSecret = apiSecret;
        this.allowIntlPhoneNum = allowIntlPhoneNum;
    }
    canSendTo(address : PDKAbstractDataTypes.PhoneNumber) : boolean{
        if(this.allowIntlPhoneNum){
            return true;
        }else{
            return address.countryCallingCode === '86';
        }
    }
    sendContent = undefined;
    async sendMsg(address : PDKAbstractDataTypes.PhoneNumber, content : string) : Promise<void>{
        let targetURL : string = '';
        let targetPhone : string = '';
        if(address.countryCallingCode === '86'){
            targetURL = 'http://sms.106jiekou.com/' + this.encoding + '/sms.aspx';
            targetPhone = address.nationalNumber.toString();
        }else{
            targetURL = 'http://sms.106jiekou.com/' + this.encoding + '/worldapi.aspx';
            targetPhone = address.format('E.164');
            if(targetPhone.indexOf('+') === 0){
                targetPhone = targetPhone.substr(1,undefined);
            }
        }
        let postData = 'account=' + this.account + '&password=' + this.apiSecret + '&mobile=' + targetPhone + '&content=' + encodeURI(content);
        let postResponse : AxiosResponse<any> | undefined = undefined;
        try{
            postResponse = await axios.post(targetURL, postData);
        }catch(err){
            if(err instanceof Error){
                throw new PDKAbstractDataTypes.PDKSenderServiceError('DXTONAPIFailed: ' + err.message);
            }
        }
        if(postResponse === undefined || postResponse.data === undefined || postResponse.data === null || postResponse.data === ''){
            throw new PDKAbstractDataTypes.PDKSenderServiceError('DXTonAPIFailed: empty response');
        }
        /**
         * 状态码		说明
         * 100			发送成功
         * 101			验证失败
         * 102			手机号码格式不正确
         * 103			会员级别不够
         * 104			内容未审核
         * 105			内容过多
         * 106			账户余额不足
         * 107			Ip受限
         * 108			手机号码发送太频繁，请换号或隔天再发
         * 109			帐号被锁定
         * 110			手机号发送频率持续过高，黑名单屏蔽数日
         * 120			系统升级
         */
        if(postResponse.data === 100 || postResponse.data === '100'){
            return;
        }else{
            throw new PDKAbstractDataTypes.PDKSenderServiceError('DXTONAPIFailed: Status ' + postResponse.data);
        }
    }
    async sendVeriCode(address : PDKAbstractDataTypes.PhoneNumber, veriCode : PDKAbstractDataTypes.VerificationCodeEntity<any>, relatedUser?: PDKAbstractDataTypes.UserEntity, relatedAPP?: PDKAbstractDataTypes.APPEntity, relatedMaskID?: PDKAbstractDataTypes.MaskIDEntity, locale?: locales.LocaleCode) : Promise<void>{
        if(!this.canSendTo(address)){
            throw new PDKAbstractDataTypes.PDKSenderServiceError('Cannot send to this address!');
        }
        await this.sendMsg(address,this.getContentFor(
            veriCode,
            relatedUser,
            relatedAPP,
            relatedMaskID,
            locale
        ));
    }
    getContentFor(veriCode : PDKAbstractDataTypes.VerificationCodeEntity<any>,relatedUser?: PDKAbstractDataTypes.UserEntity, relatedAPP?: PDKAbstractDataTypes.APPEntity, relatedMaskID?: PDKAbstractDataTypes.MaskIDEntity, locale?: locales.LocaleCode) : string{
        return "您的验证码是：" + veriCode.veriCodeID + "。请不要把验证码泄露给其他人。如非本人操作，可不用理会！";
    }
}

export {DXTonSMSVericodeSender};