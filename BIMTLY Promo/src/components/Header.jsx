import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()

  return (
    <div className="header">
      <div className="logo">
        <div className="logo-icon">B</div>
        <div className="logo-text">{t('header.logoText')}</div>
      </div>
      <div className="tagline">{t('header.tagline')}</div>
    </div>
  )
}
