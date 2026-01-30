import { useTranslation } from 'react-i18next'
import { Mail, Globe } from 'lucide-react'

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <div className="cta-section">
      <h2 className="cta-title">{t('cta.title')}</h2>
      <div className="cta-buttons">
        <button className="btn btn-primary">{t('cta.primaryButton')}</button>
        <button className="btn btn-secondary">{t('cta.secondaryButton')}</button>
      </div>
      <div className="contact-info">
        <div className="contact-item">
          <Mail size={14} />
          <strong>{t('contact.email')}</strong>
        </div>
        <div className="contact-item">
          <Globe size={14} />
          <strong>{t('contact.website')}</strong>
        </div>
      </div>
    </div>
  )
}
