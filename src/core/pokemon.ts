export interface Pokemon
{
    name: string;
    image: { path: string } | undefined;
    description: string;
    url: string;
}