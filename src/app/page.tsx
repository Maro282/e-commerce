import BrowseByCategory from "@/components/BrowseByCategory/BrowseByCategort";
import MainSlider from "@/components/MainSlider/MainSlider";
import MostSoldProducts from "@/components/MostSoldProducts/BestSellingProducts";
import { getAllCategories, getMostSoldProducts } from "@/services";

export default async function Home() {
  const mostSoldProducts = await getMostSoldProducts();
  const categories = await getAllCategories();

  return (
    <>
      <MainSlider />

      <MostSoldProducts mostSoldProducts={mostSoldProducts} />
      <BrowseByCategory categories={categories} />
    </>
  );
}
