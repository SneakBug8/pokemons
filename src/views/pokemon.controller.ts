import { Controller, Get, Req, Res } from "@nestjs/common";
import { PokemonService } from "../core/pokemon.service";
import * as express from "express";

@Controller()
export class PokemonController
{
  constructor(private readonly pokemonService: PokemonService) { }

  @Get("p/*")
  private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
  {
    const match = new RegExp("p/(.+)/?").exec(req.url);

    if (!match) {
      return res.render("error", {
<<<<<<< HEAD
        message: "Передан пустой slug покемона"
=======
        message: "Передан пустой url покемона"
>>>>>>> ab7a3dec4bea8bf098b6a428a850666418f9f2af
      });
    }

    const pokemonslug = match[1];
    const pokemon = await this.pokemonService.GetBySlug(pokemonslug);

    if (!pokemon) {
      return res.render("error", {
        message: "Такого покемона не существует"
      });
    }

    return res.render("pokemon", {
      title: "Покемон " + pokemon.name,
      pokemon,
    });
  }
}
