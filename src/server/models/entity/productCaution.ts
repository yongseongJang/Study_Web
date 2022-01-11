import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from ".";

@Entity()
export class ProductCaution {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    name: "caution_order",
    type: "int",
    nullable: false,
    default: 0,
  })
  cautionOrder!: number;

  @Column({
    name: "caution",
    type: "varchar",
    nullable: false,
    default: "",
  })
  caution!: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
