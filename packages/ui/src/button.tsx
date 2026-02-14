'use client';

import { ReactNode } from 'react';
import { Button as ManButton } from '@mantine/core';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <ManButton variant="filled" onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </ManButton>
  );
};

