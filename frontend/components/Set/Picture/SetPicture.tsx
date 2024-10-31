import { Image } from '@nextui-org/image'
import styles from './setPicture.module.css'

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
    <Image
      alt={alt || ''}
      height={height || 30}
      className={styles.setImage}
      src={
        url ||
        'https://abocados-s3-bucket.s3.eu-west-3.amazonaws.com/recipes/no_photo'
      }
      width={width || 300}
    />
  )
}
