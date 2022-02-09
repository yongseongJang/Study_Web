import { ProductRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import { Pagination as IPagination } from "../interfaces";
import { ProductDto, ProductDetailDto } from "../dto";
import { Product } from "../models/entity";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    const connection = getConnection();
    this.productRepository = connection.getCustomRepository(ProductRepository);
  }

  public async readAllProduct(page: number): Promise<ProductDto> {
    try {
      const productCount = await this.productRepository.countAllProduct();

      const pagination = this.paginate(productCount, page);

      const paginatedProduct = await this.productRepository.readAllProduct(
        pagination.startIndex,
        pagination.endIndex - pagination.startIndex + 1,
      );

      const productDto = this.productEntitiesToDto(paginatedProduct);

      return { pagination, paginatedProduct: productDto };
    } catch (err) {
      throw err;
    }
  }

  public async readProductByCategory(
    category: string,
    page: number,
  ): Promise<ProductDto> {
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

      const productDto = this.productEntitiesToDto(paginatedProduct);

      return { pagination, paginatedProduct: productDto };
    } catch (err) {
      throw err;
    }
  }

  public async readProductById(
    _id: string,
  ): Promise<ProductDetailDto | undefined> {
    try {
      const id = Number(_id);

      const product = await this.productRepository.readProductById(id);

      return product ? product.toDto() : undefined;
    } catch (err) {
      throw err;
    }
  }

  private paginate = (
    totalItemCount: number,
    currentPage = 1,
    pageItemCount = 12,
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

  private productEntitiesToDto(entities: Product[]): ProductDetailDto[] {
    return entities.map((entity) => {
      return entity.toDto();
    });
  }
}

export default ProductService;
