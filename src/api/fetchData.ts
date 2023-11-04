export default async function fetchData(url: string) {
  const response = await fetch(url).then((response) => response.json());
  const resData = await response;
  return resData;
}
