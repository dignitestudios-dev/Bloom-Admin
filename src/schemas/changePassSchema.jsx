import * as Yup from "yup";

export const changePassSchema = Yup.object({
  newPassword: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
