import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project.entity';

@ObjectType()
@Entity()
export class Label {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field()
    @Column()
    color: string;

    @Column('int')
    projectId: number;

    @JoinColumn({ name: 'projectId' })
    @ManyToOne(() => Project)
    project: Project;
}
