import * as Yup from "yup";

export const bloomingcreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter title of the post."),
});
