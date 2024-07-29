import React from 'react';

// Define the AvatarProps type
type AvatarProps = {
  imageUrl: string;
  name: string;
  role: string;
};

const AvaterComponent: React.FC<AvatarProps> = ({ imageUrl, name, role }) => {
  return (
    <div className='flex items-center'>
      <div className='w-16 h-16 rounded-full overflow-hidden mr-4'>
        <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
      </div>
      <div className='text-left'>
        <p className='font-bold'>{name.split('@')[0]}</p>
        <p className='text-sm text-gray-500'>{role}</p>
      </div>
    </div>
  );
};

export default AvaterComponent;
