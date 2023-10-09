import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { Pokemon } from './../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
export declare class SeedService {
    private readonly pokemonModel;
    private readonly http;
    constructor(pokemonModel: Model<Pokemon>, http: AxiosAdapter);
    executeSeed(): Promise<import("./interfaces/poke-response.interface").Result[]>;
}
