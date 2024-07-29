import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <React.Fragment>
      <div className='flex flex-row min-h-screen'>{children}</div>
    </React.Fragment>
  );
}

export default AuthLayout;
