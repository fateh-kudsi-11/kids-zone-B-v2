import { TProduct } from "../models/Product";
import { filterElTypes } from "../types/product";

export default (data: TProduct[]) => {
  const filterEl: filterElTypes = {
    productType: [],
    brands: [],
    colors: [],
    sizes: [],
    price: {
      maxPrice: 0,
      minPrice: 0,
    },
  };
  const allPrice: number[] = [];
  data.forEach((el) => {
    const allColors: string[] = [];
    const allSizes: string[] = [];

    el.colors.map((singleColor) => {
      allColors.push(singleColor.colorName);
    });
    el.size.map((singleSize) => {
      allSizes.push(singleSize);
    });

    allPrice.push(el.price as number);

    allSizes.forEach((size) => {
      const isSizeEx = filterEl.sizes.findIndex(
        (sizeEx) => sizeEx.title === size
      );
      isSizeEx === -1
        ? filterEl.sizes.push({ title: size, count: 1 })
        : filterEl.sizes[isSizeEx].count++;
    });

    allColors.forEach((color) => {
      const isColorEx = filterEl.colors.findIndex(
        (colorEx) => colorEx.title === color
      );
      isColorEx === -1
        ? filterEl.colors.push({ title: color, count: 1 })
        : filterEl.colors[isColorEx].count++;
    });

    const productTypeAndCategory = `${el.category}-${el.productType}`;

    const productTypeEx = filterEl.productType.findIndex(
      (x) => x.title === productTypeAndCategory
    );

    productTypeEx === -1
      ? filterEl.productType.push({ title: productTypeAndCategory, count: 1 })
      : filterEl.productType[productTypeEx].count++;

    const brand = filterEl.brands.findIndex((x) => x.title === el.brand);

    brand === -1
      ? filterEl.brands.push({ title: el.brand, count: 1 })
      : filterEl.brands[brand].count++;
  });
  filterEl.price.maxPrice = allPrice.reduce((a, b) => Math.max(a, b));
  filterEl.price.minPrice = allPrice.reduce((a, b) => Math.min(a, b));
  return filterEl;
};
