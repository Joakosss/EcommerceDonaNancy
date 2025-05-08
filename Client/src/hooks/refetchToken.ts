import axios from "axios";

async function refetchToken(tokenRefetch: string) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/refesh", {
      refresh_token: tokenRefetch,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export default refetchToken;
