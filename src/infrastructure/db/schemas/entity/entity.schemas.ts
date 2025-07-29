/**
 * Esquemas de la base de datos
 * 
 * Define la estructura de todas las tablas y relaciones utilizadas por la aplicación.
 * Incluye esquemas de validación Zod para inserción y actualización de datos.
 * 
 */

import { pgTable, text, serial, integer, boolean, timestamp, real, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Esquema de Estados de la Entidad
 * Estados:  Nuevo, Uso, Reserva, Reparar, Reserva, Baja.
 * 
 * Registra los diferentes estados en los que se encuentra una Entidad determinada.
 * Este diseño de esquema permite normalizar los datos de la entidad.
 */
export const states = pgTable("states", {
  id: serial("id").primaryKey(), // Identificador del estado de la entidad
  state: text("state").notNull(),   // Nombre del estado de la entidad
  description: text("description").notNull()   // Descripción del estado de la entidad
})

export const insertStateSchema = createInsertSchema(states).pick({
  id: true,
  state: true,
  description: true
});

export type InsertState = z.infer<typeof insertStateSchema>;
export type State = typeof states.$inferSelect;
export const StateSelectSchema = createSelectSchema(states);
export const stateId = states.id;


/**
 * Esquema de la Entidad de demostración
 * Tabla para almacenar los datos de todos las entidades de demostración.
 * Utilizando la validación de la librería de Zod.
 */

export const entity = pgTable("entity", {
  id: serial("id").primaryKey(),                                        // Identificador único de la entidad
  name: text("name").notNull(),                                         // Nombre de la entidad
  measure: integer("measure").notNull(),                                          // Medidas de la entidad
  hight: real("hight").notNull(),                                       // Altura de la entidad
  composition_id: integer("composition_id").notNull(),                            // ID de la composición de la entidad
  type_id: integer("type_id").notNull(),                                          // ID del tipo de la entidad
  cost: real("cost").notNull(),                                         // Costo de adquisición de la entidad
  life: integer("life").notNull(),                                      // Número de vida actual de la entidad
  hours: real("hours").default(0).notNull(),                            // Horas de la entidad
  state_id:  integer("state_id").references(() => states.id).notNull(), // ID del estado de la entidad
  eliminated: boolean("eliminated").notNull().default(false),           // Campo que indica si la entidad está eliminado o no
  updatedAt: timestamp("updated_at").notNull().defaultNow(),            // Fecha y hora de registro
  createdAt: timestamp("created_at").notNull().defaultNow(),            // Fecha y hora de registro
});


/**
 * Esquema de validación para inserción de datos de la Entidad
 * Utiliza Zod para validar los datos antes de insertar en la base de datos
 */
export const insertEntitySchema = createInsertSchema(entity).pick({
  name: true,
  measure: true,
  hight: true,
  composition_id: true,
  type_id: true,
  cost: true,
  life: true,
  state_id: true,
  eliminated: true,
  updatedAt: true
});

export type InsertEntity = z.infer<typeof insertEntitySchema>;
export type Entity = typeof entity.$inferSelect;
export const entityId = entity.id;