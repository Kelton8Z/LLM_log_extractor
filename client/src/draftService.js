import http from "./http";

class DraftService {
  generate() {
    let formData = new FormData();
    // let model = "gpt-3.5-turbo-1106";
    // formData.append("model", model);
    // formData.append("file", file);

    // return http.post("https://api.openai.com/v1/threads", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${OPENAI_KEY}`
    //   },
    //   onUploadProgress,
    // });
    return http.post("/draft")
  }
}

export default new DraftService()