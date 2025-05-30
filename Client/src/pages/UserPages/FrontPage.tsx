import { lazy } from 'react';

const CategoryPreviews = lazy(()=>import("../../components/CategoryPreviews") )
const TrendingProducts = lazy(()=>import("../../components/TrendingProducts") )
const PromoSection = lazy(()=>import("../../components/PromoSection") )

function FrontPage() {
  return (
    <>
      <CategoryPreviews />
      <TrendingProducts />
      <PromoSection />
    </>
  );
}

export default FrontPage;

