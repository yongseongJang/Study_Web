import { EntityRepository, Repository } from "typeorm";
import Errorhandler from "../../utils/error";

@EntityRepository()
class ProductRepository {}

export default ProductRepository;
