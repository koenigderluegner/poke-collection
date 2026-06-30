export interface LivingDex {
  name: string
  references?: string[],
  pokemon: {
    slug: string;
    shinyLocked?: true,
    requiredAsMale?: true
  }[];
}
