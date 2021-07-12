/// <reference path="../../../@types/@alicloud__dm-2017-06-22/index.d.ts"/>

import {PDKAbstractDataTypes, PDKUtils} from 'pdk2021-common';
import { ContentSenderInterface } from '../../AbstractFactoryTypes/Communication/CommunicationSender/Content/ContentSenderInterface';


import dm from '@alicloud/dm-2017-06-22';
import alicloud__dm_2017_06_22 from '@alicloud/dm-2017-06-22';
import { CommunicationContent } from '../../AbstractFactoryTypes/Communication/CommunicationSender/Content/CommunicationContent';

const AliCloudDMEndPoints = {
    EastCN1: 'dm.aliyuncs.com',
    SouthEastAsia1_Singapore: 'dm.ap-southeast-1.aliyuncs.com',
    SouthEastAsia2_Sydney: 'dm.ap-southeast-2.aliyuncs.com'
}

type AliCloudDMEndPoint = 'EastCN1' | 'SouthEastAsia1_Singapore' | 'SouthEastAsia2_Sydney';

export {AliCloudDMEndPoints};
export type {AliCloudDMEndPoint};

class AliCloudDMEmailSender implements ContentSenderInterface<string>{
    dmObj : alicloud__dm_2017_06_22;
    accountNameAddr : string;
    fromAlias?: string;

    constructor(
        accessKeyID: string, 
        accessKeySecret : string,
        Endpoint : AliCloudDMEndPoint,
        accountNameAddr: string,
        fromAlias: string
    ){
        this.dmObj = new dm({
            endpoint: AliCloudDMEndPoints[Endpoint],
            accessKeyId: accessKeyID,
            accessKeySecret: accessKeySecret
        });
        this.accountNameAddr = accountNameAddr;
        this.fromAlias = fromAlias;
    }

    canSendTo(address : string){
        return new RegExp(PDKUtils.EmailRegexFormat,'g').test(address);
    }

    async sendContent(address : string, content: CommunicationContent) : Promise<void>{
        return this.dmObj.singleSendMail({
            AccountName:this.accountNameAddr,
            AddressType: 1,
            ReplyToAddress: false,
            ToAddress: address,
            ClickTrace: '1',
            FromAlias: this.fromAlias,
            HtmlBody: content.content,
            Subject: content.title === undefined ? '(No Subject)' : content.title
        },{}).catch((reason)=>{
            throw new PDKAbstractDataTypes.PDKSenderServiceError('Failed to send email: ' + JSON.stringify(reason));
        }).then((json : any) => {
            if('EnvId' in json && 'RequestId' in json){
                return;
            }else{
                throw new PDKAbstractDataTypes.PDKSenderServiceError('Failed to send email: ' + JSON.stringify(json));
            }
        });
    }
}

export {AliCloudDMEmailSender};