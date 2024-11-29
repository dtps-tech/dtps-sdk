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
export var ModelsCardPurchaseApplicationStatus;
(function (ModelsCardPurchaseApplicationStatus) {
    ModelsCardPurchaseApplicationStatus["UAIS_SUCCESS"] = "SUCCESS";
    ModelsCardPurchaseApplicationStatus["UAIS_FAILED"] = "FAILED";
    ModelsCardPurchaseApplicationStatus["CPAS_NOT_INITIALIZED"] = "NOT_INITIALIZED";
    ModelsCardPurchaseApplicationStatus["CPAS_PENDING"] = "PENDING";
    ModelsCardPurchaseApplicationStatus["CPAS_SUCCESS"] = "SUCCESS";
    ModelsCardPurchaseApplicationStatus["CPAS_FAILED"] = "FAILED";
    ModelsCardPurchaseApplicationStatus["DOCUMENT_NOT_INITIALIZED"] = "NOT_INITIALIZED";
    ModelsCardPurchaseApplicationStatus["DOCUMENT_SUCCESS"] = "SUCCESS";
    ModelsCardPurchaseApplicationStatus["DOCUMENT_FAILED"] = "FAILED";
})(ModelsCardPurchaseApplicationStatus || (ModelsCardPurchaseApplicationStatus = {}));
export var ModelsCardTopupStatus;
(function (ModelsCardTopupStatus) {
    ModelsCardTopupStatus["CTS_NOT_INITIALIZED"] = "NOT_INITIALIZED";
    ModelsCardTopupStatus["CTS_PENDING"] = "PENDING";
    ModelsCardTopupStatus["CTS_SUCCESS"] = "SUCCESS";
    ModelsCardTopupStatus["CTS_FAILED"] = "FAILED";
})(ModelsCardTopupStatus || (ModelsCardTopupStatus = {}));
export var ModelsUserAccountInfoStatus;
(function (ModelsUserAccountInfoStatus) {
    ModelsUserAccountInfoStatus["UAIS_NOT_INITIALIZED"] = "NOT_INITIALIZED";
})(ModelsUserAccountInfoStatus || (ModelsUserAccountInfoStatus = {}));
import axios from "axios";
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
    instance;
    securityData = null;
    securityWorker;
    secure;
    format;
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api/v1" });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    setSecurityData = (data) => {
        this.securityData = data;
    };
    mergeRequestParams(params1, params2) {
        const method = params1.method || (params2 && params2.method);
        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase()]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        }
        else {
            return `${formItem}`;
        }
    }
    createFormData(input) {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [property];
            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
    request = async ({ secure, path, type, query, format, body, ...params }) => {
        const secureParams = ((typeof secure === "boolean" ? secure : this.secure) &&
            this.securityWorker &&
            (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;
        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body);
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
export class Api {
    http;
    constructor(http) {
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
        applyCard: (card, params = {}) => this.http.request({
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
        getAllCardApplications: (params = {}) => this.http.request({
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
        getCardApplication: (cardapplicationId, params = {}) => this.http.request({
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
        getCardBalance: (cardnumber, params = {}) => this.http.request({
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
        getAvailableCards: (params = {}) => this.http.request({
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
        applyCardTopup: (card, params = {}) => this.http.request({
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
        getAllCardTopupApplications: (params = {}) => this.http.request({
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
        getCardTxnHistory: (cardnumber, params = {}) => this.http.request({
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
        createUser: (user, params = {}) => this.http.request({
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
        uploadUserDocuments: (user, params = {}) => this.http.request({
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
        getAllUsers: (params = {}) => this.http.request({
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
        getPartnerUser: (userId, params = {}) => this.http.request({
            path: `/user/${userId}`,
            method: "GET",
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        }),
    };
}
