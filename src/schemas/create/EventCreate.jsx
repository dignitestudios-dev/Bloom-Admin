import * as Yup from "yup";

export const eventscreate = Yup.object({
  title: Yup.string().min(3).max(30).required("Please enter title of event."),
  description: Yup.string()
    .min(8)
    .required("Please enter description of the event."),
  streetAddress: Yup.string().required("Please enter street address"),
  city: Yup.string().required("Please enter city."),
  state: Yup.string().required("Please enter state."),
});
