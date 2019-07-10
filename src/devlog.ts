import * as express from "express";
import { Logger } from "@nestjs/common";

export function devlog(req: express.Request, res: express.Response, next: () => void)
{
    Logger.log(req.method + " " + req.url, undefined, false);
    next();
}
