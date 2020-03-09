import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class UserProfile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    uid: string

    @Column()
    username: string

    @Column()
    firstname: string
    
    @Column()
    lastname: string

    @Column()
    password: string
}