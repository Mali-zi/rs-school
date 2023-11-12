export const getData = async (url: string) => {
  return fetch(url).then((res) => {
    return res.json();
  });
};
