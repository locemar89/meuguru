import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Exclude, Expose } from "class-transformer";
  
  @Entity("users")
  class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column("varchar")
    name: string;
  
    @Column("varchar")
    email: string;
  
    @Column("varchar")
    @Exclude({ toPlainOnly: true })
    password: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default User;
  