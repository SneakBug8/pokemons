import { Injectable } from "@nestjs/common";
import { CmsService } from "cms/cms.service";
import { User } from "./user";

import * as express from "express";
import { EmojiService } from "./emoji.service";

@Injectable()
export class UserService
{
    public readonly usersTable = "pokemonusers";

    constructor(private readonly cmsService: CmsService,
        private readonly emojiService: EmojiService) { }

    public async GetById(id: string): Promise<User | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<User[]>(this.usersTable, {
            filter: {
                id
            }
        });

        if (res) {
            const user = res[0];
            user.capturedamount = Number.parseInt(user.capturedamount as any, 10);
            return user;
        }

        return undefined;
    }

    public async AddCapture(userId: string, capturedUrl: string)
    {
        let user = await this.GetById(userId);

        if (!user) {
            user = this.Create();
        }

        user.captures.push(capturedUrl);

        this.Save(user);

        return user.id;
    }

    public Create(): User
    {
        const user = new User();
        user.id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        user.emojies = this.emojiService.Generate();

        return user;
    }

    public SetCookie(res: express.Response, user: User)
    {
        res.cookie("id", user.id, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
    }

    public CreateUserForRequest(req: express.Request, res: express.Response)
    {
        const user = this.Create();

        this.SetCookie(res, user);
        this.Save(user);

        return res.redirect(req.url);
    }

    public Save(user: User)
    {
        user.capturedamount = user.captures.length;

        this.cmsService.collections.save(this.usersTable, [user]);
    }
}