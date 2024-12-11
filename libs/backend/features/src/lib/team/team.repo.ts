import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team as TeamModel, TeamDocument } from './team.schema';
import { CreateTeamInterface, TeamInterface } from '@avans-nx-workshop/shared/interfaces';

@Injectable()
export class TeamRepo {
    private readonly logger: Logger = new Logger(TeamRepo.name);

    constructor(
        @InjectModel(TeamModel.name) private teamModel: Model<TeamDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<TeamInterface[]> {
        return await this.teamModel.find().exec();
    }

    async findOne(_id: string): Promise<TeamInterface | null> {
        return await this.teamModel.findOne({ _id }).exec();
    }

    async findTopFive(): Promise<TeamInterface[]> {
        return await this.teamModel.find().exec();
    }

    async create(team: CreateTeamInterface): Promise<TeamInterface | null> {
        return await this.teamModel.create(team);
    }

    async update(_id: string, team: CreateTeamInterface): Promise<TeamInterface | null> {
        return await this.teamModel.findByIdAndUpdate({ _id }, team);
    }
}
