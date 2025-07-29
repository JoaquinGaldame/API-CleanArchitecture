import { RequestHandler } from 'express';
import { AuthService } from '@/core/domain/auth/authService';
import { AuthenticatedRequest } from '@/core/types/Request.interface';
import { JWTPayloadCustom } from '@/core/domain/auth/auth.interface';
import { DbConnectionKey } from '@/infrastructure/db/connections/db-connections';


export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = AuthService.extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      res.status(403).json({ message: 'No autorizado - Token no proporcionado' });
      return;
    }

    const decoded : JWTPayloadCustom = AuthService.verifyAccessToken(token);
    if (!decoded || !decoded.connection_string) {
      if(decoded.role !== 'admin'){
        res.status(403).json({ message: 'No autorizado - Token no válido' });
        return;
      }
    }
    if(decoded.role !== 'admin' && decoded.connection_string)
    {
      // Type assertion para el request extendido
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        id: decoded?.internal_id ?? 0,
        connection_string: decoded.connection_string as DbConnectionKey 
      };
    } else {
      // Validamos si el connection string fue enviado en el Token
      if(decoded.connection_string){
        // Type assertion para el request extendido para el segundo acceso de Administrador
        const authenticatedReq = req as AuthenticatedRequest;
        authenticatedReq.user = {
          id: decoded?.internal_id ?? 0,
          connection_string: decoded.connection_string as DbConnectionKey 
        };
      } else {
        // Type assertion para el request extendido para el primer acceso de Administrador
        const authenticatedReq = req as AuthenticatedRequest;
        authenticatedReq.user = {
          id: 0,
          connection_string: '',
          user_id: decoded?.userId
        };
      }
    }
    
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Acceso no autorizado: Token expirado. Por favor, vuelve a iniciar sesión.', error: error.message });
    }
     if (error.name === 'JsonWebTokenError') {
      switch (error.message) {
        case 'jwt malformed':
          res.status(401).json({ message: 'Acceso no autorizado: Token malformado. Intente iniciar sesión de nuevo.', error: error.message });
        case 'invalid signature':
          res.status(401).json({ message: 'Acceso no autorizado: Firma del token inválida.', error: error.message });
        case 'jwt must be provided':
          res.status(401).json({ message: 'Acceso no autorizado: No se proporcionó ningún token.', error: error.message });
        default:
          res.status(401).json({ message: 'Acceso no autorizado: Token inválido.  Inicia sesión nuevamente.', error: error.message });
      }
    }

    if (error.name === 'NotBeforeError') {
      res.status(403).json({ message: 'Este token aún no es válido. Intenta más tarde.', error: error.message });
    }

    // Error inesperado
    res.status(500).json({ message: 'Error interno al verificar token. Consulte con Soporte Técnico.', error: error.message });
  }
};