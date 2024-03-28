import { validateProduct, validatePartialProduct } from "../schemas/products.js";


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

  create = async (req, res) => {
    // const result = validateProduct(req.body)
    // if (!result.success) {
    //   return res.status(404).json({ error: JSON.parse(result.error.message) });
    // }
    try {
      const uploadedFilename = req.file.filename;
      const newProduct = await this.productsModel.create({ nameProd: req.body.nameProd, nameImg: uploadedFilename, price: req.body.price, description: req.body.description });
      res.status(201).json(newProduct);
    }
    catch (error) {
      res.send(error)
    }

  }



  delete = async (req, res) => {

    const idProd = req.params.id;
    try {
      const result = await this.productsModel.destroy({
        where: {
          idProd: idProd
        }
      });
      if (result == 0) {
        return res.status(404).json({ message: "No se encontró el producto" });
      }
      res.json({ message: "Producto eliminado" });
    }
    catch (error) {
      res.status(400).json({ error: 'error eliminando el producto' })
    }


  }





  update = async (req, res) => {
    // const result = validatePartialProduct(req.body)
    // if (!result.success) {
    //   return res.status(404).json({ error: JSON.parse(result.error.message) });
    // }

    try {

    }
    catch (error) {
      res.send(error)
    }

  }


}