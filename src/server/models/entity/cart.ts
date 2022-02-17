import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User, Product } from ".";
import { ReadCartDto } from "../../dto";

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

  static from(
    user_id: number,
    product_id: number,
    option: string,
    quantity = 0,
  ) {
    const cart = new Cart();
    cart.user_id = user_id;
    cart.product_id = product_id;
    cart.option = option;
    cart.quantity = quantity;

    return cart;
  }

  public toDto() {
    return ReadCartDto.from(
      this.product_id,
      this.option,
      this.quantity,
      this.product,
    );
  }
}
