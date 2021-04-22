import { createConnection } from 'typeorm';

export const db = {
  async config(createConnectionModule = createConnection) {
    try {
      return await createConnectionModule();
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
