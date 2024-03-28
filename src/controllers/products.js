import { validateProduct, validatePartialProduct } from "../schemas/products.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


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
      // Buscar el producto en la base de datos para obtener el nombre del archivo de imagen
      const product = await this.productsModel.findOne({ where: { idProd } });
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      const __dirname = dirname(fileURLToPath(import.meta.url));

      // Ruta del archivo de imagen en el servidor
      const filePath = path.resolve(__dirname, `../public/${product.nameImg}`);

      // Verificar si el archivo de imagen existe
      fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (!err) {
          // Eliminar el archivo de imagen del servidor
          fs.unlink(filePath, async (err) => {
            if (err) {
              return res.status(500).json({ mensaje: 'Error al eliminar el archivo' });
            }
            // Eliminar el producto de la base de datos después de eliminar el archivo
            await this.productsModel.destroy({ where: { idProd } });
            res.json({ mensaje: 'Producto y archivo eliminados correctamente' });
          });
        } else {
          // Si el archivo de imagen no existe, eliminar solo el producto de la base de datos
          await this.productsModel.destroy({ where: { idProd } });
          res.json({ mensaje: 'Producto eliminado correctamente' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }





  update = async (req, res) => {
    // const result = validatePartialService(req.body.service);
    // if (!result.success) {
    //   return res.status(404).json({ error: JSON.parse(result.error.message) });
    // }

    const idProd = req.params.id;
    try {
      const product = await this.productsModel.findOne({ where: { idProd } });
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      const __dirname = dirname(fileURLToPath(import.meta.url));
      const filePath = path.resolve(__dirname, `../public/${product.nameImg}`);





      fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (!err) {
          // Eliminar el archivo de imagen del servidor
          fs.unlink(filePath, async (err) => {
            if (err) {
              return res.status(500).json({ mensaje: 'Error al eliminar el archivo' });
            }
            // Actualizar el producto de la base de datos después de eliminar el archivo
            const uploadedFilename = req.file.filename;
            const updatedProduct = await this.productsModel.update(
              { nameProd: req.body.nameProd, price: req.body.price, nameImg: uploadedFilename, description: req.body.description },
              {
                where: {
                  idProd: idProd
                }
              });
            if (updatedProduct == 0) {
              return res.status(404).json({ message: "No se encontró el producto" });
            }
            res.json({ mensaje: 'Producto avtualizado y archivo eliminado correctamente' });
          });

          res.json({ message: "Producto actualizado" });
        } else {
          // Si el archivo de imagen no existe, actualizar solo el producto de la base de datos
          const uploadedFilename = req.file.filename;
          await this.productsModel.update(
            { nameProd: req.body.nameProd, price: req.body.price, nameImg: uploadedFilename, description: req.body.description },
            {
              where: {
                idProd: idProd
              }
            });
          res.json({ mensaje: 'Producto actualizado correctamente' });
        }
      });




      // const uploadedFilename = req.file.filename;
      // const updatedProduct = await this.productsModel.update(
      //   { nameProd: req.body.nameProd, price: req.body.price, nameImg: uploadedFilename, description: req.body.description },
      //   {
      //     where: {
      //       idProd: idProd
      //     }
      //   });
      // if (updatedProduct == 0) {
      //   return res.status(404).json({ message: "No se encontró el producto" });
      // }
      // res.json({ message: "Producto actualizado" });
    }
    catch (error) {
      res.status(400).json({ error: 'error actualizando el producto' })
    }

  }


}