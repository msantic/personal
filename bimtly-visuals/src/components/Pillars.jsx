import { useTranslation } from '../../node_modules/react-i18next'
import PillarCard from './PillarCard'

export default function Pillars() {
  const { t } = useTranslation()
  const items = t('pillars.items', { returnObjects: true })

  return (
    <div className="pillars-section">
      <div className="section-label">{t('pillars.sectionLabel')}</div>
      <div className="pillars">
        {items.map((pillar, index) => (
          <PillarCard
            key={index}
            icon={pillar.icon}
            title={pillar.title}
            desc={pillar.desc}
          />
        ))}
      </div>
    </div>
  )
}
