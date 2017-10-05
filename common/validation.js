module.exports = {
  // accepts an object of fields
  requireFields: (fields) => {
    // iterates through the field keys
      // ensures the value is not blank
        // if the value is blank, throw error
        // error message: fieldKeys are requird
    Object.keys(fields).forEach(key => {
      if (!fields[key]) {
        throw new Error(`${Object.keys(fields).join(', ')} are required`)
      }
    }) 
  }
}