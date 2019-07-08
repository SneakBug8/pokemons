import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { CatchingController } from "./catching.controller";
import { UserController } from "./user.controller";
import { PokemonController } from "./pokemon.controller";
import { LeaderboardController } from "./leaderboard.controller";

@Module({
    imports: [CoreModule],
    controllers: [UserController, CatchingController, PokemonController, LeaderboardController]
})
export class ViewsModule {}
