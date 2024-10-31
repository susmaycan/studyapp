import styles from './card.module.css'
import SetPicture from '../Picture/SetPicture'
import { ISet } from '@/components/types/ISet'

interface SetCardProps {
  set: ISet
}

export default function SetCard({ set }: SetCardProps) {
  const navigateToDetailPage = () => {
    console.log('LALALAL')
  }
  return (
    <div onClick={navigateToDetailPage}>
      <div className={styles.setCard}>
        <SetPicture
          alt={`Picture of ${set?.name}`}
          height={200}
          url={set?.picture}
          width={200}
        />
        <p className={styles.setTitle}>{set.name}</p>
      </div>
    </div>
  )
}
