export class ProductsController {

  constructor({ productsModel }) {
    this.productsModel = productsModel
  }


  getAll = async (req, res) => {
    try {
      const products = await this.productsModel.findAll();
      res.json(products);
    }
    catch (error) {
      console.error(error)
    }
  }


}