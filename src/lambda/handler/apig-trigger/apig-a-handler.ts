export const handler = async (event: any) => {
  console.log(`event: ${JSON.stringify(event)}`);

  console.log(`start a handler`);
  return "a";
};
