const { Database } = require("../database");
const { ObjectId } = require("mongodb");

const { ProductsService } = require("../products/services");
const { UsersService } = require("../users/services");
const { SalesPipelines } = require("./pipelines");
const { Variables } = require("../common/variables");

const { SALES_COLLECTION } = Variables;

const getAll = async () => {
  const collection = await Database(SALES_COLLECTION);
  const sales = await collection.find({}).toArray();
  const salesInfo = [];
  if (sales && sales.length) {
    for (let i = 0; i < sales.length; i++) {
      console.log(sales[i]);
      const product = await ProductsService.getById(sales[i].productId);
      const user = await UsersService.getById(sales[i].userId);
      const saleInfo = {
        id: sales[i]._id,
        product: product.name,
        user: `${user.name} ${user.lastName}`,
        total: sales[i].total,
      };
      salesInfo.push(saleInfo);
    }
  }
  return salesInfo;
};

const getAllAggregate = async () => {
  const salesCollection = await Database(SALES_COLLECTION);
  // const productsCollection = await Database(
  //   ProductsService.PRODUCTS_COLLECTION
  // );
  // const usersCollection = await Database(UsersService.USERS_COLLECTION);
  // const response = usersCollection.aggregate(SalesPipelines.pipeline1);

  const response = salesCollection.aggregate(SalesPipelines.pipeline2);

  const sales = [];
  for await (const doc of response) {
    sales.push({
      id: doc._id,
      product: doc.product.name,
      user: `${doc.user.name} ${doc.user.lastName}`,
      quantity: doc.quantity,
      total: `$${doc.total}`,
    });
  }
  return sales;
};

const getById = async (id) => {
  const collection = await Database(SALES_COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (sale) => {
  const collection = await Database(SALES_COLLECTION);

  const product = await ProductsService.getById(sale.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (sale.quantity > product.quantity) {
    throw new Error("Product stock insufficient.");
  }

  const user = await UsersService.getById(sale.userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Record sale
  const newSale = {
    productId: ObjectId(sale.productId),
    userId: ObjectId(sale.userId),
    quantity: sale.quantity,
    total: sale.quantity * product.price,
  };

  console.log(newSale);

  const result = await collection.insertOne(newSale);

  // Decrease product quantity
  const updatedProduct = {
    ...product,
    quantity: product.quantity - sale.quantity,
  };
  console.log(updatedProduct);
  await ProductsService.update(sale.productId, updatedProduct);

  return result.insertedId;
};

const update = async (id, sale) => {
  const collection = await Database(SALES_COLLECTION);
  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: sale,
  };

  const result = await collection.updateOne(filter, updateDoc);
  const { matchedCount, modifiedCount } = result;
  return {
    matchedCount,
    modifiedCount,
  };
};

module.exports.SalesService = {
  getAll,
  getById,
  create,
  update,
  getAllAggregate,
};
