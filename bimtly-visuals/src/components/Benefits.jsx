import { useTranslation } from '../../node_modules/react-i18next'

export default function Benefits() {
  const { t } = useTranslation()
  const items = t('benefits.items', { returnObjects: true })

  return (
    <div className="benefits">
      {items.map((benefit, index) => (
        <div key={index} className="benefit">
          <span className="benefit-emoji">{benefit.emoji}</span>
          <div className="benefit-title">{benefit.title}</div>
          <div className="benefit-action">{benefit.action}</div>
        </div>
      ))}
    </div>
  )
}
