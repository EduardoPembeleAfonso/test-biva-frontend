import React from 'react'
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { getInitials } from '@/utils/getInitials'

interface AvatarProps {
  image?: string
  fallback: string
  width?: string
  height?: string
}

export default function Avatar({
  image,
  fallback,
  width,
  height,
}: AvatarProps) {
  return (
    <AvatarContainer style={{ width: `${width}`, height: `${height}` }}>
      <AvatarImage src={image} />
      <AvatarFallback className="bg-primaryColor">
        {getInitials(fallback)}
      </AvatarFallback>
    </AvatarContainer>
  )
}
