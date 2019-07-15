export interface Pokemon
{
  name: string;
  image: { path: string } | undefined;
  description: string;
  slug: string;
  url: string;
}
