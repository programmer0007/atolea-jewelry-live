import {
  reactExtension,
  Banner,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
import {useState, useEffect} from 'react';

var countDownTarget = new Date().getTime() + 10 * 60 * 1000;
const startTime = '09:59';

function showClock(target) {
  const distance = target - new Date().getTime();
  const mins = (distance < 0 ? 0: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  const secs = (distance < 0 ? 0: Math.floor((distance % (1000 * 60)) / 1000)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  return mins + ':'+ secs;
}

function Extension() {
  let [bannerTitle, setBannerTitle] = useState(startTime);
  const {extension} = useApi();
  console.log('useApi => ', useApi());

  useEffect(()=>{
    setInterval(() => { 
        setBannerTitle(() => showClock(countDownTarget));
    }, 1000); 
  });


  return (
    <Banner status="critical">
      Your order is reserved for {bannerTitle}
    </Banner>
  );
}
export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);
