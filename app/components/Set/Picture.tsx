import SImage from '@/components/SImage'

import { StyleSheet } from 'react-native'

interface SetPictureProps {
  alt?: string | null
  height?: number
  url?: string | null
  width?: number
}

export default function SetPicture({
  alt,
  height,
  url,
  width,
}: SetPictureProps) {
  if (!url) return <></>

  return (
    <SImage
      alt={alt || ''}
      height={height || 30}
      style={styles.setImage}
      url={
        url ||
        'https://abocados-s3-bucket.s3.eu-west-3.amazonaws.com/recipes/no_photo'
      }
      width={width || 300}
    />
  )
}

const styles = StyleSheet.create({
  setImage: {
    borderRadius: 10,
  },
})
