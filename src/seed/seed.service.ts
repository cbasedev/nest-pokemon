import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { Pokemon } from './../pokemon/entities/pokemon.entity';
import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}
  

  async executeSeed(){

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // const insertPromisesArray = [];

    // data.results.forEach(({name, url}) =>{
    //   const segments = url.split('/');
    //   const no = +segments[ segments.length - 2 ];
      
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({ name, no })
    //   );
      
    // })

    const pokemonToInsert: { name: string, no:  number }[] = [];
  

    data.results.forEach(({name, url}) =>{
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      pokemonToInsert.push({ name, no});
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return data.results;

  }
  
}
