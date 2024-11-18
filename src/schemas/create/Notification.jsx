import * as Yup from "yup";

export const notificationcreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(75)
    .required("Please enter title of the notification."),
  message: Yup.string()
    .min(3)
    .max(200)
    .required("Please enter message of the notification."),
});
