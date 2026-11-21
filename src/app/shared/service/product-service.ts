import { Service, signal } from '@angular/core';
import { Iproduct } from '../model/Iproduct';
import { Observable, of, single, Subject } from 'rxjs';
import { Ires } from '../model/Ires';

@Service()
export class ProductService {
  productData: Iproduct[] = [
    {
      productId: 1,
      name: 'Samsung Galaxy S24',
      category: 'ELECTRONIC',
      price: '75000',
      expYear: 2028,
      isAvailable: true,
    },
    {
      productId: 2,
      name: 'Amul Butter',
      category: 'FOOD',
      price: '250',
      expYear: 2027,
      isAvailable: true,
    },
    {
      productId: 3,
      name: 'Nike Air Max',
      category: 'FOOTWARE',
      price: '6500',
      expYear: 2029,
      isAvailable: false,
    },
  ];
  products = signal<Iproduct[]>(this.productData);
  emitObj$ =  new Subject<Iproduct>();
  emitUpdateObj = this.emitObj$.asObservable();

  fetchAll(): Observable<Iproduct[]> {
    return of(this.productData);
  }

  addProduct(productObj: Iproduct): Observable<Ires<Iproduct>> {
    this.productData.unshift(productObj);
    this.products.set([...this.productData]);
    return of({
      msg: `New product with id ${productObj.productId} is added successfully..!`,
      data: productObj,
    });
  }


  emitEditObj(obj : Iproduct){
   this.emitObj$.next(obj);
  }

  updateProduct(updateObj : Iproduct){
    let GETINDEX = this.productData.findIndex(obj => obj.productId === updateObj.productId);
    this.productData[GETINDEX] = updateObj;
    this.products.update((dataArray) => dataArray.map( (product) => product.productId === updateObj.productId  ? updateObj : product));
    return of({
      msg : `The product with id ${updateObj.productId} is updated successfully...!`,
      data : updateObj
    })
  }


  removeProduct(removeId : number){
    let GETINDEX = this.productData.findIndex(p => p.productId === removeId);
    let removedObj = this.productData.splice(GETINDEX,1);
    this.products.set([...this.productData]);
    return of({
      msg : `The product with id ${removeId} is removed successfully..!`,
      data : removedObj
    })

  }
}
