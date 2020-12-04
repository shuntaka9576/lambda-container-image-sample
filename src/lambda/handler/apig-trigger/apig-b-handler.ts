export const handler = async (event: any) => {
  console.log(`event: ${JSON.stringify(event)}`);

  console.log(`start b handler`);
  return "b";
};
