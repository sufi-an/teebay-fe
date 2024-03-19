

export const getCategoryString =(categoryList)=>{
    let categories = ''
    categoryList.forEach(element => {
        categories += element.name+', '
      });
      categories = categories.substring(0, categories.length - 2);
      return categories
}