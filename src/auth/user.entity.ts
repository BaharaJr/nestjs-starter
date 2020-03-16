import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
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

    @Column()
    salt: string
}