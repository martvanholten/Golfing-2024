import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location as LocationModel, LocationDocument } from './location.schema';
import { GameInterface, LocationInterface } from '@avans-nx-workshop/shared/interfaces';

@Injectable()
export class LocationRepo {
    private readonly logger: Logger = new Logger(LocationRepo.name);

    constructor(
        @InjectModel(LocationModel.name) private locationModel: Model<LocationDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<LocationInterface[]> {
        return await this.locationModel.find().exec();
    }

    async findOne(_id: string): Promise<LocationInterface | null> {
        return await this.locationModel.findOne({ _id }).exec();
    }

    // async findAllGames(): Promise<GameInterface[]> {
    //     return  this.locationService.findAllGames();
    // }

    // async findOneGame(id: string, name: string): Promise<GameInterface | null> {
    //     return this.locationService.findOneGame(id, name);
    // }

    // async findGamesThisWeek(): Promise<GameInterface[]> {
    //     return this.locationService.findGamesThisWeek();
    // }
}