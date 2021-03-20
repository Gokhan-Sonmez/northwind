import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  categories:Category[];
  productAddForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private categoriesService:CategoryService,
    private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
    this.getCategories();
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  createProductAddForm(){
this.productAddForm = this.formBuilder.group({
  categoryId:["",Validators.required],
  productName:["",Validators.required], 
  unitsInStock:["",Validators.required],
  unitPrice:["",Validators.required], 

})
  }

  add(){
    if(this.productAddForm.valid){
      let productModel =Object.assign({},this.productAddForm.value) 
      productModel.categoryId= parseInt(productModel.categoryId.toString())
      this.productService.add(productModel).subscribe(response=>{
     
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {

            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulma Hatası")
            
          }
        }
      })
      
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")

    }



  }

}
