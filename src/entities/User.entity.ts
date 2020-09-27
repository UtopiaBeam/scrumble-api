import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectMembership } from './ProjectMembership.entity';

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Field()
    @Column()
    email: string;

    @OneToMany(
        () => ProjectMembership,
        p => p.user,
    )
    projects: ProjectMembership[];
}
