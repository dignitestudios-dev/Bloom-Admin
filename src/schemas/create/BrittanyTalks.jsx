import * as Yup from "yup";

export const brittanytalkscreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter title of the post."),
  description: Yup.string()
    .min(8)
    .required("Please enter description of the psot."),
});
