import { useTranslation } from '../../node_modules/react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <div className="footer">
      {t('footer.copyright')}
    </div>
  )
}
