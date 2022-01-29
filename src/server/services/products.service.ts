import { ProductRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import { Product as IProduct, Pagination as IPagination } from "../interfaces";
import ErrorHandler from "../utils/error";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    const connection = getConnection();
    this.productRepository = connection.getCustomRepository(ProductRepository);
  }

  public async readAllProduct(
    page: number,
  ): Promise<{ pagination: object; paginatedProduct: IProduct[] }> {
    try {
      const productCount = await this.productRepository.countAllProduct();

      const pagination = this.paginate(productCount, page);

      const paginatedProduct = await this.productRepository.readAllProduct(
        pagination.startIndex,
        pagination.endIndex - pagination.startIndex + 1,
      );

      return { pagination, paginatedProduct };
    } catch (err) {
      throw err;
    }
  }

  public async readProductByCategory(
    category: string,
    page: number,
  ): Promise<{ pagination: object; paginatedProduct: IProduct[] }> {
    try {
      const productCount = await this.productRepository.countProductByCategory(
        category,
      );

      const pagination = this.paginate(productCount, page);

      const paginatedProduct =
        await this.productRepository.readProductByCategory(
          category,
          pagination.startIndex,
          pagination.endIndex - pagination.startIndex + 1,
        );

      return { pagination, paginatedProduct };
    } catch (err) {
      throw err;
    }
  }

  public async readProductById(
    _id: string,
  ): Promise<{ product: object | undefined }> {
    try {
      const id = Number(_id);

      const product = await this.productRepository.readProductById(id);

      return { product };
    } catch (err) {
      throw err;
    }
  }

  private paginate = (
    totalItemCount: number,
    currentPage = 1,
    pageItemCount = 16,
    pageInterval = 5,
  ): IPagination => {
    const totalPage = Math.ceil(totalItemCount / pageItemCount);

    let startPage, endPage;
    if (totalPage < pageInterval) {
      startPage = 1;
      endPage = totalPage;
    } else {
      const pageCountBeforeCurrentPage = Math.floor(pageInterval / 2);
      const pageCountAfterCurrentPage = Math.ceil(pageInterval / 2) - 1;
      if (currentPage <= pageCountBeforeCurrentPage) {
        startPage = 1;
        endPage = pageInterval;
      } else if (currentPage + pageCountAfterCurrentPage >= totalPage) {
        startPage = totalPage - pageInterval + 1;
        endPage = totalPage;
      } else {
        startPage = currentPage - pageCountBeforeCurrentPage;
        endPage = currentPage + pageCountAfterCurrentPage;
      }
    }

    const startIndex = (currentPage - 1) * pageItemCount;
    const endIndex = Math.min(
      startIndex + pageItemCount - 1,
      totalItemCount - 1,
    );

    return {
      totalPage,
      startPage,
      endPage,
      currentPage,
      startIndex,
      endIndex,
    };
  };
}

export default ProductService;
