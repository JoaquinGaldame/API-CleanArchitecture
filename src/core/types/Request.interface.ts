import { Request } from 'express';
export interface AuthPayload {
  id: number;
  connection_string: string;
  tenant?: string;
  email?: string;
  user_id?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}
