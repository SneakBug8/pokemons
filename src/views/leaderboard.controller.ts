import { Controller, Get, Req, Res } from "@nestjs/common";

import * as express from "express";
import { LeaderboardService } from "core/leaderboard.service";

@Controller()
export class LeaderboardController
{
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get("leaderboard")
    private async handleRequest(@Res() res: express.Response)
    {
        const leaderboard = this.leaderboardService.GetLeaderboard();

        if (!leaderboard) {
            res.render("error", {
                message: "Что-то пошло не так"
            })
        }

        console.log(leaderboard);

        res.render("leaderboard", {
            leaderboard
        });
    }
}
