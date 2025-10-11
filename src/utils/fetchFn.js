const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchFn = async (url, method, body) => {
  const fullUrl = `${BASE_URL}${url}`;
  try {
    const res = await fetch(fullUrl, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch links", err);
  }
};

export default fetchFn;
