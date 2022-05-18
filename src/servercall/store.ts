
import { ServerCallVerbs, ServerCallsType } from 'servercall';

export type ServerCallsKeyType = 'userExists' | 'login' | 'getUser';

export const serverCalls: ServerCallsType<ServerCallsKeyType> ={
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post, name: 'UserExists' },
  login: { path: `/auth/login`, verb: ServerCallVerbs.Post, name: 'login' },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },
};