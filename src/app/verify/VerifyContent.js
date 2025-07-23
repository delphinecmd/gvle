'use client';

import { useEffect, useState } from 'react';
import { applyActionCode, getAuth } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (!searchParams) return;

    const auth = getAuth();
    const oobCode = searchParams.get('oobCode');

    if (!oobCode) {
      setStatus('Invalid verification link.');
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setStatus('✅ Email verified! You can now log in.');
      })
      .catch(() => {
        setStatus('❌ Verification failed. Link may be expired or invalid.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <h1 className="text-xl font-semibold">{status}</h1>
    </div>
  );
}
