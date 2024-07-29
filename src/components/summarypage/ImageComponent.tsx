import React,{useState} from 'react';
import BetterLife from 'src/assets/images/BetterLife.png';
import ZoomIn from 'src/assets/images/zoomIn.png';
import ZoomOut from 'src/assets/images/zoomOut.png';

// type ImageComponentTypes=()=>{

// }

interface ImageComponentProps {
  listOfImages: string[];
}

const ImageComponent: React.FC<ImageComponentProps> = ({ listOfImages }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoom(1)
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Dismiss the modal when clicking outside of the image
    if (e.target === e.currentTarget) {
      closeModal();
      setZoom(1)
    }
  };

  const zoomIn = () => {
    if (zoom < 4) {
      setZoom(zoom + 0.1);
    }
  };

  const zoomOut = () => {
    if (zoom > 0.2) {
      setZoom(zoom - 0.1);
    }
  };

  return (
    <div className='flex w-[700px] h-[400px] ml-4 mt-5'>
      {listOfImages.map((imageUrl, index) => (
        <div
          className='border-2 border-gray-400 bg-cover bg-center ml-5 cursor-pointer'
          style={{ width: '200px', height: '280px', backgroundImage: `url(${imageUrl})` }}
          key={index}
          onClick={() => openModal(imageUrl)}
        ></div>
      ))}

      {selectedImage && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'
          onClick={handleModalClick}
        >
          <div className='max-w-3/4 my-10 p-4'>
          <img
              // src={selectedImage}
              src = {selectedImage}
              alt='Selected'
              className='w-full'
              style={{ transform: `scale(${zoom})` }}
            />
             <div className='bg-white w-[150px] mx-auto my-0 absolute bottom-20 left-0 right-0 rounded-2 items-center text-center justify-center'>
              <button onClick={zoomIn} className='text-white mr-2 px-2'>
                <img src={ZoomIn} alt="" width={30} height={30}/>
              </button>
              <button onClick={zoomOut} className='text-white ml-7 px-2'>
              <img src={ZoomOut} alt="" width={30} height={30}/>
              </button>
            </div>
            <div className='absolute top-0 right-0 m-4 text-white'>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent
