const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchFn = async (url, method, body, responseType = "json") => {
  const fullUrl = `${BASE_URL}${url}`;

  try {
    const res = await fetch(fullUrl, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }
    if (responseType === "blob") {
      return res; // return raw response
    }

    return await res.json(); // default
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};

export default fetchFn;
