import axios from "axios";
import Cookies from "js-cookie";

export async function fetcher(url: string) {
  return (
    await axios.get(url, {
      headers: {
        token: Cookies.get("token"),
      },
    })
  ).data;
}
