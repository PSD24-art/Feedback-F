const withLoader = async (fn, setLoading) => {
  setLoading(true);
  try {
    await fn();
  } catch (err) {
    console.error("withLoader error:", err);
  } finally {
    setLoading(false);
  }
};

export default withLoader;
