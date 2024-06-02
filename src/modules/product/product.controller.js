import Product from "../../../DB/models/product.model.js";
import User from "../../../DB/models/user.model.js";

export const createProduct = async (req, res) => {
  try {
    const { title, price, UserId } = req.body;
    const product = await Product.create({
      title,
      price,
      UserId,
    });
    res.json({ message: "Product Created", product });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // as option for key alias
    const products = await Product.findAll({
      where: { price: 500 },
      include: [
        { model: User, attributes: ["name", "email"], where: { name: "John" } },
      ],
      limit: 1, // paination
      offset: 2,
    });
    res.json({ products });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};


//  deploy database on clever cloud