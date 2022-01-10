/* tslint:disable */
/* eslint-disable */
/**
 * benzapp API
 * benzapp API documentation
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { AdminUserDTO } from '../models';
import { KeyAndPasswordVM } from '../models';
import { ManagedUserVM } from '../models';
import { PasswordChangeDTO } from '../models';
/**
 * AccountResourceApi - axios parameter creator
 * @export
 */
export const AccountResourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary activateAccount
         * @param {string} key key
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateAccountUsingGET: async (key: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'key' is not null or undefined
            if (key === null || key === undefined) {
                throw new RequiredError('key','Required parameter key was null or undefined when calling activateAccountUsingGET.');
            }
            const localVarPath = `/api/activate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary changePassword
         * @param {PasswordChangeDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changePasswordUsingPOST: async (body?: PasswordChangeDTO, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/account/change-password`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary finishPasswordReset
         * @param {KeyAndPasswordVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        finishPasswordResetUsingPOST: async (body?: KeyAndPasswordVM, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/account/reset-password/finish`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary getAccount
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccountUsingGET: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/account`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary isAuthenticated
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        isAuthenticatedUsingGET: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/authenticate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary registerAccount
         * @param {ManagedUserVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerAccountUsingPOST: async (body?: ManagedUserVM, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary requestPasswordReset
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestPasswordResetUsingPOST: async (body?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/account/reset-password/init`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary saveAccount
         * @param {AdminUserDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveAccountUsingPOST: async (body?: AdminUserDTO, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/account`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication benzappAuth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AccountResourceApi - functional programming interface
 * @export
 */
export const AccountResourceApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary activateAccount
         * @param {string} key key
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async activateAccountUsingGET(key: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).activateAccountUsingGET(key, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary changePassword
         * @param {PasswordChangeDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changePasswordUsingPOST(body?: PasswordChangeDTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).changePasswordUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary finishPasswordReset
         * @param {KeyAndPasswordVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async finishPasswordResetUsingPOST(body?: KeyAndPasswordVM, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).finishPasswordResetUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary getAccount
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAccountUsingGET(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AdminUserDTO>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).getAccountUsingGET(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary isAuthenticated
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async isAuthenticatedUsingGET(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).isAuthenticatedUsingGET(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary registerAccount
         * @param {ManagedUserVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerAccountUsingPOST(body?: ManagedUserVM, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).registerAccountUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary requestPasswordReset
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async requestPasswordResetUsingPOST(body?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).requestPasswordResetUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary saveAccount
         * @param {AdminUserDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saveAccountUsingPOST(body?: AdminUserDTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await AccountResourceApiAxiosParamCreator(configuration).saveAccountUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AccountResourceApi - factory interface
 * @export
 */
export const AccountResourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary activateAccount
         * @param {string} key key
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateAccountUsingGET(key: string, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).activateAccountUsingGET(key, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary changePassword
         * @param {PasswordChangeDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changePasswordUsingPOST(body?: PasswordChangeDTO, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).changePasswordUsingPOST(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary finishPasswordReset
         * @param {KeyAndPasswordVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        finishPasswordResetUsingPOST(body?: KeyAndPasswordVM, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).finishPasswordResetUsingPOST(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary getAccount
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccountUsingGET(options?: any): AxiosPromise<AdminUserDTO> {
            return AccountResourceApiFp(configuration).getAccountUsingGET(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary isAuthenticated
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        isAuthenticatedUsingGET(options?: any): AxiosPromise<string> {
            return AccountResourceApiFp(configuration).isAuthenticatedUsingGET(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary registerAccount
         * @param {ManagedUserVM} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerAccountUsingPOST(body?: ManagedUserVM, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).registerAccountUsingPOST(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary requestPasswordReset
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestPasswordResetUsingPOST(body?: string, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).requestPasswordResetUsingPOST(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary saveAccount
         * @param {AdminUserDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveAccountUsingPOST(body?: AdminUserDTO, options?: any): AxiosPromise<void> {
            return AccountResourceApiFp(configuration).saveAccountUsingPOST(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AccountResourceApi - object-oriented interface
 * @export
 * @class AccountResourceApi
 * @extends {BaseAPI}
 */
export class AccountResourceApi extends BaseAPI {
    /**
     * 
     * @summary activateAccount
     * @param {string} key key
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public activateAccountUsingGET(key: string, options?: any) {
        return AccountResourceApiFp(this.configuration).activateAccountUsingGET(key, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary changePassword
     * @param {PasswordChangeDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public changePasswordUsingPOST(body?: PasswordChangeDTO, options?: any) {
        return AccountResourceApiFp(this.configuration).changePasswordUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary finishPasswordReset
     * @param {KeyAndPasswordVM} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public finishPasswordResetUsingPOST(body?: KeyAndPasswordVM, options?: any) {
        return AccountResourceApiFp(this.configuration).finishPasswordResetUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary getAccount
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public getAccountUsingGET(options?: any) {
        return AccountResourceApiFp(this.configuration).getAccountUsingGET(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary isAuthenticated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public isAuthenticatedUsingGET(options?: any) {
        return AccountResourceApiFp(this.configuration).isAuthenticatedUsingGET(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary registerAccount
     * @param {ManagedUserVM} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public registerAccountUsingPOST(body?: ManagedUserVM, options?: any) {
        return AccountResourceApiFp(this.configuration).registerAccountUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary requestPasswordReset
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public requestPasswordResetUsingPOST(body?: string, options?: any) {
        return AccountResourceApiFp(this.configuration).requestPasswordResetUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary saveAccount
     * @param {AdminUserDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountResourceApi
     */
    public saveAccountUsingPOST(body?: AdminUserDTO, options?: any) {
        return AccountResourceApiFp(this.configuration).saveAccountUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
}