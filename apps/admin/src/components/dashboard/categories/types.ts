export interface SubCat {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  categoryId?: string;
}

export interface Cat {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  subCategories: SubCat[];
}

// Optional: re-export for convenience
export type Category = Cat;
export type Subcategory = SubCat;
