import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Generic from './genereric';
// import { tags } from 'src/api/tags';

function TopicTab() {
  useEffect(() => {
    // tags.getTags().then((response: any) => {
    //     let interestData = JSON.parse(JSON.stringify(response.data));
    //     setAllInterests(interestData);
    // });
  }, []);
  return (
    <div className='flex mt-3 flex-col'>
      <>
        <Generic mode='receiver' type='pending-transactions' />
      </>
    </div>
  );
}

export default TopicTab;
