import { Module } from "@nestjs/common";
import { CmsModule } from "../cms/cms.module";
import { PokemonService } from "./pokemon.service";
import { UserService } from "./user.service";

@Module({
    imports: [CmsModule],
    providers: [PokemonService, UserService],
    exports: [PokemonService, UserService]
})
export class CoreModule {}
