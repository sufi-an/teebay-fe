
// takes list of categoris and returns concatinated strings
export const getCategoryString =(categoryList)=>{
  if( !categoryList){
    return ""
  }
    let categories = ''
    categoryList.forEach(element => {
        categories += element.name+', '
      });
      categories = categories.substring(0, categories.length - 2);
      return categories
}