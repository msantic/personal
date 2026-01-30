import { useTranslation } from '../../node_modules/react-i18next'

export default function Features() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true })

  return (
    <div className="features">
      {items.map((feature, index) => (
        <div key={index} className="feature">
          <div className="feature-check">✓</div>
          <div className="feature-text">{feature}</div>
        </div>
      ))}
    </div>
  )
}
