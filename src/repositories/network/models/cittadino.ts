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
 * @interface Cittadino
 */
export interface Cittadino {
    /**
     * 
     * @type {string}
     * @memberof Cittadino
     */
    codiceFiscale?: any;
    /**
     * 
     * @type {string}
     * @memberof Cittadino
     */
    cognome?: any;
    /**
     * 
     * @type {Array&lt;Delega&gt;}
     * @memberof Cittadino
     */
    delegas?: any;
    /**
     * 
     * @type {Fascia}
     * @memberof Cittadino
     */
    fascia?: any;
    /**
     * 
     * @type {number}
     * @memberof Cittadino
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof Cittadino
     */
    nome?: any;
    /**
     * 
     * @type {string}
     * @memberof Cittadino
     */
    owner?: any;
    /**
     * 
     * @type {Array&lt;Tessera&gt;}
     * @memberof Cittadino
     */
    tesseras?: any;
}
