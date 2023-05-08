export const useRandomString = (length = 6) => {
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength: number = characters.length;
  let result: string = "";

  while (result.length !== length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
