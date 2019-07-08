import * as appmodulepath from "app-module-path";
appmodulepath.addPath(__dirname);

import * as path from "path";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

import hbs = require("hbs");
import layouts = require("handlebars-layouts");

import minify = require("express-minify");
import compression = require("compression");
import cookieParser = require("cookie-parser");

import * as dotenv from "dotenv";
const config = dotenv.config().parsed as any;

function configureHandlebars()
{
  hbs.registerHelper(layouts(hbs.handlebars));

  const templatesPath = config.templatesPath || "templates";

  hbs.registerPartials(__dirname + "/../" + templatesPath);
}

async function bootstrap()
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const templatesPath = config.templatesPath || "templates";

  app.useStaticAssets(path.join(__dirname, "..", "root"));
  app.useStaticAssets(path.join(__dirname, "..", "static"), {
    prefix: "/static"
  });

  app.setBaseViewsDir(path.join(__dirname, "..", templatesPath));
  app.setViewEngine("hbs");

  app.use(compression());
  app.use(minify());
  app.use(cookieParser());

  await app.listen(config.port);
  console.log("App listens on " +
  config.port);
}

configureHandlebars();
bootstrap();
