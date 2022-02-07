import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User, Product } from ".";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({
    name: "quantity",
    type: "int",
    nullable: false,
    default: 0,
  })
  quantity!: number;

  @Column({
    name: "option",
    type: "varchar",
    nullable: false,
    default: "",
  })
  option!: string;

  @Column({
    name: "user_id",
    type: "number",
    nullable: false,
  })
  user_id!: number;

  @Column({
    name: "product_id",
    type: "number",
    nullable: false,
  })
  product_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "_id",
  })
  user!: User;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
