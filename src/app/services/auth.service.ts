import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';
import { SingleResponeModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44313/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<SingleResponeModel<TokenModel>> {
    return this.httpClient.post<SingleResponeModel<TokenModel>>(this.apiUrl + 'login', loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }
}
