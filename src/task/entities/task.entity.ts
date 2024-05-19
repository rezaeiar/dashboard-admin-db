import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity({name : 'Task'})
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type : 'varchar' , nullable : false})
    title : string ;

    @Column({type : 'boolean' , default : false })
    isComplated : boolean ;

    @ManyToOne(()=>User , (user)=>user.tasks)
    user : User ; 

    @Column({type:'date' , nullable : false })
    expire_time : Date ;

    @Column({type:'date' , default : new Date()})
    created_at : Date ;

    @Column({type:'date' , default : new Date()})
    updated_at : Date ;
}
