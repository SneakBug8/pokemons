import { Controller, Get, Req, Res } from "@nestjs/common";
import { PokemonService } from "../core/pokemon.service";
import * as express from "express";
import { User } from "../core/user";
import { UserService } from "../core/user.service";

@Controller()
export class PokemonController
{
    constructor(private readonly pokemonService: PokemonService) { }

    @Get("p/*")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        const match = new RegExp("p/(.+)/?").exec(req.url);

        if (!match) {
            return;
        }

        const pokemonurl = match[1];
        const pokemon = await this.pokemonService.GetByUrl(pokemonurl);

        if (!pokemon) {
            return res.render("error", {
                message: "Такого покемона не существует"
            });
        }

        return res.render("pokemon", {
            pokemon
        });
    }
}
