export const parseResponse = async (res) => {
  const contentType = res.headers.get("Content-Type");

  if (contentType === "application/json") {
    return res.json();
  }

  return res.text();
};
