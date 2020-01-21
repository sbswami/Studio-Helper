export async function findMatchedFiles(allPhotosList, selectedPhotosList) {
  if (allPhotosList.length === 0 || selectedPhotosList.length === 0) { return []; }
  let fileList = [];
  await allPhotosList.forEach(item1 => {
    let Item1 = item1.substring(0, item1.lastIndexOf('.'));
    selectedPhotosList.forEach(item2 => {
      let Item2 = item2.substring(0, item2.lastIndexOf('.'));
      if (Item1 === Item2) {
        fileList.push(item1);
      }
    });
  });
  return fileList;
}


export function spreadIt(){
  let obj = {};
  for(let object of arguments) {
    for(let key in object){
      obj[key] = object[key];
    }
  }
  return obj;
}