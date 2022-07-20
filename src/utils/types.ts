import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const uuidValidateV4 = (uuid: string): boolean =>
  uuidValidate(uuid) && uuidVersion(uuid) === 4;

export type Id = string;
