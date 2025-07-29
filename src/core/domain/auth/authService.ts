import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTPayloadCustom } from './auth.interface';
import bcrypt from 'bcrypt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'Clave_secreta_AccessToken41431234asdsd';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'Clave_secreta_refreshToken12321332adssad';


export class AuthService {
  
  static generateAccessToken(payload: JWTPayloadCustom): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  }

  static generateRefreshToken(payload: JWTPayloadCustom): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
      return null;
    }
  }

  static verifyAccessToken(token: string): JWTPayloadCustom {

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);


    if (typeof decoded === 'object' && 'internal_id' in decoded) {
      return decoded as JWTPayloadCustom;
    }
    
    throw new Error('Token inválido');
  }

  static verifyRefreshToken(token: string): JWTPayloadCustom {

    const decoded =  jwt.verify(token, REFRESH_TOKEN_SECRET);

    if (typeof decoded === 'object' && 'internal_id' in decoded) {
      return decoded as JWTPayloadCustom;
    }

    throw new Error('Token inválido');
  }

  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null;
    
    const [bearer, token] = authHeader.split(' ');
    return bearer === 'Bearer' ? token : null;
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
  
}