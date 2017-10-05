const mongoose = require('mongoose');

const db = require('./Schema');

const dbModel = {};

Object.keys(db).forEach(Model => {
  // Combine schemas
  const SchemaEntries = db[Model].reduce((r, e) => ({ ...r, ...e.Schema }), {})
  // Create new mongoose schema from result
  const ModelSchema = new mongoose.Schema(SchemaEntries);

  db[Model].forEach(e => {
    // Run hook setters
    e.Hooks(ModelSchema)
    // Run method setters
    e.Methods(ModelSchema)
  });

  dbModel[Model] = mongoose.model(Model, ModelSchema)
});

module.exports = dbModel;