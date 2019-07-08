import { Controller, Get, Req, Res } from "@nestjs/common";
import { UserService } from "core/user.service";
import { User } from "../core/user";

import * as express from "express";

@Controller()
export class UserController
{
    constructor(private readonly userService: UserService) { }

    @Get("/")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        if (!req.cookies || !req.cookies.id) {
            console.log("Creating user because of cookie");
            this.userService.CreateUserForRequest(res);
            return;
        }

        const userid = req.cookies.id;
        const user = await this.userService.GetById(userid as string);

        if (!user) {
            console.log("Creating user because of wrong id");
            this.userService.CreateUserForRequest(res);
            return;
        }

        res.json(user);
    }
}
