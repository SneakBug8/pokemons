import { Controller, Get, Req, Res } from "@nestjs/common";
import { PokemonService } from "../core/pokemon.service";
import * as express from "express";
import { User } from "../core/user";
import { UserService } from "../core/user.service";

@Controller()
export class PokemonController
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
            res.send("No such pokemon");
            return;
        }

        let userid: string | undefined;
        let user: User | undefined;

        if (req.cookies && req.cookies.id) {
            userid = req.cookies.id;

            if (userid) {
                user = await this.userService.GetById(userid as string);
            }
        }

        if (!user) {
            this.userService.CreateUserForRequest(res);
            return;
        }

        if (!user.captures.find((x) => x === pokemonurl)) {
            user.captures.push(pokemonurl);
            res.send("You captured pokemon " + pokemonurl);

            this.userService.Save(user);
            return;
        }
        else {
            res.send("You have already captured that pokemon");
            return;
        }
    }
}
