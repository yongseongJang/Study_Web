import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductCategory } from ".";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  name: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productCategory: ProductCategory[];

  constructor(name: string, productCategory: ProductCategory[]) {
    this.name = name;
    this.productCategory = productCategory;
  }
}
