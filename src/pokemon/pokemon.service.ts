import { PaginationDto } from './../common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService

  ){
    this.defaultLimit = configService.get<number>('DEFAULT_LIMIT') 

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    
    } catch (error) {

      this.handleExceptions(error);   
    
    }


  }

  findAll( paginationDto: PaginationDto) {
    
    const { limit = 10, offset = 0 } = paginationDto

    return this.pokemonModel.find()
    .limit( limit )
    .skip ( offset )
    .sort({
      no: 1
    })
    
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if ( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    if ( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() })
    }

    if (! pokemon )
     throw new NotFoundException(`Registro No encontrado bajo ningun concepto: '${ term }'`);  
      
    return pokemon;
  
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );

    
    try {
      await pokemon.updateOne( updatePokemonDto )
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    
    } catch ( error ) {
        this.handleExceptions(error);    
    }





  }

  async remove(id: string) {
    
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();

    const { deletedCount } = await this.pokemonModel.deleteOne( { _id: id})

    if ( deletedCount === 0)
      throw new BadRequestException(`Registro con id ${id} no encontrado.`)

    return;

  }


  private handleExceptions( error: any ){

    if ( error.code === 11000){
      throw new BadRequestException(`El registro ya existe '${ JSON.stringify( error.keyValue )}'`);
    }else{
      console.log(error)
      throw new BadRequestException(`No se puede crear registro`);
    }


  }


}