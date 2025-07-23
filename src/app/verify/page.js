'use client';

import { Suspense } from 'react';
import VerifyContent from './VerifyContent';

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading verification...</p>}>
      <VerifyContent />
    </Suspense>
  );
}
