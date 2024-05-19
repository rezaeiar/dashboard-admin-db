import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import * as bcrypt from 'bcrypt';
import { Order } from "src/order/entities/order.entity";
import { Task } from "src/task/entities/task.entity";

@Entity({name : "User"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column({type : 'varchar' , default : null})
    avatar : string ; 

    @Column({type : 'varchar'})
    first_name : string ; 

    @Column({type : 'varchar'})
    last_name : string ; 

    @Column({type : 'varchar' , nullable : false})
    email : string ;

    @Column({type : 'varchar' , nullable : false , unique : true})
    username : string ; 

    @Column({type : 'varchar' , nullable : false})
    password : string ; 

    @Column({type : 'enum' , enum : Role , array : true , default : [Role.DEFAULT]})
    roles : Role[] ; 

    @Column({type : 'varchar' , nullable : true})
    home_phone_number : string;
    
    @Column({type : 'varchar' , nullable : true})
    phone_number : string ; 

    @Column({type : 'varchar', nullable : true})
    address : string ;

    @Column({type : 'varchar' , nullable : true})
    country : string ;
    
    @Column({type : 'varchar' , nullable : true})
    city : string ; 

    @Column({type : 'varchar' , nullable : true})
    postal_code: string ;

    @Column({type : 'varchar' , nullable : true})
    note : string ; 

    @Column({type : 'date' , default : new Date()})
    created_at: Date; 

    @Column({type : 'int' , default : 0 })
    order_count : number ; 

    @Column({type : 'int' , default : 0 })
    purchase_amount:number;

    @OneToMany(()=>Order , (order)=>order.user)
    orders : Order[] ;

    @OneToMany(()=>Task , (task)=>task.user)
    tasks : Task[] ;
}