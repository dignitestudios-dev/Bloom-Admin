import * as Yup from "yup";

export const brittanyplaylistcreate = Yup.object({
  title: Yup.string()
    .min(3)
    .max(100)
    .required("Please enter title of the playlist."),
  description: Yup.string()
    .min(8)
    .required("Please enter description of the playlist."),
  appleMusicUrl: Yup.string()
    .url("Please enter a valid Apple Music URL.")
    .required("Please enter Apple Music URL."),
  spotifyUrl: Yup.string()
    .url("Please enter a valid Spotify URL.")
    .required("Please enter Spotify URL."),
  songs: Yup.array()
    .of(
      Yup.object({
        songName: Yup.string().required("Please enter song name."),
        artistName: Yup.string().required("Please enter artist name."),
        appleMusicUrl: Yup.string()
          .url("Please enter a valid Apple Music URL.")
          .required("Please enter Apple Music URL."),
        spotifyUrl: Yup.string()
          .url("Please enter a valid Spotify URL.")
          .required("Please enter Spotify URL."),
      })
    )
    .min(1, "Please add at least one song."),
});
