import Image from 'next/image';
import React from 'react';

interface LanguageIconProps {
  src: string;
  alt: string;
  className?: string;
}

const LanguageIcon: React.FC<LanguageIconProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '1/1' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100%"
        style={{ objectFit: 'contain' }}
        unoptimized
      />
    </div>
  );
};

export default LanguageIcon;
