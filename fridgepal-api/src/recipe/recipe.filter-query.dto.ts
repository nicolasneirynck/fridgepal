import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

function toArray(value: unknown): string[] | undefined {
  // als leeg of afwezig is -> undefined teruggeven
  if (value === undefined || value === null || value === '') return undefined;
  // als hij er al een array van maakt -> zo teruggeven
  if (Array.isArray(value)) return value as string[];
  // als query als string wordt meegegeven ("lunch,dessert,..") -> omzetten naar array
  // + ook als er maar 1 element is -> omzetten naar array
  if (typeof value === 'string')
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean); // kei handig voor bij lege strings (bv front end geeft spatie teveel door, na trim is dat lege string) -> worden weggefilterd
  return undefined;
}

export class RecipeFilterQueryDto {
  @IsOptional()
  @Transform(({ value }) => toArray(value)) // omzetten naar array!
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @IsOptional()
  @Transform(({ value }) => toArray(value))
  @IsArray()
  @IsString({ each: true })
  ingredient?: string[];
}
