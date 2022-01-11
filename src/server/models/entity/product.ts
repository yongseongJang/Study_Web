import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductCategory } from ".";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  name!: string;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  price!: number;

  @Column({
    name: "sale_price",
    type: "int",
    nullable: false,
    default: 0,
  })
  salePrice!: number;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  image!: string;

  @Column({
    name: "stock_count",
    type: "int",
    nullable: false,
    default: 0,
  })
  stockCount!: number;

  @Column({
    name: "sell_count",
    type: "int",
    nullable: false,
    default: 0,
  })
  sellCount!: number;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategory?: ProductCategory[];
}