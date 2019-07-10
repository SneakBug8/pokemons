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
        const leaderboard = await this.leaderboardService.GetLeaderboard();

        if (!leaderboard) {
            return res.render("error", {
                message: "Что-то пошло не так"
            });
        }

        return res.render("leaderboard", {
            leaderboard,
            hideleaderboardlink: 1
        });
    }
}
