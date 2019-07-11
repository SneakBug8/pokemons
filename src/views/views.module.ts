import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { CatchingController } from "./catching.controller";
import { UserController } from "./user.controller";
import { PokemonController } from "./pokemon.controller";
import { LeaderboardController } from "./leaderboard.controller";
import { AdminController } from "./admin.controller";
import { ReceiveprizeController } from "./receiveprize.controller";
import { FixmistakeController } from "./fixmistake.controller";

@Module({
    imports: [CoreModule],
    controllers: [UserController, CatchingController, PokemonController, LeaderboardController, AdminController,
    ReceiveprizeController, FixmistakeController]
})
export class ViewsModule {}
