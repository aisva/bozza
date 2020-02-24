import { format as formatDate, parseISO } from "date-fns";

const format = date => {
  return formatDate(parseISO(date), "MM/dd/yyyy");
};

const toDate = date => {
  return parseISO(date);
};

const dateUtils = {
  format,
  toDate
};

export default dateUtils;
