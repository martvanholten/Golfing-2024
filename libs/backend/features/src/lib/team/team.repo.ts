import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team as TeamModel, TeamDocument } from './team.schema';
import { TeamInterface } from '@avans-nx-workshop/shared/interfaces';
import { TeamDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class TeamRepo {
    private readonly logger: Logger = new Logger(TeamRepo.name);

    constructor(
        @InjectModel(TeamModel.name) private teamModel: Model<TeamDocument>
    ) {}

    async findAll(): Promise<TeamInterface[]> {
        return await this.teamModel.find().exec();
    }

    async findOne(_id: string): Promise<TeamInterface | null> {
        return await this.teamModel.findOne({ _id }).exec();
    }

    async create(team: TeamDto): Promise<TeamInterface | null> {
        return await this.teamModel.create(team);
    }

    async update(_id: string, team: TeamInterface): Promise<TeamInterface | null> {
        return await this.teamModel.findByIdAndUpdate({ _id }, team);
    }

    async delete(_id: string){
        await this.teamModel.deleteOne({ _id });
    }
}
