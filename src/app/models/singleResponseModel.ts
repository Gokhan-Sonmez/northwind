import { ResponseModel } from "./responseModel";

export interface SingleResponeModel<T> extends ResponseModel{
 data:T
}