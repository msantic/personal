import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <div className="footer">
      {t('footer.copyright')}
    </div>
  )
}
