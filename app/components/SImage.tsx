import React from 'react'
import { Image } from 'react-native'

interface SImageProps {
  alt: string
  height?: number
  url: string
  width?: number
  style?: Record<string, string | number>
}

const SImage = ({ url, alt, width, height, style }: SImageProps) => {
  return (
    <Image
      alt={alt}
      source={{
        uri: url,
      }}
      style={{
        width: width || 100,
        height: height || 100,
        resizeMode: 'cover',
        ...style,
      }}
    />
  )
}

export default SImage
