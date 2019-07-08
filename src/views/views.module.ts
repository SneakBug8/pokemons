import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { PokemonController } from "./pokemon.controller";
import { UserController } from "./user.controller";

@Module({
    imports: [CoreModule],
    controllers: [UserController, PokemonController]
})
export class ViewsModule {}
