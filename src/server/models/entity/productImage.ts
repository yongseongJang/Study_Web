import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from ".";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    name: "image_order",
    type: "int",
    nullable: false,
    default: 0,
  })
  imageOrder!: number;

  @Column({
    name: "file_name",
    type: "varchar",
    nullable: false,
    default: "",
  })
  fileName!: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
