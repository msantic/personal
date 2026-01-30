import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className="hero">
      <div className="hero-badge">{t('hero.badge')}</div>
      <h1 className="hero-title">
        {t('hero.titlePrefix')} <span className="highlight">{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
      </h1>
      <p className="hero-subtitle">{t('hero.subtitle')}</p>
    </div>
  )
}
