import { createConnection } from 'typeorm';

export const Database = {
  async setup(createConnectionModule = createConnection) {
    try {
      return await createConnectionModule();
    } catch (err) {
      throw new Error(err.message);
    }
  },
}
