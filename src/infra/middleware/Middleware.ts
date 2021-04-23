import express from 'express';
import ejs from 'ejs';
import path from 'path';

export const Middleware = {
  config({ cwd, routes }, expressModule = express, ejsModule = ejs) {
    return expressModule()
      .use(expressModule.json())
      .use(routes)
      .use(expressModule.static(path.join(__dirname, cwd)))
      .set('views', path.join(__dirname, cwd))
      .engine('html', ejsModule.renderFile)
      .set('view engine', 'html');
  },
};
