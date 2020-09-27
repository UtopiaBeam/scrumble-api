import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Label } from './Label.entity';
import { ProjectMembership } from './ProjectMembership.entity';

@ObjectType()
@Entity()
export class Project {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @OneToMany(
        () => ProjectMembership,
        p => p.project,
    )
    members: ProjectMembership[];

    @OneToMany(
        () => Label,
        label => label.project,
    )
    labels: Label[];
}
