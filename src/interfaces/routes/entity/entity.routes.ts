import { Router } from "express";

import * as EntityHanlders from "@/interfaces/controllers/entity/entity.controller";

/**
 * @swagger
 * tags:
 *   - name: Entity
 *     description: Operaciones sobre una Entidad determinada a modo de ejemplo.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Entity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Ejemplo nombre"
 *         measure:
 *           type: number
 *           example: 55
 *         hight:
 *           type: number
 *           example: 27
 *         composition_id:
 *           type: number
 *           example: 5
 *         type_id:
 *           type: integer
 *           example: 1
 *         cost:
 *           type: number
 *           format: float
 *           example: 2500.99
 *         life:
 *           type: number
 *           example: 2
 *         state_id:
 *           type: integer
 *           example: 1
 *         updatedAt:
 *           type: string
 *           example: "01-08-2024"
 */
const entityRoutes = Router();



/**
 * @swagger
 * /entity:
 *   get:
 *     tags:
 *       - Entity
 *     summary: Obtener Listado de la Entidad
 *     description: Retorna una lista de todos las Entidades del sistema
 *     responses:
 *       200:
 *         description: Lista de neumáticos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entity'
 *       404:
 *         description: Entidades no encontradas.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.get('/', EntityHanlders.getEntityByIdHandler);





/**
 * @swagger
 * /entity/{id}:
 *   get:
 *     tags:
 *       - Entity
 *     summary: Obtener una entidad específica por ID
 *     description: Retorna una entidad específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la Entidad
 *     responses:
 *       200:
 *         description: Detalles de la Entidad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entity'
 *       404:
 *         description: Entidades no encontrado.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.get('/:id', EntityHanlders.getEntityByIdHandler);


/**
 * @swagger
 * /entity:
 *   post:
 *     tags:
 *       - Entity
 *     summary: Crear una Entidad
 *     description: Crea un entidad nueva en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Ejemplo nombre"
 *                measure:
 *                  type: number
 *                  example: 55
 *                hight:
 *                  type: number
 *                  example: 27
 *                composition_id:
 *                  type: number
 *                  example: 5
 *                type_id:
 *                  type: integer
 *                  example: 1
 *                cost:
 *                  type: number
 *                  format: float
 *                  example: 2500.99
 *                life:
 *                  type: number
 *                  example: 2
 *                state_id:
 *                  type: integer
 *                  example: 1
 *                updatedAt:
 *                  type: string
 *                  example: "01-08-2024"
 *     responses:
 *       201:
 *         description: Entidad creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entity'
 *       400:
 *         description: Error al crear Entidad.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.post('/', EntityHanlders.createEntityHandler);





/**
 * @swagger
 * /entity/{id}:
 *   put:
 *     tags:
 *       - Entity
 *     summary: Actualizar una Entidad
 *     description: Actualiza todos los campos de una Entidad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entidad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entity'
 *     responses:
 *       200:
 *         description: Entidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entity'
 *       400:
 *         description: Error en los datos de entrada.
 *       404:
 *         description: Entidad no encontrada.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.put('/:id', EntityHanlders.updateEntityHandler);



/**
 * @swagger
 * /entity/{id}:
 *   patch:
 *     tags:
 *       - Entity
 *     summary: Actualizar parcialmente una entidad
 *     description: Actualiza algunos campos de una entidad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entidad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entity'
 *     responses:
 *       200:
 *         description: Entidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entity'
 *       400:
 *         description: Error en los datos de entrada.
 *       404:
 *         description: Entidad no encontrada.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.patch('/:id', EntityHanlders.updateEntityHandler);



/**
 * @swagger
 * /entity/{id}:
 *   delete:
 *     tags:
 *       - Entity
 *     summary: Eliminar una Entidad, si es necesario agregar permisos de administrador.
 *     description: Elimina una Entidad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la Entidad a eliminar
 *     responses:
 *       200:
 *         description: Entidad eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: number
 *       404:
 *         description: Entidad no encontrada.
 *       500:
 *         description: Error del servidor.
 */
entityRoutes.delete('/:id', EntityHanlders.deleteEntityHandler);


export default entityRoutes;