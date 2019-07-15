import { Injectable, Logger } from "@nestjs/common";

import * as fs from "fs";
import * as path from "path";

@Injectable()
export class EmojiService
{
    private emojies: string[] = [];

    constructor()
    {
        this.LoadEmojies();
    }

    private async LoadEmojies()
    {
        const text = fs.readFileSync(path.resolve(__dirname, "../../emojies.json"));
        this.emojies = JSON.parse(text.toString());
        Logger.log("Loaded " + this.emojies.length + " emojies");
    }

    public Generate()
    {
        let res = "";

        for (let i = 0; i < 3; i++) {
            const index = Math.round(Math.random() * (this.emojies.length - 1));
            res += this.emojies[index];
        }

        return res;
    }
}
