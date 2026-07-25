const fs = require('fs');
const path = require('path');

const models = ['Service', 'Project', 'CaseStudy', 'Testimonial', 'Blog', 'TeamMember', 'FAQ'];
const baseDir = '/home/niloy/Personal/Techflect/Backend';

models.forEach(model => {
  const modelLower = model.charAt(0).toLowerCase() + model.slice(1);
  const controllerCode = 
    "const " + model + " = require('../models/" + model + "');\n\n" +
    "const get" + model + "s = async (req, res) => {\n" +
    "  const items = await " + model + ".find();\n" +
    "  res.status(200).json(items);\n" +
    "};\n\n" +
    "const get" + model + "ById = async (req, res) => {\n" +
    "  const item = await " + model + ".findById(req.params.id);\n" +
    "  if (!item) { res.status(404); throw new Error('" + model + " not found'); }\n" +
    "  res.status(200).json(item);\n" +
    "};\n\n" +
    "const create" + model + " = async (req, res) => {\n" +
    "  const item = await " + model + ".create(req.body);\n" +
    "  res.status(201).json(item);\n" +
    "};\n\n" +
    "const update" + model + " = async (req, res) => {\n" +
    "  const item = await " + model + ".findByIdAndUpdate(req.params.id, req.body, { new: true });\n" +
    "  if (!item) { res.status(404); throw new Error('" + model + " not found'); }\n" +
    "  res.status(200).json(item);\n" +
    "};\n\n" +
    "const delete" + model + " = async (req, res) => {\n" +
    "  const item = await " + model + ".findById(req.params.id);\n" +
    "  if (!item) { res.status(404); throw new Error('" + model + " not found'); }\n" +
    "  await item.deleteOne();\n" +
    "  res.status(200).json({ id: req.params.id });\n" +
    "};\n\n" +
    "module.exports = { get" + model + "s, get" + model + "ById, create" + model + ", update" + model + ", delete" + model + " };\n";
    
  fs.writeFileSync(path.join(baseDir, 'src/controllers', modelLower + 'Controller.js'), controllerCode);

  const routeCode = 
    "const express = require('express');\n" +
    "const router = express.Router();\n" +
    "const { get" + model + "s, get" + model + "ById, create" + model + ", update" + model + ", delete" + model + " } = require('../controllers/" + modelLower + "Controller');\n" +
    "const { protect } = require('../middleware/authMiddleware');\n\n" +
    "router.route('/')\n" +
    "  .get(get" + model + "s)\n" +
    "  .post(protect, create" + model + ");\n\n" +
    "router.route('/:id')\n" +
    "  .get(get" + model + "ById)\n" +
    "  .put(protect, update" + model + ")\n" +
    "  .delete(protect, delete" + model + ");\n\n" +
    "module.exports = router;\n";
    
  fs.writeFileSync(path.join(baseDir, 'src/routes', modelLower + 'Routes.js'), routeCode);
});

console.log("Controllers and Routes generated successfully.");
