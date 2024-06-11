export default function validation (values){
    const errors = {};

    if (!values.name) {
      errors.name = "Please enter product name";
    }
  
    if (!values.old_price) {
      errors.old_price = "Please enter old price";
    }
  
    if (!values.new_price) {
      errors.new_price = "Please enter new price";
    }
  
    if (!values.category) {
      errors.category = "Please enter category";
    }
  
    if (!values.image) {
      errors.image = "Please upload product photo";
    }
  
    return errors;
  }
