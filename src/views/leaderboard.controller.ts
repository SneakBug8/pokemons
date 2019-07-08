import { Controller, Get, Req, Res } from "@nestjs/common";

import * as express from "express";
import { LeaderboardService } from "core/leaderboard.service";

@Controller()
export class LeaderboardController
{
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get("leaderboard")
    private async handleRequest(@Req() req: express.Request, @Res() res: express.Response)
    {
        // test:test
        if (req.headers.authorization !== "Basic dGVzdDp0ZXN0") {
            // tslint:disable-next-line: quotemark
            res.setHeader("WWW-Authenticate", 'Basic realm="Pokemons"');
            return res.status(401).send("Authentication required."); // Access denied.
        }

        const leaderboard = await this.leaderboardService.GetLeaderboard();

        if (!leaderboard) {
            res.render("error", {
                message: "Что-то пошло не так"
            });
        }

        console.log(leaderboard);

        res.render("leaderboard", {
            leaderboard,
            hideleaderboardlink: 1
        });
    }
}
