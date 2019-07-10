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
import { Logger } from "@nestjs/common";
import { devlog } from "devlog";

const config = dotenv.config().parsed as any;

const templatesPath = config.templatesPath || "templates";

export class App
{
    private preconfigureHandlebars()
    {
        hbs.registerHelper(layouts(hbs.handlebars));

        hbs.registerPartials(path.join(__dirname, "..", templatesPath));
        Logger.log("Loaded helpers and partitials");
    }

    private configureHandlebars(app: NestExpressApplication)
    {
        app.setBaseViewsDir(path.join(__dirname, "..", templatesPath));
        app.setViewEngine("hbs");
        Logger.log("Loaded views");
    }

    private useStatic(app: NestExpressApplication)
    {
        app.useStaticAssets(path.join(__dirname, "..", "public"));
        Logger.log("Loaded static assets");
    }

    private optimize(app: NestExpressApplication)
    {
        app.use(compression());
        app.use(minify());
        Logger.log("Loaded optimisations");
    }

    private setcookieParser(app: NestExpressApplication)
    {
        app.use(cookieParser());
        Logger.log("Loaded cookie parser");
    }

    private setdevlogger(app: NestExpressApplication)
    {
        app.use(devlog);
        Logger.log("Loaded dev logger");
    }

    public async bootstrap()
    {
        this.preconfigureHandlebars();

        const app = await NestFactory.create<NestExpressApplication>(AppModule);

        this.configureHandlebars(app);
        this.useStatic(app);

        this.setcookieParser(app);
        this.optimize(app);

        if (config.dev) {
            this.setdevlogger(app);
        }

        if (!config.dev) {
            this.optimize(app);
        }

        await app.listen(config.port);
        Logger.log("App listens on " + config.port);
    }
}
