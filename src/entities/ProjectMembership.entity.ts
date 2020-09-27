import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Role } from '../enums/role';
import { Project } from './Project.entity';
import { User } from './User.entity';

@Entity()
export class ProjectMembership {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    projectId: number;

    @Column({ enum: Role, default: Role.Viewer })
    role: Role;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'projectId' })
    project: Project;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
