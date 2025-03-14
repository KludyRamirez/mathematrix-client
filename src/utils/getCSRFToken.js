import axios from "axios";

export const getCSRFToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/utils/csrf-token`,
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};
