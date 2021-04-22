import express from 'express';

export const Middleware = {
  async config(expressModule = express) {
    const app = expressModule();
    app.use(expressModule.json());
    return app;
  },
};
