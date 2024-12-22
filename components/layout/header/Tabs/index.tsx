import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

interface TabProps {
  value: string;
  route: string;
}

const Tab = ({ value, route }: TabProps) => {
  return (
    <Button asChild variant={'ghost'}>
      <Link href={`/${route}`}>{value}</Link>
    </Button>
  );
};

export default Tab;
