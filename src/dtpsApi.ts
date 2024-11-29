/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CardcontrollerApplyCardTopupInputDTO {
  amount: number;
  userCardId: string;
}

export interface CardcontrollerBalanceResponse {
  balance?: string;
}

export interface CardcontrollerIssueCardInputDTO {
  cardId: string;
  carddeliveryaddress: string;
  /** @maxLength 25 */
  embossname: string;
  userId: string;
}

export interface CardcontrollerTransaction {
  acc_number?: string;
  auth_stat?: string;
  card_number?: string;
  cr_amount?: number;
  description?: string;
  dr_amount?: number;
  end_bal?: number;
  executed_at?: string;
  srNo?: number;
  trn_code?: string;
  trn_ref_number?: string;
  user_id?: string;
}

export interface CardcontrollerTxnResponse {
  data?: CardcontrollerTransaction[];
  success?: string;
}

export interface ModelsCardPurchaseApplication {
  cardDeliveryAddress?: string;
  createdAt?: string;
  embossName?: string;
  handledById?: string;
  id?: string;
  pcid?: string;
  /**
   * Card     *PartnerCard                  `gorm:"foreignKey:PCID;references:ID;column:PartnerCard" json:"card"`
   * UserCard *UserCard                     `gorm:"foreignKey:ApplicationID;references:ID;column:UserCards" json:"userCard"`
   */
  remarks?: string;
  /** User                *User                         `gorm:"foreignKey:UserID;references:ID;column:User" json:"user"` */
  status?: ModelsCardPurchaseApplicationStatus;
  ucid?: string;
  updatedAt?: string;
  userId?: string;
}

export enum ModelsCardPurchaseApplicationStatus {
  UAIS_SUCCESS = "SUCCESS",
  UAIS_FAILED = "FAILED",
  CPAS_NOT_INITIALIZED = "NOT_INITIALIZED",
  CPAS_PENDING = "PENDING",
  CPAS_SUCCESS = "SUCCESS",
  CPAS_FAILED = "FAILED",
  DOCUMENT_NOT_INITIALIZED = "NOT_INITIALIZED",
  DOCUMENT_SUCCESS = "SUCCESS",
  DOCUMENT_FAILED = "FAILED",
}

export interface ModelsCardTopupApplication {
  createdAt?: string;
  failedRemarks?: string;
  fee?: string;
  finalAmount?: string;
  id?: string;
  processedById?: string;
  requestedAmount?: string;
  status?: ModelsCardTopupStatus;
  updatedAt?: string;
  userCardId?: string;
}

export enum ModelsCardTopupStatus {
  CTS_NOT_INITIALIZED = "NOT_INITIALIZED",
  CTS_PENDING = "PENDING",
  CTS_SUCCESS = "SUCCESS",
  CTS_FAILED = "FAILED",
}

export interface ModelsPartner {
  createdAt?: string;
  createdByID?: string;
  email?: string;
  floatBalMinThreshold?: string;
  floatBalance?: string;
  id?: string;
  is2FAEnabled?: boolean;
  isEnabled?: boolean;
  name?: string;
  updatedAt?: string;
  webhookSettings?: ModelsPartnerWebhookSetting[];
}

export interface ModelsPartnerCard {
  cardId?: string;
  createdAt?: string;
  id?: string;
  isEnabled?: boolean;
  partnerId?: string;
  price?: string;
  topupFeePercent?: string;
  updatedAt?: string;
  whitelistedIps?: string;
}

export interface ModelsPartnerWebhookSetting {
  algoType?: string;
  createdAt?: string;
  id?: string;
  isEnabled?: boolean;
  isResendOnFailureEnabled?: boolean;
  partnerId?: string;
  secretKey?: string;
  targetUrl?: string;
  updatedAt?: string;
  webhookName?: string;
}

export interface ModelsUser {
  accountInfo?: ModelsUserAccountInfo;
  applications?: ModelsCardPurchaseApplication[];
  cards?: ModelsUserCard[];
  createdAt?: string;
  email?: string;
  fullName?: string;
  id?: string;
  isEnabled?: boolean;
  partner?: ModelsPartner;
  partnerId?: string;
  passportNumber?: string;
  updatedAt?: string;
}

export interface ModelsUserAccountInfo {
  createdAt?: string;
  documents?: ModelsUserDocument[];
  failedRemarks?: string;
  id?: string;
  metadata?: string;
  status?: ModelsUserAccountInfoStatus;
  updatedAt?: string;
  userId?: string;
}

export enum ModelsUserAccountInfoStatus {
  UAIS_NOT_INITIALIZED = "NOT_INITIALIZED",
}

export interface ModelsUserCard {
  accountNumber?: string;
  application?: ModelsCardPurchaseApplication;
  applicationId?: string;
  card?: ModelsPartnerCard;
  cardNumber?: string;
  createdAt?: string;
  embossName?: string;
  id?: string;
  isEnabled?: boolean;
  pcid?: string;
  updatedAt?: string;
  user?: ModelsUser;
  userId?: string;
}

export interface ModelsUserDocument {
  createdAt?: string;
  documentStatus?: string;
  documentType?: string;
  failedRemarks?: string;
  fileName?: string;
  id?: string;
  updatedAt?: string;
  userInfoId?: string;
}

export interface ResponsesOkResponse {
  message?: string;
}

