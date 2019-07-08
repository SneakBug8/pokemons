import { Injectable } from "@nestjs/common";
import { CmsService } from "cms/cms.service";
import { Pokemon } from "./pokemon";
import DotenvService from "base/dotenv.service";
import { UserService } from "./user.service";
import { User } from "./user";

@Injectable()
export class LeaderboardService
{
    private readonly usersTable: string;

    constructor(private readonly cmsService: CmsService,
        private readonly userService: UserService)
    {
        this.usersTable = userService.usersTable;
    }

    public async GetLeaderboard(): Promise<User[] | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<User[]>(this.usersTable,
            {
                sort: {
                    capturedamount: -1
                }
            });

        if (res) {
            return res;
        }

        return undefined;
    }
};