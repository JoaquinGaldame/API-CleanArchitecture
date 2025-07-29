import { DbConnectionKey } from "@/infrastructure/db/connections/db-connections";

export interface JWTPayloadCustom  {
  connection_string?: DbConnectionKey | 'default';
  userId: string;
  name?: string;
  tenant?: string;
  tenant_id?: number;
  internal_id?: number;
  role: string;
  defaultPassword?: boolean;
  changePassword?: boolean;
  connections?: string[];
};