export type LivingDex = {
  name: string
  references?: string[],
  pokemon: {
    slug: string;
    shinyLocked?: true,
    requiredAsMale?: true
  }[];
}
