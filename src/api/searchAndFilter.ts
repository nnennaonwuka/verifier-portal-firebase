import { Axios } from 'src/api/axios';

// Mock data (replace with your data)

const mockData: any[] = [
  {
    waybillId: 'mySearchData',
    memberRId: 'MR001',
    productType: 'Type A',
    variety: 'Variety X',
    processingDate: '2023-09-04',
  },
  {
    waybillId: 'WB002',
    memberRId: 'MR002',
    productType: 'Type B',
    variety: 'Variety Y',
    processingDate: '2023-09-01',
  },
  {
    waybillId: 'WB003',
    memberRId: 'MR003',
    productType: 'Type A',
    variety: 'Variety Z',
    processingDate: '2023-09-02',
  },
  {
    waybillId: 'WB004',
    memberRId: 'MR004',
    productType: 'Type C',
    variety: 'Variety X',
    processingDate: '2023-09-09',
  },
  {
    waybillId: 'WB001',
    memberRId: 'MR001',
    productType: 'Type A',
    variety: 'Variety X',
    processingDate: '2023-09-09',
  },
  {
    waybillId: 'WB002',
    memberRId: 'MR002',
    productType: 'Type B',
    variety: 'Variety Y',
    processingDate: '2023-09-08',
  },
  {
    waybillId: 'WB003',
    memberRId: 'MR003',
    productType: 'Type A',
    variety: 'Variety Z',
    processingDate: '2023-09-06',
  },

  // Add more items as needed
];

// Mock function for search
const mockSearch = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Filter data based on the query (case-insensitive)

  return {
    
    data: mockData,
  };
};

// Mock function for filter
const mockFilter = async (productType: string, variety?: string) => {
  mockData[0].memberRId = "Filter"
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter data based on productType and optional variety

  return {
    data: mockData,
  };
};

// Actual API endpoint for search (using query parameter)
const search = async (mode: string, query: string,pageNumber:number) => {
  let endpoint: string;

  if (!query){
    const response = await Axios.get(
      `/pending-transactions/scaler/all?page=${pageNumber}`
    );
    return response.data
  }
  switch (mode) {
    case 'receiver':
      endpoint = 'receiver';
      break;
    case 'scaler':
      endpoint = 'scaler';
      break;
    case 'allTransactions':
      endpoint = 'all-transaction';
      break;
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }

  const response = await Axios.get(
    `/pending-transactions/${endpoint}/find?search=${query}&page=${pageNumber}`
  );
  return response.data;
};

// Actual API endpoint for filter (using productType and optional variety)
const filter = async (mode: string, productType: string, pageNumber: number, variety?: string) => {
  let endpoint: string;

  if (!productType){
    const response = await Axios.get(
      `/pending-transactions/scaler/all?page=${pageNumber}`
    );
    return response.data
  }
  switch (mode) {
    case 'receiver':
      endpoint = 'receiver';
      break;
    case 'scaler':
      endpoint = 'scaler';
      break;
    case 'allTransactions':
      endpoint = 'all-transaction';
      break;
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
  let url = `/pending-transactions/${endpoint}/filter?product=${productType}&page=${pageNumber}`
  if (variety){
    url = url +  `&variety=${variety}`
  }
  const response = await Axios.get(
    url
  );
  return response.data;
};

export { mockSearch, search, mockFilter, filter };
