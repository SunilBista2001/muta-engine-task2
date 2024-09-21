declare namespace AppOutput {
  interface ProductItem {
    _id: string;
    name: string;
    price: number | string;
    description: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
