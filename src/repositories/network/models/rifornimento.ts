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
 * @interface Rifornimento
 */
export interface Rifornimento {
    /**
     * 
     * @type {Date}
     * @memberof Rifornimento
     */
    data: any;
    /**
     * 
     * @type {Gestore}
     * @memberof Rifornimento
     */
    gestore?: any;
    /**
     * 
     * @type {number}
     * @memberof Rifornimento
     */
    id?: any;
    /**
     * 
     * @type {number}
     * @memberof Rifornimento
     */
    litriErogati: any;
    /**
     * 
     * @type {number}
     * @memberof Rifornimento
     */
    prezzoAlLitro: any;
    /**
     * 
     * @type {number}
     * @memberof Rifornimento
     */
    sconto: any;
    /**
     * 
     * @type {Tessera}
     * @memberof Rifornimento
     */
    tessera?: any;
    /**
     * 
     * @type {string}
     * @memberof Rifornimento
     */
    tipoCarburante: RifornimentoTipoCarburanteEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum RifornimentoTipoCarburanteEnum {
    BENZINA = 'BENZINA',
    DIESEL = 'DIESEL'
}

