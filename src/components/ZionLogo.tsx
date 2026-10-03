import React from 'react';

interface ZionLogoProps {
  className?: string;
  size?: number;
}

export const ZionLogo: React.FC<ZionLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="하남 시온성교회 심볼마크"
    >
      <defs>
        {/* Person Gradient: Lime to Deep Green */}
        <linearGradient id="zionPersonGrad" x1="60" y1="280" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8E622" />
          <stop offset="25%" stopColor="#84CC16" />
          <stop offset="65%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Head Gradient */}
        <linearGradient id="zionHeadGrad" x1="90" y1="80" x2="150" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>

        {/* Waves Gradient: Cyan to Royal/Deep Blue */}
        <linearGradient id="zionWaveGrad" x1="120" y1="200" x2="380" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="25%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="85%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* Star Gradient: Deep Violet to Purple */}
        <linearGradient id="zionStarGrad" x1="220" y1="60" x2="350" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="50%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Star Gleam Radial */}
        <radialGradient id="zionStarGleam" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="45%" stopColor="#E9D5FF" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#A855F7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>

        {/* Heart Gradient: Magenta/Rose to Radiant Pink */}
        <linearGradient id="zionHeartGrad" x1="300" y1="150" x2="420" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BE185D" />
          <stop offset="35%" stopColor="#DB2777" />
          <stop offset="70%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>

        {/* Heart Inner Glow */}
        <radialGradient id="zionHeartHighlight" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#F472B6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#BE185D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Green Person Figure (Worshiper) */}
      {/* Head */}
      <circle cx="120" cy="100" r="32" fill="url(#zionHeadGrad)" />
      {/* Body & Sweeping Arm */}
      <path
        d="M62 98 C65 140, 48 205, 78 255 C98 288, 125 292, 142 278 C120 252, 105 210, 112 158 C135 152, 185 152, 230 162 C265 170, 270 178, 260 168 C225 148, 180 142, 142 144 C128 144, 98 128, 62 98 Z"
        fill="url(#zionPersonGrad)"
      />

      {/* 2. Blue Living Water Waves */}
      <path
        d="M85 285 C145 295, 172 260, 178 200 C178 185, 168 180, 155 186 C135 198, 120 225, 118 250 C110 280, 92 284, 85 285 Z"
        fill="#38BDF8"
        opacity="0.9"
      />
      <path
        d="M85 285 C115 282, 140 262, 162 215 C195 182, 240 172, 282 195 C250 220, 215 260, 185 290 C155 320, 130 350, 85 285 Z"
        fill="url(#zionWaveGrad)"
      />
      <path
        d="M88 288 C125 390, 230 440, 318 410 C368 392, 400 355, 415 315 C390 348, 345 385, 290 395 C205 410, 135 370, 88 288 Z"
        fill="url(#zionWaveGrad)"
      />
      <path
        d="M165 215 C215 175, 285 200, 320 260 C355 315, 385 305, 415 315 C392 370, 335 415, 260 415 C185 415, 125 375, 88 288 C135 320, 160 270, 165 215 Z"
        fill="url(#zionWaveGrad)"
      />

      {/* 3. Violet/Purple Four-Pointed Radiant Star */}
      <path
        d="M272 52 C285 85, 305 105, 345 115 C310 128, 295 150, 292 188 C280 152, 260 135, 228 122 C260 110, 270 85, 272 52 Z"
        fill="url(#zionStarGrad)"
      />
      {/* Radiant Gleam at center of star */}
      <circle cx="295" cy="118" r="28" fill="url(#zionStarGleam)" />
      <circle cx="295" cy="118" r="7" fill="#FFFFFF" opacity="0.95" />

      {/* 4. Warm Magenta/Pink Heart */}
      <path
        d="M335 152 C362 132, 405 138, 424 168 C445 202, 435 248, 412 288 C392 322, 362 348, 338 370 C330 350, 315 285, 305 240 C295 195, 312 168, 335 152 Z"
        fill="url(#zionHeartGrad)"
      />
      {/* Heart Inner Glow */}
      <path
        d="M335 152 C362 132, 405 138, 424 168 C445 202, 435 248, 412 288 C392 322, 362 348, 338 370 C330 350, 315 285, 305 240 C295 195, 312 168, 335 152 Z"
        fill="url(#zionHeartHighlight)"
      />
    </svg>
  );
};
