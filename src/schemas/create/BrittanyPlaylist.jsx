import * as Yup from "yup";

export const brittanyplaylistcreate = Yup.object({
  url: Yup.string().required("Please enter url of the playlist."),
});
