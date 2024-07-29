
import { search,mockFilter,mockSearch,filter } from '../../api/searchAndFilter';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useFilter(mode:string,productType:string,pageNumber:number,variety?:string) {
  // return useQuery(['filter',pageNumber,mode], () => mockFilter(productType,variety)); //comment this
  return useQuery(['filter',pageNumber,mode,productType,variety], () => filter(mode,productType,pageNumber,variety)); //uncomment this
}

export function useSearch(mode:string,query:string,pageNumber:number) {
  // return useQuery(['search',query,mode], () => mockSearch(query)); //comment this
  return useQuery(['search',pageNumber,mode,query], () => search(mode,query,pageNumber));
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
