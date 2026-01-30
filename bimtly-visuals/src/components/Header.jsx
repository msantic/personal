import { useTranslation } from '../../node_modules/react-i18next'

export default function Header() {
  const { t } = useTranslation()

  return (
    <div className="header">
      <div className="logo">
        <img src="/assets/LOGO + BIMTLY - white.svg" alt="BIMTLY" className="logo-img" />
      </div>
      <div className="tagline">{t('header.tagline')}</div>
    </div>
  )
}
