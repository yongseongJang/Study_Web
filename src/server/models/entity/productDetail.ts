import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from ".";

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    name: "detail_order",
    type: "int",
    nullable: false,
    default: 0,
  })
  detailOrder!: number;

  @Column({
    name: "detail",
    type: "varchar",
    nullable: false,
    default: "",
  })
  detail!: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
