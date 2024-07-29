import { PendingTransactionsModel } from './types';
import { queryClient } from './../../index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowAlert } from 'src/providers/toast';
import { pendingTransactions } from '../../api/pending-transactions';

export function useGetPendingTransactions() {
  return useQuery(['pending-transaction'], () => pendingTransactions.getAllTransaction());
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
