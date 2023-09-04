import bCrypt from 'bcrypt';

export const createHash = (data: string): string => bCrypt.hashSync(data, bCrypt.genSaltSync(10));
export const compareHash = (firstHash: string, secondHash: string): boolean => bCrypt.compareSync(firstHash, secondHash);
