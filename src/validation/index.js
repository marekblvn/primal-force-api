async function validate(validationSchema, subject, error) {
  try {
    await validationSchema.validateAsync(subject);
  } catch (err) {
    const validationMsg = err.details[0].message;
    throw new error(validationMsg);
  }
}

module.exports = validate;
