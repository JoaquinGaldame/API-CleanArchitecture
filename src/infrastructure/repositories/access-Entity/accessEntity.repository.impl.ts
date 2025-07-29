import { authDB } from "@/infrastructure/db/connection";

import { eq} from 'drizzle-orm';
import { AuthService } from "@/core/domain/auth/authService";
import { IAuthRepository } from "@/core/repositories/auth/auth.repository";
import { entity } from "@/infrastructure/db/schemas";

/**
 * @fileoverview Implementación concreta del repositorio de Autenticación que accede a la única Base de Datos de Acceso General.
 * Extiende las funcionalidades del repositorio base añadiendo métodos específicos
 * para la gestión de usuarios en la base de datos. Solo procesa Schemas de la Base de Datos.
 * 
 * @module infraestructure/repositories/auth/auth.repository.impl
 * @version 1.0.0
 * @license Galdame Proprietary
 * 
 * @class AuthRepository
 * @implements IAuthRepository
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 * @security ISO27001: A.18.1.3 - Protección de registros
 */

export class AuthRepository  implements IAuthRepository{
  /**
   * Constructor del repositorio de Autenticación del Sistema.
   * 
   * @constructor
   * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
   */
  constructor() {}

  /**
   * Busca un usuario por sus Credenciales de Acceso. Primero se busca la existencia del usuario
   * 
   * @param {string} username - Nombre de usuario a buscar
   * @param {string} password - Contraseña del usuario a buscar
   * @returns {Promise<boolean>} Usuario encontrado o null si no existe
   * @security ISO27001: A.18.1.3 - Protección de registros
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   */
  async findByCredentials(username: string, password: string): Promise<boolean> {
    // 1. Buscar el usuario por email
    const user = await authDB.query.users_tirecontrol.findFirst({ where: eq(entity.name, username) });
    if (!user) return false;
    // return {success: false , result: 403, message:'El usuario no existe.', data: responseData};

    return true

    // 2. Comparar la contraseña con el hash
    // const isMatch = await AuthService.comparePassword(password, user.password)
    // if (!isMatch) return {success: false , result: 403, message:'Constraseña incorrecta.', data: responseData};

    // 3. Buscamos conexión DB Login
    // const data = { user_id: user.id };
    // const result = await authDB.execute(sql`SELECT login_access_data(${JSON.stringify(data)}::json) as data;`);

    // const raw = result.rows[0]?.data as AuthInfoResponse | undefined;
    // if (!raw) return {success: false ,  result: 500, message:'Error en el procedimiento de la base de datos', data: responseData};

    // 4. Validación de autenticación
    // if (!raw.success) {
    //   console.warn('Auth failed:', raw.message);
    //   return {success: false ,  result: 500, message:'Error en la Authenticación', data: responseData};
  }
}