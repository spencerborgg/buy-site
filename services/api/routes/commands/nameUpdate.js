export async function updateCreator(origianlCreator) {
  if (origianlCreator.firstName === "Benny")
    return {
      ...origianlCreator,
      firstName: "blah"
    };

  return origianlCreator;
}

// // module.exports = () => {
// //     console.log(getCreatorInfo)
// // }
