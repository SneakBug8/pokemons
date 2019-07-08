import { Module } from "@nestjs/common";
import { CmsModule } from "../cms/cms.module";
import { PokemonService } from "./pokemon.service";
import { UserService } from "./user.service";
import { EmojiService } from "./emoji.service";
import { LeaderboardService } from "./leaderboard.service";

@Module({
    imports: [CmsModule],
    providers: [EmojiService, PokemonService, UserService, LeaderboardService],
    exports: [PokemonService, UserService]
})
export class CoreModule { }
