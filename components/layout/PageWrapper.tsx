import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="p-6 bg-background text-foreground flex-grow">
      {children}
    </main>
  );
};

export default PageWrapper;
