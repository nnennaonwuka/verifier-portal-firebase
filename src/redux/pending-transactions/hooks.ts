import { PendingTransactionsModel } from './types';
import { queryClient } from './../../index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowAlert } from 'src/providers/toast';
import { pendingTransactions,fetchData } from '../../api/pending-transactions';
import { ApproveTransactionDTO } from './types';
import { Axios } from 'src/api/axios';
import { store} from "src/redux/index"

export function useCustomQuery(
  type: string,
  mode: string,
  query: string,
  productType: string,
  variety: string | undefined,
  pageNumber: number
) {
  const { data, isLoading } = useQuery(
    ['customQuery',type, mode, query, productType, variety, pageNumber],
    () => 
    fetchData(type,mode, query, productType, variety, pageNumber),
    {
      staleTime: 3 * 60 * 1000,
    } // 3 minutes in milliseconds
    
    
  );

  return { data, isLoading };
  //  return useQuery(['pending-transaction',pageNumber,mode,query,productType,variety,pageNumber], () => pendingTransactions.mockGetPendingTransactionsReceiving(pageNumber));
}


export function useGetPendingTransactions(mode:string,pageNumber:number) {
  // return useQuery(['pending-transaction',pageNumber,mode], () => pendingTransactions.mockGetPendingTransactionsReceiving(pageNumber)); //comment this
  return useQuery(['pending-transaction',pageNumber,mode], () => pendingTransactions.getPendingTransactions(mode,pageNumber));
}


export function useGetTransactionSummary(mode:string,id?:string) {
  // return useQuery(['transaction-summary',id,mode], () => pendingTransactions.mockGetTransactionByID(id)); //comment this
  return useQuery(['transaction-summary',id,mode], () => pendingTransactions.getTransactionByID(mode,id)); ; 
}

export function useApproveTransaction(mode:string) {
  return useMutation(
    (payload: ApproveTransactionDTO) => {
      return pendingTransactions.approveTransaction(payload,mode); 
      // return user.mockLogin(payload); //comment this line 
    },
    {
      onSuccess: (response, variables, context) => {
        //set Users
        queryClient.invalidateQueries(['customQuery']);
        queryClient.invalidateQueries(['transaction-summary']);

      },
    }
  );
}


// export function useUpdateTopic() {
//   return useMutation(
//     ({ contentId, appropriate }: any) => {
//       return topic.updateTopic(contentId, appropriate);
//     },
//     {
//       onSuccess: (response, variables, context) => {
//         queryClient.invalidateQueries(['topics']);

//         ShowAlert({ type: 'success', message: 'Success' });
//       },
//     },
//   );
// }

// export function useCreateAppTopic() {
//   return useMutation(
//     (payload: any) => {
//       return topic.createAppTopic(payload);
//     },
//     {
//       onSuccess: (response, variables, context) => {
//         // queryClient.invalidateQueries(['flagged-topics']);
//         ShowAlert({ type: 'success', message: 'Topic created Successfully' });
//       },
//     },
//   );
// }

// export function useGetTopicComments(type: string) {
//   return useQuery(['topic-comments', type], () => topic.getTopicComments(type));
// }

// export function useUpdateTopicComment() {
//   return useMutation(
//     ({ contentId, appropriate }: any) => {
//       return topic.updateTopicComment(contentId, appropriate);
//     },
//     {
//       onSuccess: (response, variables, context) => {
//         queryClient.invalidateQueries(['topic-comments']);

//         ShowAlert({ type: 'success', message: 'Success' });
//       },
//     },
//   );
// }
