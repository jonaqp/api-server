const mongoose = require('mongoose');
const GlobalSchema = require('./Schema');
module.exports = Object.keys(GlobalSchema).reduce((DB, Model) => {
  const SchemaEntries = GlobalSchema[Model].reduce((r, e) => ({ ...r, ...e.Schema }), {})
  const ModelSchema = new mongoose.Schema(SchemaEntries);
  GlobalSchema[Model].forEach(e => {
    e.Hooks(ModelSchema)
    e.Methods(ModelSchema)
  });
  DB[Model] = mongoose.model(Model, ModelSchema)
  return DB
}, {});