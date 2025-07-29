/**
 * @fileoverview Interfaz para el repositorio de Entidades de Autenticación.
 * @module core/repositories/auth/auth.repository
 * @version 1.0.0
 * @license TireControl Proprietary
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 */

export interface IAuthRepository {
    // Interfaces personalizadas para la Entidad de Autenticación

  /**
   * Encuentra un usuario por sus credenciales (username y contraseña).
   * 
   * @param {string} username - Correo electrónico del usuario tirecontrol
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<boolean>} Acceso correcto o incorrecto
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  findByCredentials(username: string, password: string): Promise<boolean>;
}