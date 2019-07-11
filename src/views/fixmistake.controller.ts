import { Controller, Get, Req, Res, Param } from "@nestjs/common";
import { UserService } from "core/user.service";
import { User } from "../core/user";

import * as express from "express";
import { Pokemon } from "core/pokemon";
import { PokemonService } from "core/pokemon.service";

@Controller()
export class FixmistakeController
{
    constructor(private readonly userService: UserService) { }

    @Get("/fix/:id")
    private async handleRequest(@Param("id") id: string, @Req() req: express.Request, @Res() res: express.Response)
    {
        if (!id) {
            return res.render("error", {
                message: "Не указан id"
            });
        }

        const user = await this.userService.GetById(id);

        if (!user) {
            return res.render("error", {
                message: "Нет такого пользователя"
            });
        }

        user.receivedprize = false;

        this.userService.Save(user);

        return res.render("action", {
            message: user.emojies + " больше не получил приз. Вас переадресует в админку через 3 секунды.<script src='/backtoadmin.js'></script>"
        });
    }
}
