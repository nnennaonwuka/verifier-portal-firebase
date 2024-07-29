import React, { useEffect, useState } from 'react';
import DashboardLayout from 'src/layout/dashboard';
import { useParams, useNavigate } from 'react-router-dom';
import ImageComponent from 'src/components/summarypage/ImageComponent';
import Modal from 'src/components/summarypage/Modal';
import ModalApprove from 'src/components/summarypage/ModalApprove';
import MultiModal from 'src/components/summarypage/MultiModal';
import { useSelector } from 'react-redux';
import { userAuthInfo, userToken } from 'src/redux/user/reducer';
import {
  useGetTransactionSummary,
  useApproveTransaction,
} from 'src/redux/pending-transactions/hooks';
import Pencil from 'src/assets/images/ei_pencil.svg';
import VerifierModal from 'src/components/summarypage/VerifierModal';
import { set } from 'react-hook-form';

export const fieldMapping: any = {
  waybillid: 'Waybill Id',
  memberrid: 'MemberRId',
  producttype: 'Product Type',
  variety: 'Variety',
  processingdate: 'Processing Date',
  collectioncenter: 'Collection Center',
  totalbagnumber: 'Total Bag Number',
  totalweightdifference: 'Total Weight Difference',
};

function SummaryPage({ type }: any) {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [reasonMode, setReasonMode] = useState(false);
  const [alertReason, setAlertReason] = useState(false);
  const [alertApproval, setAlertApproval] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const user = useSelector(userAuthInfo);
  const navigate = useNavigate();
  const [flagged, setFlagged] = useState(1);
  const [editReason, setEditReason] = useState<any>({});
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [editPencilMode, setEditPencilMode] = useState(false);
  const [reasonType, setReasonType] = useState("main");

  const [currentEdit, setCurrentEdit] = useState<any>('');
  const [currentTemp, setCurrentTemp] = useState<any>('');
  const [dataType, setDataType] = useState<any>('');
  const [currentKey, setCurrentKey] = useState<any>('');
  const [currentVerifierKey, setCurrentVerifierKey] = useState<any>('');
  const [currentOtherData, setCurrentOtherData] = useState<any>('');
  const [currentCheckerData, setCurrentCheckerData] = useState<any>('');
  const [verifierModalOpen, setVerifierModalOpen] = useState(false);
  const { data: pendingTransaction, isLoading: pendingTransactionLoading } =
    useGetTransactionSummary(type, id || undefined);
  const { mutateAsync: approveTransaction, isLoading } =
    useApproveTransaction(type);

  const generateVerifierData = () => {
    if (!pendingTransaction) {
      return { verifier: {} }; // Return an empty object when pendingTransaction is not available
    }
    if (!pendingTransaction?.checkerData) {
      return { verifier: {} };
    }
    // if (pendingTransaction?.verifierData ){
    //   console.log(pendingTransaction,"Here")
    //   return {verifier: pendingTransaction?.verifierData}
    // }
    if (pendingTransaction.receiverData) {
      setDataType("receiver")
      pendingTransaction.operatorData = pendingTransaction.receiverData;
      delete pendingTransaction.receiverData;
    }
    // Rename scalerData to operatorData if it exists
    if (pendingTransaction.scalerData) {
      setDataType("scaler")
      pendingTransaction.operatorData = pendingTransaction.scalerData;
      delete pendingTransaction.scalerData;
    }
    if (!pendingTransaction?.operatorData) {
      return { verifier: {} };
    }
    const verifierData = { verifier: { ...pendingTransaction?.checkerData } }; // Start with Checker's data
    // Compare Receiver and Checker data for differences
    for (const key in pendingTransaction.operatorData) {
      const isDifferent =
        pendingTransaction.operatorData[key] !==
        pendingTransaction.checkerData[key];
      const verifierValue = pendingTransaction.verifierData
        ? pendingTransaction.verifierData[key]
        : null;
      const valueToUse =
        verifierValue !== null
          ? verifierValue
          : pendingTransaction.checkerData[key];
      const editable = isDifferent ? true : false;

      verifierData['verifier'][key] = {
        value: valueToUse,
        editable: editable,
      };
    }
    return verifierData;
  };

  const [initialVerifierData, setInitialVerifierData] = useState<any>(
    generateVerifierData()
  );

  useEffect(() => {
    if (pendingTransaction) {
      const newInitialVerifierData = generateVerifierData();
      setInitialVerifierData(newInitialVerifierData);
    }
  }, [pendingTransaction]);

  const handleEdit = () => {
    if (editMode) {
      // If already in edit mode, reset verifierData to its original state
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const onCloseReason = () => {
    if(reasonType === "main"){
      setInitialVerifierData(currentEdit);
    }
    if (reasonType === "alternative"){
     setInitialVerifierData(currentTemp)
    }
    setReasonMode(false);
    setCurrentEdit('');
    setCurrentKey('');
    // Set edit mode after submitting the reason
  };

  const handleReasonConfirm = () => {
    setAlertReason(false);
    setReasonMode(true);
    // Set edit mode after submitting the reason
  };

  const handleEditReasonSubmit = (reason: any) => {
    if (!reason) {
      setReasonMode(false);
      setAlertReason(true);
    } else {
      const key = currentKey;

      // Check if the key already exists in editReason
      if (editReason.hasOwnProperty(key)) {
        // Key exists, replace its value
        setEditReason((prevEditReason: any) => ({
          ...prevEditReason,
          [key]: reason,
        }));
      } else {
        // Key doesn't exist, add it to editReason
        setEditReason((prevEditReason: any) => ({
          ...prevEditReason,
          [key]: reason,
        }));
      }
      setCurrentKey('');
      setReasonMode(false);
    }
    // Set edit mode after submitting the reason
  };

  const handleApprove = () => {
    // Handle approve logic...
    setApproveModalOpen(true);
  };

  function convertData(inputData: any) {
    const outputData = {
      waybill_id: inputData.verifier?.waybillid?.value,
      verifier_officer_id: user.staff_id,
      unique_member_id: inputData.verifier?.memberrid?.value,
      product_type: inputData.verifier?.producttype?.value,
      transaction_date: inputData.verifier?.processingdate?.value,
      collection_center_id: inputData.verifier?.collectioncenter?.value,
      variety: inputData.verifier?.variety?.value,
      bags_received: inputData.verifier?.totalbagnumber?.value,
      total_weight: inputData.verifier?.totalweightdifference?.value,
      comment: inputData.reason,
      verifier_flag: inputData.verifier_flag,
    };

    return outputData;
  }

  const handleFlag = () => {
    setFlagModalOpen(true);
  };
  const handleFlagConfirm = (flaggedValue: any) => {
    // Handle approve confirmation...
    setFlagModalOpen(false);
    setAlertFlag(true);
    setFlagged(0);
    // Check if editReason exists
    const updatedVerifierData = editReason
      ? {
          ...initialVerifierData,
          reason: JSON.stringify(editReason),
          verifier_flag: flaggedValue,
        }
      : {
          ...initialVerifierData,
          verifier_flag: flaggedValue,
        };

    let verifier = convertData(updatedVerifierData);

    // Call approveTransaction with the updatedVerifierData

    approveTransaction(verifier);
  };

  const handleApproveConfirm = () => {
    // Handle approve confirmation...
    setApproveModalOpen(false);
    setAlertApproval(true);
    // Check if editReason exists
    const updatedVerifierData = editReason
      ? {
          ...initialVerifierData,
          reason: JSON.stringify(editReason),
          verifier_flag: flagged,
        }
      : {
          ...initialVerifierData,
          verifier_flag: flagged,
        };

    let verifier = convertData(updatedVerifierData);

    // Call approveTransaction with the updatedVerifierData

    approveTransaction(verifier);
  };

  const handleAlertConfirm = () => {
    // Handle approve confirmation...
    setAlertApproval(false);
    if (user.role === 'Admin') {
      navigate(`/all-transactions`);
    } else {
      navigate(`/pending-transaction/${type}`);
    }
  };

  const listOfImages = pendingTransaction?.imageData?.map(
    (image: any) => image?.imageUrl
  );

  function handleBack(): any {
    // You can use the window.history to navigate back to the previous page
    window.history.back();
  }
  const MyTable = () => {
    const [verifierData, setVerifierData] = useState(initialVerifierData);
    let [editPencilMode, setEditPencilMode] = useState<any>([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    const toggleEditPencilMode = (index: any) => {
      setEditPencilMode((prevModes: any) => {
        const newModes = [...prevModes]; // Create a copy of the state array
        newModes[index] = !newModes[index]; // Toggle the editPencilMode for the specific index
        return newModes; // Return the new array to trigger a re-render
      });
    };

    const decideVerifierLogic= (index:any,key:any)=>{
      if(user.role === "Admin"){
        toggleEditPencilMode(index)
      }
      else{
        setCurrentVerifierKey(key)
        setCurrentCheckerData(pendingTransaction.checkerData[key])
        setCurrentOtherData(pendingTransaction.operatorData[key])
        setVerifierModalOpen(true)
      }
    }
    const submitModalVerifier=(value:any)=>{
      setCurrentTemp(initialVerifierData);
      setInitialVerifierData((prevData: any) => ({
        ...prevData,
        verifier: {
          ...prevData.verifier,
          [currentVerifierKey]: { value, editable: true }, // Update the value in verifierData
        },

      }));
      setCurrentKey(currentVerifierKey);
      setReasonType("alternative")
      setReasonMode(true)
      // setVerifierData(initialVerifierData)
      
      setVerifierModalOpen(false)
      
      setCurrentCheckerData("")
      setCurrentOtherData("")
    }
    const handleEditPencilClick = (index: any, key: any) => {
      // Toggle edit mode
      setEditPencilMode((prevEditPencilMode: any) => {
        const newEditPencilMode = [...prevEditPencilMode];
        newEditPencilMode[index] = !newEditPencilMode[index];
        return newEditPencilMode;
      });

      // Set initial data
      const initialValue = initialVerifierData['verifier'][key].value;
      setCurrentKey(key);
      setCurrentEdit(initialVerifierData);
      setInitialVerifierData(verifierData);

      // Check if there's a difference between initial and changed value
      const changedValue = verifierData['verifier'][key].value;
      // const initialValue = initialVerifierData['verifier'][key].value;
      if (changedValue !== initialValue) {
        setReasonMode(true);
      } else {
        setReasonMode(false);
      }
    };
    useEffect(() => {
      // Update verifierData whenever initialVerifierData changes
      setVerifierData(initialVerifierData);
    }, []);

    if (pendingTransactionLoading) {
      return <div>Loading...</div>;
    } else if (!pendingTransaction) {
      return <div>No data availabe.</div>;
    }
    if (Object.keys(verifierData.verifier).length === 0) {
      return <div>No data available.</div>;
    } else {
      const handleSave = () => {
        setInitialVerifierData(verifierData);
        setEditMode(false);
      };

      const roles = [`${type}`, 'checker', 'verifier'];
      const handleVerifierChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        key: string
      ) => {
        if (editMode) {
          const { value } = event.target;
          setVerifierData((prevData: any) => ({
            ...prevData,
            verifier: {
              ...prevData.verifier,
              [key]: { value, editable: true }, // Update the value in verifierData
            },
          }));
        }
      };
      return (
        <div className='w-full'>
          <table className='w-full border-1 ml-4 '>
            <thead className='font-feather'>
              <tr>
                <th className='py-4 px-4 border-b border-gray-300'></th>
                {roles.map((role) => (
                  <th
                    key={role}
                    className='py-4 px-4 border-b border-gray-300 text-start'
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(pendingTransaction.operatorData).map(
                (key, index) => (
                  <tr key={key} className='border-b border-gray-300'>
                    <td className='font-semibold text-start pl-2'>
                      {fieldMapping[key]}
                    </td>
                    <td className='py-4 px-4 text-start'>
                      {pendingTransaction.operatorData[key]}
                    </td>
                    <td className='py-4 px-4 text-start'>
                      {pendingTransaction.checkerData[key]}
                    </td>
                    <td className='py-4 px-4 text-start'>
                      {editMode && verifierData['verifier'][key].editable ? (
                        <div className='flex w-full'>
                          {editPencilMode[index] && user.role ==="Admin" ? (
                            <div className='flex w-full justify-between'>
                              <input
                                className='flex bg-transparent rounded-md px-2 border-[#666666] border-2 border-opacity-10'
                                key={key}
                                type='text'
                                name={key}
                                value={verifierData['verifier'][key].value}
                                onChange={(e) => handleVerifierChange(e, key)}
                                onBlur={() => {
                                  handleEditPencilClick(index, key);
                                }} // Set Reason Mode on blur
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditPencilClick(index, key);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  handleEditPencilClick(index, key);
                                }}
                              >
                                <img src={Pencil} alt='' />
                              </button>
                            </div>
                          ) : (
                            <div className='flex w-full justify-between'>
                              <p>{verifierData['verifier'][key].value}</p>
                              <button
                                onClick={() => decideVerifierLogic(index,key)}
                                className=''
                              >
                                <img src={Pencil} alt='' />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        verifierData['verifier'][key].value
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {user.role !== 'Admin' && (
            <div className='w-full flex justify-end'>
              <button
                onClick={handleFlag}
                className=' flex mt-4 bg-[#FF4B4B] text-white py-3 px-4 rounded-md  hover:bg-[#802d2d] font-semibold cursor-pointer'
              >
                Flag
              </button>
            </div>
          )}
          <div className='w-full'>
            <ImageComponent listOfImages={listOfImages} />
          </div>
          <VerifierModal
            currentVerifierKey = {currentVerifierKey}
            isOpen={verifierModalOpen}
            onSubmit={submitModalVerifier}
            dataType={dataType}
            otherData = {currentOtherData}
            checkerData = {currentCheckerData}
            Flag = {handleFlag}
          />
          {editMode && (
            <div className='mt-4  mb-[60px]'>
              <button
                onClick={handleSave}
                className='ml-2 bg-[#F8DF3F] font-semibold rounded-md text-black py-3 px-4 hover:bg-[#84782e]'
              >
                {' '}
                Save
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <DashboardLayout>
      <div className=' flex-col bg-[#F7F8F4] w-full'>
        <div className='flex justify-between mt-[70px] mr-[30px]'>
          <button
            onClick={handleBack}
            className=' bg-[#FF4B4B] text-white py-3 px-4 rounded-md  hover:bg-[#802d2d] flex font-semibold  ml-4  '
          >
            Back
          </button>
          <div className='flex'>
            <button
              onClick={handleEdit}
              className='bg-[#F8DF3F] font-semibold rounded-md text-black py-3 px-4 hover:bg-[#84782e]'
            >
              Edit
            </button>
            <button
              onClick={handleApprove}
              className='bg-green-500 font-semibold p-3 text-white hover:bg-green-700 ml-3'
            >
              Approve
            </button>
          </div>

          <Modal
            isOpen={reasonMode}
            onClose={() => onCloseReason()}
            onSubmit={handleEditReasonSubmit}
            title='Edit Transaction'
          >
            <p>What is your reason for edit?</p>
          </Modal>

          <ModalApprove
            isOpen={approveModalOpen}
            onClose={() => setApproveModalOpen(false)}
            onSubmit={handleApproveConfirm}
            title='Confirm Approval'
          >
            <p>Are you sure you want to approve this transaction?</p>
          </ModalApprove>
          <MultiModal
            isOpen={alertReason}
            onSubmit={() => handleReasonConfirm()}
            type='reason'
          ></MultiModal>

          <MultiModal
            isOpen={alertApproval}
            onClose={() => setAlertApproval(false)}
            onSubmit={() => handleAlertConfirm()}
            type='approve'
          />
          <MultiModal
            isOpen={alertFlag}
            onClose={() => setAlertFlag(false)}
            onSubmit={() => handleAlertConfirm()}
            type='flag'
          />

          <ModalApprove
            isOpen={flagModalOpen}
            onClose={() => setFlagModalOpen(false)}
            onSubmit={() => handleFlagConfirm(0)}
            title='Confirm Flag'
          >
            <p>Are you sure you want to flag this transaction?</p>
          </ModalApprove>
        </div>
        <div className='flex flex-col mt-[20px]'>
          <div className='flex items-center'>
            <span className='text-[24px] font-bold ml-3 font-feather'>
              Transaction Summary
            </span>
          </div>
          <div className='w-[90%] mt-3  mb-[30px]'>
            <MyTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SummaryPage;
