import {TicketRecordEntity, TicketRecordEntityID, TicketRecordSingleResponse} from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/EXT-Ticket/TicketRecordEntity';
import { MaskUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/MaskID/MaskIDEntity';
import { OAuthAccessToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/OAuth/Token/OAuthToken';
import { APPClientID, APPUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/RegisteredAPP/APPEntityFormat';
import { UserEntityUID } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity';
import { UserAccessToken } from '@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserToken';
import { SearchResult } from '@interactiveplus/pdk2021-common/dist/InternalDataTypes/SearchResult';
import { BackendAPPSystemSetting } from '../../AbstractDataTypes/SystemSetting/BackendAPPSystemSetting';
import { BaseFactory } from '../BaseFactory';
import { OAuthTokenFactory } from '../OAuth/Token/OAuthTokenFactory';
import { APPEntityFactory } from '../RegisteredAPP/APPEntityFactory';
import { UserEntityFactory } from '../User/UserEntityFactory';
import { UserTokenFactory } from '../User/UserTokenFactory';

type TicketRecordCreateInfo = {
    [key in keyof TicketRecordEntity as Exclude<key,'ticketId'>]: TicketRecordEntity[key]
}

export type {TicketRecordCreateInfo};

interface TicketRecordFactoryInstallInfo{
    userEntityFactory: UserEntityFactory,
    appEntityFactory: APPEntityFactory,
    oAuthTokenFactory: OAuthTokenFactory,
    userTokenFactory: UserTokenFactory
}

export type {TicketRecordFactoryInstallInfo};

interface TicketRecordFactory extends BaseFactory<TicketRecordFactoryInstallInfo>{
    getTicketIDMaxLen() : number;
    getTicketIDExactLen?() : number;

    getAPPSystemSetting() : BackendAPPSystemSetting;

    createTicketRecord(createInfo: TicketRecordCreateInfo) : Promise<TicketRecordEntity>;
    
    getTicketRecord(ticketRecordId: TicketRecordEntityID) : Promise<TicketRecordEntity | undefined>;
    updateTicketRecordBasicInfo(ticketId: TicketRecordEntityID, newEntity: TicketRecordEntity, oldEntity?: TicketRecordEntity) : Promise<void>;
    updateTicketRecordResponseList(ticketId: TicketRecordEntityID, newResponse: TicketRecordSingleResponse[], oldResponse?: TicketRecordSingleResponse[]) : Promise<void>;
    deleteTicketRecord(ticketId: TicketRecordEntityID) : Promise<void>;
    
    checkTicketRecordExists(ticketId: TicketRecordEntityID) : Promise<boolean>;

    getTicketRecordCount(
        ticketId?: TicketRecordEntityID,
        title?: string,
        content?: string,
        originatorAltName?: string,
        relatedMaskUID?: MaskUID | null,
        relatedUID?: UserEntityUID,
        relatedClientID?: APPClientID | null,
        relatedAPPUID?: APPUID | null,
        relatedOAuthToken?: OAuthAccessToken,
        relatedUserToken?: UserAccessToken
    ) : Promise<number>;
    searchTicketRecord(
        ticketId?: TicketRecordEntityID,
        title?: string,
        content?: string,
        originatorAltName?: string,
        relatedMaskUID?: MaskUID | null,
        relatedUID?: UserEntityUID,
        relatedClientID?: APPClientID | null,
        relatedAPPUID?: APPUID | null,
        relatedOAuthToken?: OAuthAccessToken,
        relatedUserToken?: UserAccessToken,
        numLimit?: number,
        startPosition?: number
    ) : Promise<SearchResult<TicketRecordEntity>>;
    clearTicketRecord(
        ticketId?: TicketRecordEntityID,
        title?: string,
        content?: string,
        originatorAltName?: string,
        relatedMaskUID?: MaskUID | null,
        relatedUID?: UserEntityUID,
        relatedClientID?: APPClientID | null,
        relatedAPPUID?: APPUID | null,
        relatedOAuthToken?: OAuthAccessToken,
        relatedUserToken?: UserAccessToken,
        numLimit?: number,
        startPosition?: number
    ) : Promise<void>;
}

export type {TicketRecordFactory};