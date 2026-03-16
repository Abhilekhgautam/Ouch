import axios from "axios";

const API_URL = "http://localhost:5000";

export const generateSlides = async (prompt) => {
  const res = await axios.post(`${API_URL}/api/generate-slides`, { prompt });
  return res.data; // { html: "...", slideData: [...] }
};

export const exportSlides = async (slideData, format) => {
  const res = await axios.post(
    `${API_URL}/api/export`,
    { slideData, format },
    {
      responseType: "blob",
    },
  );

  // Create download link
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `presentation.${format}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
