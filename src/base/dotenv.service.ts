import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";

@Injectable()
export default class DotenvService
{
    public config: any;
    constructor()
    {
        this.config = dotenv.config().parsed;
    }
}
