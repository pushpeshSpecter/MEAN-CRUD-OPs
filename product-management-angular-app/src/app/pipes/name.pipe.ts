import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(productsList: any, searchText: any) {
    let updatedProductsList: any;

    if (searchText)
      updatedProductsList = productsList.filter(product =>
        product.productName.toLowerCase()
          .startsWith(searchText.toLowerCase()));
    else
      updatedProductsList = productsList;

    return updatedProductsList;
  }

}
