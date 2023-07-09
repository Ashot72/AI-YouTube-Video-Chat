export const validateYouTubeUrl = (urlToParse) => {
    if (urlToParse) {
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (urlToParse.match(regExp)) {
            return true;
        }
    }
    return false;
}

export const extractVideoId = (url) => {
   const urlParams = new URLSearchParams(new URL(url).search)
   return urlParams.get("v")
}

export const embedUrl = (url) => {
  const videoId = extractVideoId(url)
  return "https://www.youtube.com/embed/" + videoId
}