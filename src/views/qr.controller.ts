import { Controller, Get, Req, Res } from "@nestjs/common";
import { PokemonService } from "../core/pokemon.service";
import * as express from "express";
import querystring = require("querystring");
import DotenvService from "base/dotenv.service";

@Controller()
export class QRController
{
    constructor(private readonly pokemonService: PokemonService,
        private readonly configService: DotenvService) { }

    @Get("qr/*")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        const match = new RegExp("qr/(.+)/?").exec(req.url);

        if (!match) {
            return;
        }

        const pokemonslug = match[1];
        const pokemon = await this.pokemonService.GetBySlug(pokemonslug);

        if (!pokemon) {
            return res.render("error", {
                message: "Такого покемона не существует"
            });
        }

        pokemon.image = {
            path: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
                querystring.escape(this.configService.config.deployUrl + "/c/" + pokemon.url)
        };

        return res.render("pokemon", {
            title: "QR | Покемон " + pokemon.name,
            pokemon,
        });
    }
}
