import * as Yup from "yup";

export const bookscreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter title of the book."),
  author: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter author of the book."),
  price: Yup.number("Price must contain numbers not alphabets.").required(
    "Please enter price of the book."
  ),
  description: Yup.string()
    .min(8)
    .required("Please enter description of the book."),
});
