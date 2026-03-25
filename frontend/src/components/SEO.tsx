// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

const SEO = ({ title, description, keywords }: SEOProps) => {
  const fullTitle = `${title} | مجمع النور الطبي`;
  const defaultDesc = "مجمع النور الطبي - رعاية صحية متكاملة بأحدث التقنيات وأفضل الأطباء.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || "مستشفى, مجمع طبي, دكتور, حجز مواعيد, رعاية صحية"} />
      {/* Open Graph لوسائل التواصل */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;