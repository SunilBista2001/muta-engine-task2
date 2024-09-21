declare namespace SchemaInput {
  interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface ProductDocument {
    _id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
