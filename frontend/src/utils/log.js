const log = (entity, message, error = false) => {
  if (process.env.NODE_ENV == null || process.env.NODE_ENV === "development") {
    const msg = `[${new Date().toISOString()}] ${entity} -> '${message}'`;
    if (!error) {
      console.log(msg);
    } else {
      console.error(msg);
    }
  }
};

export default log;
