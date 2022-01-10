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
/**
 * 
 * @export
 * @interface Gestore
 */
export interface Gestore {
    /**
     * 
     * @type {number}
     * @memberof Gestore
     */
    benzinaPrezzoAlLitro?: any;
    /**
     * 
     * @type {string}
     * @memberof Gestore
     */
    comune?: any;
    /**
     * 
     * @type {number}
     * @memberof Gestore
     */
    gasolioPrezzoAlLitro?: any;
    /**
     * 
     * @type {number}
     * @memberof Gestore
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof Gestore
     */
    indirizzo?: any;
    /**
     * 
     * @type {number}
     * @memberof Gestore
     */
    latitudine?: any;
    /**
     * 
     * @type {number}
     * @memberof Gestore
     */
    longitudine?: any;
    /**
     * 
     * @type {Marchio}
     * @memberof Gestore
     */
    marchio?: any;
    /**
     * 
     * @type {string}
     * @memberof Gestore
     */
    owner?: any;
    /**
     * 
     * @type {string}
     * @memberof Gestore
     */
    provincia?: any;
    /**
     * 
     * @type {Array&lt;Rifornimento&gt;}
     * @memberof Gestore
     */
    rifornimentos?: any;
    /**
     * 
     * @type {string}
     * @memberof Gestore
     */
    tipo?: GestoreTipoEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum GestoreTipoEnum {
    AUTOSTRADALE = 'AUTOSTRADALE',
    NAVALE = 'NAVALE',
    STRADALE = 'STRADALE'
}