export interface UsercontrollerCreateUserInputDTO {
  birth_country: string;
  district: string;
  dob: string;
  first_name: string;
  gender: string;
  isd_code: number;
  last_name: string;
  mail: string;
  occupation: string;
  passportnumber: string;
  place_of_birth: string;
  province: string;
  telephone: string;
  title: string;
  village: string;
}

export interface UsercontrollerDocumentInputDto {
  base64data: string;
  docName: string;
}

export interface UsercontrollerUploadUserDocsInputDTO {
  documents: UsercontrollerDocumentInputDto[];
  userId: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api/v1" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DTPS APIs
 * @version 1.0
 * @baseUrl /api/v1
 * @contact
 *
 * DTPS Apis.
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  card = {
    /**
     * @description Call this api after 1. /user/create  and 2. /user/documents/upload ( after uploading all required docs )
     *
     * @tags card application
     * @name ApplyCard
     * @summary Apply Card
     * @request POST:/card/application/apply
     * @secure
     */
    applyCard: (card: CardcontrollerIssueCardInputDTO, params: RequestParams = {}) =>
      this.http.request<ModelsCardPurchaseApplication, any>({
        path: `/card/application/apply`,
        method: "POST",
        body: card,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get All Card Applications. status 0=NOT_INITIALIZED 1=PENDING 2=SUCCESS 3=FAILED
     *
     * @tags card application
     * @name GetAllCardApplications
     * @summary Get All Card Applications
     * @request GET:/card/application/list
     * @secure
     */
    getAllCardApplications: (params: RequestParams = {}) =>
      this.http.request<ModelsCardPurchaseApplication[], any>({
        path: `/card/application/list`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Card Application. status 0=NOT_INITIALIZED 1=PENDING 2=SUCCESS 3=FAILED
     *
     * @tags card application
     * @name GetCardApplication
     * @summary Get Card Application
     * @request GET:/card/application/{cardapplicationId}
     * @secure
     */
    getCardApplication: (cardapplicationId: string, params: RequestParams = {}) =>
      this.http.request<ModelsCardPurchaseApplication, any>({
        path: `/card/application/${cardapplicationId}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Card Balance
     *
     * @tags card
     * @name GetCardBalance
     * @summary Get Card Balance
     * @request GET:/card/balance/{cardnumber}
     * @secure
     */
    getCardBalance: (cardnumber: string, params: RequestParams = {}) =>
      this.http.request<CardcontrollerBalanceResponse, any>({
        path: `/card/balance/${cardnumber}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Available Cards
     *
     * @tags card
     * @name GetAvailableCards
     * @summary Get Available Cards
     * @request GET:/card/list
     * @secure
     */
    getAvailableCards: (params: RequestParams = {}) =>
      this.http.request<ModelsPartnerCard[], any>({
        path: `/card/list`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Apply Card Topup
     *
     * @tags card topup
     * @name ApplyCardTopup
     * @summary Apply Card Topup
     * @request POST:/card/topup/apply
     * @secure
     */
    applyCardTopup: (card: CardcontrollerApplyCardTopupInputDTO, params: RequestParams = {}) =>
      this.http.request<ModelsCardTopupApplication, any>({
        path: `/card/topup/apply`,
        method: "POST",
        body: card,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get All Card Topup Applications
     *
     * @tags card topup
     * @name GetAllCardTopupApplications
     * @summary Get All Card Topup Applications
     * @request GET:/card/topup/list
     * @secure
     */
    getAllCardTopupApplications: (params: RequestParams = {}) =>
      this.http.request<ModelsCardTopupApplication[], any>({
        path: `/card/topup/list`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get  Card Txn History
     *
     * @tags card
     * @name GetCardTxnHistory
     * @summary Get  Card Txn History
     * @request GET:/card/txnhistory/{cardnumber}
     * @secure
     */
    getCardTxnHistory: (cardnumber: string, params: RequestParams = {}) =>
      this.http.request<CardcontrollerTxnResponse, any>({
        path: `/card/txnhistory/${cardnumber}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Add a new User
     *
     * @tags user
     * @name CreateUser
     * @summary Create User
     * @request POST:/user/create
     * @secure
     */
    createUser: (user: UsercontrollerCreateUserInputDTO, params: RequestParams = {}) =>
      this.http.request<ModelsUser, any>({
        path: `/user/create`,
        method: "POST",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description possible docName values PASSPORT, SIGNATURE, SELFIE, SELFIE_WITH_PASSPORT
     *
     * @tags user
     * @name UploadUserDocuments
     * @summary Upload User Documents
     * @request POST:/user/document/upload
     * @secure
     */
    uploadUserDocuments: (user: UsercontrollerUploadUserDocsInputDTO, params: RequestParams = {}) =>
      this.http.request<ResponsesOkResponse, any>({
        path: `/user/document/upload`,
        method: "POST",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get All Users
     *
     * @tags user
     * @name GetAllUsers
     * @summary Get All Users
     * @request GET:/user/list
     * @secure
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.http.request<ModelsUser, any>({
        path: `/user/list`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get  Partner User
     *
     * @tags user
     * @name GetPartnerUser
     * @summary Get  Partner User
     * @request GET:/user/{userId}
     * @secure
     */
    getPartnerUser: (userId: string, params: RequestParams = {}) =>
      this.http.request<ModelsUser, any>({
        path: `/user/${userId}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
