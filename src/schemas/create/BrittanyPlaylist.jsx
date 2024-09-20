import * as Yup from "yup";

export const brittanyplaylistcreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter title of the song."),
  singerName: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter name of the singer."),
  description: Yup.string()
    .min(8)
    .required("Please enter description of the song."),
});
