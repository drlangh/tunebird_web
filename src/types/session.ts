import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface Token extends JWT {
  access_token: string;
  provider: string;
}

interface SessionJWT extends Session {
  token: Token;
}

export default SessionJWT;
