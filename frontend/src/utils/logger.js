const Logger = (entity, message, error = false) => {
  if (process.env.NODE_ENV == null || process.env.NODE_ENV === "development") {
    const msg = `${entity} -> '${message}'`;
    if (!error) {
      console.log(msg);
    } else {
      console.error(msg);
    }
  }
};

export default Logger;
