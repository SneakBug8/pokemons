import { Module } from "@nestjs/common";
import { BaseModule } from "./base/base.module";
import { ViewsModule } from "./views/views.module";

@Module({
  imports: [BaseModule, ViewsModule]
})
export class AppModule {}
