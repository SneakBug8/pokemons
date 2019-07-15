import { Controller, Get, Req, Res } from "@nestjs/common";
import { UserService } from "core/user.service";
import { User } from "../core/user";

import * as express from "express";
import { Pokemon } from "core/pokemon";
import { PokemonService } from "core/pokemon.service";

@Controller()
export class UserController
{
  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) { }

  @Get("/")
  private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
  {
    let userid: string | undefined;
    let user: User | undefined;

    if (!req.cookies || !req.cookies.id) {
      return this.userService.CreateUserForRequest(req, res);
    }
    else {
      userid = req.cookies.id;
      user = await this.userService.GetById(userid as string);
    }

    if (!user) {
      return this.userService.CreateUserForRequest(req, res);
    }

    const pokemons: Pokemon[] = [];
    for (const pokemonid of user.captures) {
      const pokemon = await this.pokemonService.GetByUrl(pokemonid) as any;

      if (pokemon) {
        pokemons.push(pokemon);
      }
    }

    return res.render("user", {
      title: "Личная страница игрока",
      user,
      pokemons,
      hidehomelink: true
    });
  }
}
