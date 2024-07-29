export type ProductType = 'maize' | 'soybean' | 'others';
export type VarietyTypes = 'sm-15';
export type StatusTypes = 'due' | 'delayed' | 'approved';

export interface TransactionModel {
  waybillId: string;
  memberRId: string;
  productType: ProductType; 
  variety: VarietyTypes;
  dateProcessed: Date;
  status: StatusTypes;
}

export type PendingTransactionsModel = {
  data: TransactionModel[];
  numberOfRows?: number; 
};


// export interface ProductTypes = {
  
// }
