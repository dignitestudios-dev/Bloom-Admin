import * as Yup from "yup";

export const enrichmentcreate = Yup.object({
  videoUrl: Yup.string().min(3).max(30).required("Please enter video url."),
});
