const { Variables } = require("../common/variables");

const { PRODUCTS_COLLECTION, SALES_COLLECTION, USERS_COLLECTION } = Variables;

const pipeline1 = [
  {
    $lookup: {
      from: SALES_COLLECTION,
      localField: "_id",
      foreignField: "userId",
      as: "userSale",
    },
  },
  {
    $unwind: {
      path: "$userSale",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: PRODUCTS_COLLECTION,
      localField: "userSale.productId",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: false,
    },
  },
];

const pipeline2 = [
  {
    $lookup: {
      from: USERS_COLLECTION,
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: {
      path: "$user",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: PRODUCTS_COLLECTION,
      localField: "productId",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: false,
    },
  },
];

module.exports.SalesPipelines = {
  pipeline1,
  pipeline2,
};
