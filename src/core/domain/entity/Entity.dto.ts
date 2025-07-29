/**
 * @fileoverview Definiciones de los DTOs (Data Transfer Objects) relacionados con la entidad.
 * Estos objetos son utilizados para la transferencia de datos entre capas de la aplicación (controlador, caso de uso, repositorio),
 * asegurando encapsulamiento, validación y separación de responsabilidades.
 * 
 * Los DTOs definidos incluyen:
 * - EntityDTO: para la exposición segura de datos de la Entidad.
 * - CreateEntityDTO: para la creación de Entidades.
 * - DeleteEntityDTO: para respuesta tras una eliminación de una Entidad.
 * - UpdateEntityDTO: para la modificación parcial de una Entidad.
 * 
 * Cumple con los principios de Clean Architecture, manteniendo independencia de detalles de infraestructura.
 * 
 * @module core/domain/Entity/Entity.dto
 * @version 1.0.0
 * @license TireControl Proprietary
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */

/**
 * DTO utilizado para exponer datos de la Entidad a otros componentes del sistema o al cliente.
 * Asegura que datos sensibles como la contraseña no sean expuestos.
 * 
 * @interface EntityDTO
 * @property {number} id - Identificador único de la Entidad.
 * @property {string} name - Nombre de la entidad.
 * @property {number} measure - Medida de la entidad.
 * @property {number} hight - Altura de la entidad.
 * @property {number} composition_id - Composición de la entidad
 * @property {number} type_id - Tipo de la Entidad.
 * @property {number} cost - Costo de la Entidad.
 * @property {number} life - Número de vida de la Entidad.
 * @property {number} state_id - Identificador del Estado de la Entidad.
 * @property {string} updatedAt - Indica la fecha de la última modficación
 * 
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export interface EntityDTO {
  id: number;
  name: string;
  measure: number;
  hight: number;
  composition_id: number;
  type_id: number;
  cost: number;
  life: number;
  state_id: number;
  updatedAt: string;
}

/**
 * DTO utilizado para la creación de una nueva Entidad.
 * Contiene todos los campos requeridos para registrar una Entidad en el sistema.
 * 
 * @interface CreateEntityDTO
 * @property {number} id - Identificador único de la Entidad.
 * @property {string} name - Nombre de la entidad.
 * @property {number} measure - Medida de la entidad.
 * @property {number} hight - Altura de la entidad.
 * @property {number} composition_id - Composición de la entidad
 * @property {number} type_id - Tipo de la Entidad.
 * @property {number} cost - Costo de la Entidad.
 * @property {number} life - Número de vida de la Entidad.
 * @property {number} state_id - Identificador del Estado de la Entidad.
 * @property {boolean} eliminated - Campo que indica si la entidad fue eliminada o no
 * @property {string} updatedAt - Indica la fecha de la última modficación
 * 
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export interface CreateEntityDTO{
  name: string;
  measure: number;
  hight: number;
  composition_id: number;
  type_id: number;
  cost: number;
  life: number;
  state_id: number;
  eliminated: boolean;
  updatedAt: Date;
}


/**
 * DTO de respuesta utilizado tras la eliminación de una Entidad.
 * Permite comunicar de forma clara qué Entidad fue eliminado y con qué mensaje.
 * 
 * @interface DeleteEntityDTO
 * @property {string} message - Mensaje de resultado de la operación.
 * @property {EntityDTO} entity - Entidad eliminada
 * @property {number} count - Números de registros de filas eliminadas
 * 
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export interface DeleteEntityDTO {
  message: string;
  entity?: EntityDTO | null;
  count: number;
}


/**
 * DTO utilizado para actualizar una Entidad.
 * Hereda todos los campos de CreateEntityDTO como opcionales mediante `Partial`, permitiendo actualizar solo campos específicos.
 * 
 * @interface UpdateEntityDTO
 * @extends Partial<CreateEntityDTO>
 * 
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export interface UpdateEntityDTO extends Partial<CreateEntityDTO> {}