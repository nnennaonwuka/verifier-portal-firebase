import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Generic from './genereric';
import { useSelector } from 'react-redux'; // Import useSelector
import { userAuthInfo } from 'src/redux/user/reducer';

function AllTransactions() {
  const user = useSelector(userAuthInfo); // Assuming you have imported userAuthInfo

  // Determine the mode based on the user's role
  const mode = user && user.role === 'Admin' ? 'admin' : 'scaler';

  return (
    <div className='flex mt-3 flex-col'>
      <>
        {/* Pass the determined mode as a prop to the Generic component */}
        <Generic mode={mode} type="all-transactions" />
      </>
    </div>
  );
}

export default AllTransactions;
