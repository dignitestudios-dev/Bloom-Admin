import * as Yup from "yup";

export const heyyoucreate = Yup.object({
  imagecontent: Yup.string().required("Please enter title of the post."),
  quote: Yup.string().required("Please enter title of the post."),
  about: Yup.string().min(8).required("Please enter about details."),
});
