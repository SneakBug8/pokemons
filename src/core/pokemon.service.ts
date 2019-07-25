import { Injectable } from "@nestjs/common";
import * as MarkdownIt from "markdown-it";
import { CmsService } from "cms/cms.service";
import { Pokemon } from "./pokemon";
import DotenvService from "base/dotenv.service";

const markdownparser = MarkdownIt();

@Injectable()
export class PokemonService
{
    private readonly pokemonTable = "pokemons";

    constructor(
        private readonly cmsService: CmsService,
        private readonly configService: DotenvService
    ) { }

    private GetRenderData(pokemon: Pokemon) {
        if (pokemon.image) {

            if (!pokemon.image.path.startsWith("/")) {
                pokemon.image.path = "/" + pokemon.image.path;
            }

            pokemon.image.path = this.configService.config.CockpitUrl + pokemon.image.path;
        }

        if (pokemon.description) {
            pokemon.description = markdownparser.render(pokemon.description);
        }

        return pokemon;
    }

    public async GetByUrl(url: string): Promise<Pokemon | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<Pokemon[]>(this.pokemonTable,
            {
                filter: {
                    url
                }
            });

        if (res) {
            const pokemon = this.GetRenderData(res[0]);
            return pokemon;
        }

        return undefined;
    }

    public async GetBySlug(slug: string): Promise<Pokemon | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<Pokemon[]>(this.pokemonTable,
            {
                filter: {
                    slug
                }
            });

        if (res) {
            const pokemon = this.GetRenderData(res[0]);
            return pokemon;
        }

        return undefined;
    }

    public async GetAll(): Promise<Pokemon[] | undefined>
    {
        const res = await this.cmsService.collections.getWithParams<Pokemon[]>(this.pokemonTable,
            {
                limit: 1000
            });

        if (res) {
            return res;
        }

        return undefined;
    }
}
