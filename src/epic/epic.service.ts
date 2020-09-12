import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Epic } from '../models/epic.model';
import { Model, Types } from 'mongoose';
import { CreateEpicMutation, EditEpicMutation } from './dto/epic.mutation';

@Injectable()
export class EpicService {
    constructor(@InjectModel(Epic.name) private readonly model: Model<Epic>) {}

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    create({ projectId, ...epicDTO }: CreateEpicMutation) {
        const epic = new this.model({
            ...epicDTO,
            project: Types.ObjectId(projectId),
        });
        return epic.save();
    }

    update(id: string, epicDTO: EditEpicMutation) {
        return this.model.findByIdAndUpdate(id, epicDTO, { new: true }).exec();
    }

    async findProject(id: string) {
        const epic = await this.model
            .findById(id)
            .populate('project')
            .exec();
        return epic.project;
    }

    async findBacklogs(id: string) {
        const epic = await this.model
            .findById(id)
            .populate('backlogs')
            .exec();
        return epic.backlogs;
    }
}
