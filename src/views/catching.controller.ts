import { Controller, Get, Req, Res } from "@nestjs/common";
import { PokemonService } from "../core/pokemon.service";
import * as express from "express";
import { User } from "../core/user";
import { UserService } from "../core/user.service";

@Controller()
export class CatchingController
{
    constructor(private readonly pokemonService: PokemonService,
        private readonly userService: UserService) { }

    @Get("c/*")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        const match = new RegExp("c/(.+)/?").exec(req.url);

        if (!match) {
            return;
        }

        const pokemonurl = match[1];
        const pokemon = await this.pokemonService.GetByUrl(pokemonurl);

        if (!pokemon) {
            res.render("error", {
                message: "Такого покемона не существует"
            });
            return;
        }

        let userid: string | undefined;
        let user: User | undefined;

        if (!req.cookies || !req.cookies.id) {
            user = this.userService.Create();
            this.userService.SetCookie(res, user);
        }
        else {
            userid = req.cookies.id;
            user = await this.userService.GetById(userid as string);

            if (!user) {
                user = this.userService.Create();
                this.userService.SetCookie(res, user);
            }
        }

        if (!user.captures.find((x) => x === pokemonurl)) {
            user.captures.push(pokemonurl);
            res.render("action", {
                message: "Вы поймали покемона " + pokemon.name
            });

            this.userService.Save(user);
            return;
        }
        else {
            res.render("action", {
                message: "Вы уже ловили этого покемона"
            });
            return;
        }
    }
}
