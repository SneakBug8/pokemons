import { Injectable } from "@nestjs/common";
import { CmsService } from "cms/cms.service";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService
{
    private readonly pokemonTable = "pokemons";

    constructor(private readonly cmsService: CmsService) { }

    public async GetByUrl(url: string): Promise<Pokemon | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<Pokemon[]>(this.pokemonTable,
            {
                filter: {
                    url
                }
            });

        if (res) {
            return res[0];
        }

        return undefined;
    }
};