import { Axios } from 'src/api/axios';
import { PendingTransactionsModel } from 'src/redux/pending-transactions/types';
import { ApproveTransactionDTO } from 'src/redux/pending-transactions/types';

const mockPendingTransactions = [
  {
    hsf_id: 'HSF_ID_1',
    unique_member_id: 'Unique_ID_1',
    product_type: 'Product Type A',
    variety: 'Variety X',
    transaction_date: 'Transaction Date 2023-09-04',
    type: 'receiver',
  },
  {
    hsf_id: 'HSF_ID_2',
    unique_member_id: 'Unique_ID_2',
    product_type: 'Product Type B',
    variety: 'Variety Y',
    transaction_date: 'Transaction Date 2023-09-01',
    type: 'all-transactions',
  },
  {
    hsf_id: 'HSF_ID_3',
    unique_member_id: 'Unique_ID_3',
    product_type: 'Product Type A',
    variety: 'Variety Z',
    transaction_date: 'Transaction Date 2023-09-02',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_4',
    unique_member_id: 'Unique_ID_4',
    product_type: 'Product Type C',
    variety: 'Variety X',
    transaction_date: 'Transaction Date 2023-09-09',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_5',
    unique_member_id: 'Unique_ID_5',
    product_type: 'Product Type A',
    variety: 'Variety X',
    transaction_date: 'Transaction Date 2023-09-09',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_6',
    unique_member_id: 'Unique_ID_6',
    product_type: 'Product Type B',
    variety: 'Variety Y',
    transaction_date: 'Transaction Date 2023-09-08',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_7',
    unique_member_id: 'Unique_ID_7',
    product_type: 'Product Type A',
    variety: 'Variety Z',
    transaction_date: 'Transaction Date 2023-09-06',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_8',
    unique_member_id: 'Unique_ID_8',
    product_type: 'Product Type C',
    variety: 'Variety X',
    transaction_date: 'Transaction Date 2023-09-07',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_9',
    unique_member_id: 'Unique_ID_9',
    product_type: 'Product Type A',
    variety: 'Variety X',
    transaction_date: 'Transaction Date 2023-09-01',
    is_approved: false,
    type: 'scaler',
  },
  {
    hsf_id: 'HSF_ID_10',
    unique_member_id: 'Unique_ID_10',
    product_type: 'Product Type B',
    variety: 'Variety Y',
    transaction_date: 'Transaction Date 2023-09-05',
    is_approved: false,
    type: 'scaler',
  },

  // Add more items as needed
];

const mockTransactionSummary: any = {
  receiver: {
    WaybillId: '123',
    MemberRId: '456',
    ProductType: 'Type A',
    Variety: 'Variety X',
    ProcessingDate: '2023-09-08',
    CollectionCenter: 'Center 1',
    TotalWeightDifference: '10 kg',
    TotalBagNumber: '20',
  },
  checker: {
    WaybillId: '123',
    MemberRId: '456',
    ProductType: 'Type A',
    Variety: 'Variety X',
    ProcessingDate: '2023-09-09',
    CollectionCenter: 'Center 2',
    TotalWeightDifference: '5 kg',
    TotalBagNumber: '15',
  },

  // Add more data entries as needed
};

const mockGetPendingTransactionsReceiving = async (pageNumber: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a successful login response
  return {
    data: mockPendingTransactions,
  };
};

const getPendingTransactions = async (mode: string, pageNumber: number) => {
  if (mode === 'scaler') {
    const { data } = await Axios.get(
      `/pending-transactions/scaler/all?page=${pageNumber}`
    );
    return data;
  } else {
    const { data } = await Axios.get(
      `/pending-transactions/scaler/all?page=${pageNumber}`
    );
    return data;
  }
};

const mockGetTransactionByID = async (id?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a successful login response
  return {
    data: mockTransactionSummary,
  };
};

const getTransactionByID = async (mode: string, id: string | undefined) => {
  if (mode === 'receiver') {
    let url = `/pending-transactions/receiver/summary/${id}`;

    const { data } = await Axios.get(url);
    return data.data;
  } else {
    let url = `/pending-transactions/scaler/summary/${id}`;
    const { data } = await Axios.get(url);
    return data.data;
  }
};

export const fetchData = async (
  type: string,
  mode: string,
  query: string,
  productType: string,
  variety: string | undefined,
  pageNumber: number
) => {
  if (!query && !productType) {
    // Handle the case when neither query nor productType is provided

    const url =
      type === 'pending-transactions'
        ? `/${type}/${mode}/all?page=${pageNumber}`
        : `/${type}?page=${pageNumber}`;

    const response = await Axios.get(url);
    if (mode === 'receiver') {
      return [response.data.data.receiverData, response.data.data.totalCount];
    } else if (mode === 'scaler' && type === 'pending-transactions') {
      return [response.data.data.scalerData, response.data.data.totalCount];
    }
    return [response.data.data.transactionsData, response.data.data.totalCount];
  }
  const params: string[] = [];
  let url =
    type === 'pending-transactions'
      ? `/${type}/${mode}?page=${pageNumber}`
      : `/${type}?page=${pageNumber}`;
  if (query) {
    params.push(`search=${query}`);
  }
  if (productType) {
    params.push(`product=${productType}`);
    if (variety) {
      params.push(`variety=${variety}`);
    }
  }
  url = type === 'pending-transactions' ? `/${type}/${mode}/` : `/${type}/`;

  if (params.length > 0) {
    url += `filter?${params.join('&')}`;
  }
  url += `&page=${pageNumber}`;

  const response = await Axios.get(url);

  return [response.data.data.filteredData, response.data.data.totalCount];
};

const getAllTransaction = async () => {
  const { data } = await Axios.get(`/all-transactions`);
  return data.topics.docs;
};

type VerifierTransactionDTO = '';

//fix up
const submitVerifierTransaction = async (payload: VerifierTransactionDTO) => {
  const { data } = await Axios.post(`/pending-transactions`);

  return data;
};

const approveTransaction = async (
  payload: ApproveTransactionDTO,
  mode: string
) => {
  let url = `/pending-transactions/${mode}/approve`;
  const { data }: any = await Axios.post(url, payload);
  return data;
};

export const pendingTransactions = {
  getAllTransaction,
  getPendingTransactions,
  getTransactionByID,
  submitVerifierTransaction,
  approveTransaction,
  mockGetPendingTransactionsReceiving,
  mockGetTransactionByID,
  fetchData,
};
