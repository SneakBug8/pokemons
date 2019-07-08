import { Injectable } from "@nestjs/common";
import { CmsService } from "cms/cms.service";
import { User } from "./user";

import * as express from "express";

@Injectable()
export class UserService
{
    private readonly usersTable = "pokemonusers";

    constructor(private readonly cmsService: CmsService) { }

    public async GetById(id: string): Promise<User | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<User[]>(this.usersTable, {
            filter: {
                id
            }
        });

        if (res) {
            return res[0];
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

    public CreateUserForRequest(res: express.Response)
    {
        const user = this.Create();

        res.cookie("id", user.id, {
            expires: new Date(Date.now() + 900000)
        });

        res.send("Created user with id " + user.id + " for you.");
    }

    public Create(): User
    {
        const user = new User();
        user.id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString();

        this.Save(user);

        return user;
    }

    public Save(user: User)
    {
        this.cmsService.collections.save(this.usersTable, [user]);
    }
}