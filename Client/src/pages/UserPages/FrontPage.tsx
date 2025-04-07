import CategoryPreviews from "../../components/CategoryPreviews";
import PromoSection from "../../components/PromoSection";
import TrendingProducts from "../../components/TrendingProducts";

type Props = {};

function FrontPage({}: Props) {
  return (
    <>
      <CategoryPreviews />
      <TrendingProducts />
      <PromoSection />
    </>
  );
}

export default FrontPage;
