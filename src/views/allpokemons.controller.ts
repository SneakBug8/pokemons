import { Controller, Get, Req, Res, Logger } from "@nestjs/common";

import * as express from "express";
import { PokemonService } from "core/pokemon.service";

@Controller()
export class AllPokemonsController
{
    constructor(private readonly pokemonService: PokemonService) { }

    @Get("admin/qrs")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        const pokemons = await this.pokemonService.GetAll();

        Logger.log(pokemons);

        return res.render("allpokemons", {
            pokemons
        });
    }
}
