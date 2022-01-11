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
  name: string;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  sale_price: number;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  image: string;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  stock_count: number;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  sell_count: number;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategory: ProductCategory[];

  constructor(
    name: string,
    price: number,
    sale_price: number,
    image: string,
    stock_count: number,
    sell_count: number,
    productCategory: ProductCategory[],
  ) {
    this.name = name;
    this.price = price;
    this.sale_price = sale_price;
    this.image = image;
    this.stock_count = stock_count;
    this.sell_count = sell_count;
    this.productCategory = productCategory;
  }
}
