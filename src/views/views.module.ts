import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { CatchingController } from "./catching.controller";
import { UserController } from "./user.controller";

@Module({
    imports: [CoreModule],
    controllers: [UserController, CatchingController]
})
export class ViewsModule {}
