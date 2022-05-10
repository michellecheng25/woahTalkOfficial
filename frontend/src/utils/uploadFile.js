import axios from "axios";
const uploadFile = async (base64EncodedImage, token) => {
  console.log(base64EncodedImage);
  try {
    const response = await axios.post(
      "/api/uploads",
      JSON.stringify({ data: base64EncodedImage }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return;
  }
};

export default uploadFile;
