import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Generic from './genereric';
// import { tags } from 'src/api/tags';

function ScalingTab() {
  // const [contentMediaData, setContentMediaData] = useState<any>(null);
  // const [generalTopicsData, setGeneralTopicsData] = useState<any>(null);
  // const [topicsWithMostComments, setTopicsMostComments] = useState<any>([]);
  // const [topicsWithMostLikes, setTopicsMostLikes] = useState<any>([]);
  // const [topicTagData, setTopicTagData] = useState<any>(null);

  // const { data: topicAnalytics, isLoading } = useGetTopicAnalytics();
  // const [allInterests, setAllInterests] = useState<IInterest[]>([]);

  useEffect(() => {
    // tags.getTags().then((response: any) => {
    //     let interestData = JSON.parse(JSON.stringify(response.data));
    //     setAllInterests(interestData);
    // });
  }, []);

  // const findInterestNameById = (id: string) => {
  //   const name = allInterests.find((item) => {
  //     return item._id == id;
  //   });

  //   if (!name) {
  //     return id;
  //   }

  //   return name?.name;
  // };

  return (
    <div className='flex mt-3 flex-col'>
      <>
        {/* Section 1 */}
        <Generic mode="scaler" type="pending-transactions"/>
      </>
    </div>
  );
}

export default ScalingTab;
