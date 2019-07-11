import { Controller, Get, Req, Res, Param } from "@nestjs/common";
import { UserService } from "core/user.service";
import { User } from "../core/user";

import * as express from "express";
import { Pokemon } from "core/pokemon";
import { PokemonService } from "core/pokemon.service";

@Controller()
export class ReceiveprizeController
{
    constructor(private readonly userService: UserService) { }

    @Get("/receive/:id")
    private async handleRequest(@Param("id") id: string, @Req() req: express.Request, @Res() res: express.Response)
    {
        // test:test
        if (req.headers.authorization !== "Basic dGVzdDp0ZXN0") {
            // tslint:disable-next-line: quotemark
            res.setHeader("WWW-Authenticate", 'Basic realm="Pokemons"');
            return res.status(401).render("error",
                { message: "Authentication required." }); // Access denied.
        }

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

        user.receivedprize = true;

        this.userService.Save(user);

        return res.render("action", {
            message: user.emojies + " получил приз. Вас переадресует в админку через 3 секунды.<script src='/backtoadmin.js'></script>"
        });
    }
}
