import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product, Category } from ".";

@Entity({ name: "product_category" })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  _id?: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product: Product;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "_id",
  })
  category: Category;

  constructor(product: Product, category: Category) {
    this.product = product;
    this.category = category;
  }
}
