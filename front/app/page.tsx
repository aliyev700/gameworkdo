import HomeBanners from './home/HomeBanners';
import ShopPart from './home/ShopPart';
import GameCategories from './home/GameCategories';
import Partners from './home/Partners';
import ShopPartBottom from './home/ShopPartBottom';
import Reviews from './home/Reviews';
import BlogPart from './home/BlogPart';


export default function Home() {
  return (
    <div>
      <HomeBanners />
      <ShopPart />
      <GameCategories />
      <Partners />
      <ShopPartBottom />
      <Reviews />
      <BlogPart />
    </div>
  );
}