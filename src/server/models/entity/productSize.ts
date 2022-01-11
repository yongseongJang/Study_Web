import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from ".";

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    name: "size_order",
    type: "int",
    nullable: false,
    default: 0,
  })
  sizeOrder!: number;

  @Column({
    name: "size",
    type: "varchar",
    nullable: false,
    default: "",
  })
  size!: string;

  @Column({
    name: "measurement",
    type: "varchar",
    nullable: false,
    default: "",
  })
  measurement!: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
