import { Global, Module } from "@nestjs/common";
import DotenvService from "./dotenv.service";

@Global()
@Module({
    providers: [DotenvService],
    exports: [DotenvService]
})
export class BaseModule {}
