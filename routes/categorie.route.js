const express = require('express');
const router = express.Router();
const Categorie = require("../models/categorie")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');




router.post('/', verifyToken,authorizeRoles("admin",), async (req, res) => {
   // const nomcategorie=req.body.nomcategorie
   //const imagecategorie=req.body.imagecategorie
   // const { nomcategorie, imagecategorie} = req.body;
   const newCategorie = new Categorie(req.body)
   try {
      await newCategorie.save();
      res.status(200).json(newCategorie);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
});

router.get('/', async (req, res) => {
   try {
      const cat = await Categorie.find({}, null, { sort: { '_id': -1 } })

      res.status(200).json(cat);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
});
router.get('/:categorieId', async (req, res) => {
   try {
      const cat = await Categorie.findById(req.params.categorieId);

      res.status(200).json(cat);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
});
router.delete('/:categorieId', async (req, res) => {
   try {
      const id = req.params.categorieId;
      await Categorie.findByIdAndDelete(id);
      res.json({ message: "categorie deleted successfully." });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
});
router.put('/:categorieId', async (req, res) => {
   try {
      const cat1 = await Categorie.findByIdAndUpdate(
         req.params.categorieId,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(cat1);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
});

module.exports = router;
