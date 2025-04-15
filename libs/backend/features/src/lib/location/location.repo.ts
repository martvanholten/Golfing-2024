import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location as LocationModel, LocationDocument } from './location.schema';
import { GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';
import { GameDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class LocationRepo {
    private readonly logger: Logger = new Logger(LocationRepo.name);
    location?: LocationInterface | null;
    locations: LocationInterface[] = new Array<LocationInterface>;
    games: GameInterface[] = new Array<GameInterface>;
    game?: GameInterface | undefined;

    constructor(
        @InjectModel(LocationModel.name) private locationModel: Model<LocationDocument>
    ) {}

    async findAll(): Promise<LocationInterface[]> {
        return await this.locationModel.find().exec();
    }

    async findOne(_id: string): Promise<LocationInterface | null> {
        return await this.locationModel.findOne({ _id }).exec();
    }

    async findOneByName(name: string): Promise<LocationInterface | null> {
        return await this.locationModel.findOne({ name }).exec();
    }

    async findAllGames(): Promise<GameInterface[]> {
        this.games.length = 0;
        this.locations = await this.locationModel.find().exec();
        this.locations.forEach(location => {
            location.games.forEach(game => {
                this.games.push(game)
            })
        })
        return  this.games;
    }

    async findAllLocationGames(_id: string): Promise<GameInterface[]> {
        this.location = await this.locationModel.findOne({ _id }).exec();
        this.location?.games.forEach(game => {
            this.games.push(game)
        })
        return this.games
    }

    async findOneGame(name: string, gameName: string): Promise<GameInterface | undefined> {
        this.location = await this.locationModel.findOne({ name }).exec();
        this.location?.games.forEach(game => {
            if(game.name === gameName){
                this.game = game
            }
        })
        return this.game
    }

    async updateOneGame(location: LocationInterface, updateGame: GameDto, oldGameName: string): Promise<GameInterface | undefined> {
        var games = new Array<GameInterface>
        location.games.forEach(g => {
            if(g.name !== oldGameName){
                games.push(g)
            }else{
                console.log('REACHED GAME')
                games.push(updateGame)
            }
        });
        location.games = games;
        console.log(location)
        var _id = location._id
        this.location = await this.locationModel.findByIdAndUpdate({ _id }, location)
        return this.findOneGame(location.name, updateGame.name)
    }

    async createOneGame(location: LocationInterface, createGame: GameDto): Promise<GameInterface | undefined> {
        location.games.push(createGame)
        console.log(location)
        var _id = location._id
        this.location = await this.locationModel.findByIdAndUpdate({ _id }, location)
        console.log(this.location)
        return this.findOneGame(location.name, createGame.name)
    }
}