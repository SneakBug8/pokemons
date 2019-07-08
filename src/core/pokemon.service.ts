import { Injectable } from "@nestjs/common";
import { CmsService } from "cms/cms.service";
import { Pokemon } from "./pokemon";
import DotenvService from "base/dotenv.service";

@Injectable()
export class PokemonService
{
    private readonly pokemonTable = "pokemons";

    constructor(private readonly cmsService: CmsService,
        private readonly configService: DotenvService) { }

    public async GetByUrl(url: string): Promise<Pokemon | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<Pokemon[]>(this.pokemonTable,
            {
                filter: {
                    url
                }
            });

        if (res) {
            const pokemon = res[0];

            if (pokemon.image) {
                pokemon.image.path = this.configService.config.CockpitUrl + pokemon.image.path;
            }

            return res[0];
        }

        return undefined;
    }
};