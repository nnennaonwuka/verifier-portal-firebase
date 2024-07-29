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

export type ApproveTransactionDTO = {
  waybill_id: string;
  verifier_officer_id: string;
  unique_member_id: string;
  transaction_date: string;
  collection_center_id: string;
  variety: string;
  bags_received: number;
  total_weight?: number;
  // verifier_flag: number;
};


// export interface ProductTypes = {
  
// }
