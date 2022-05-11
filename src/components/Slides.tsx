import React from 'react';
import { IonSlides, IonSlide, IonButton } from '@ionic/react';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router';
import trade from '../images/lottie/trade.json';
import crypto from '../images/lottie/crypto.json';
import security from '../images/lottie/security.json';
import Trans from './Trans';

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const cryptoOptions = {
  loop: true,
  autoplay: true,
  animationData: crypto,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const tradeOptions = {
  loop: false,
  autoplay: true,
  style: { width: '50%' },
  animationData: trade,

};

const securityOptions = {
  loop: true,
  autoplay: true,
  animationData: security,
};

const Slides: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} className="introSlider">

        <IonSlides pager options={slideOpts}>
          <IonSlide>
            <Lottie
              options={tradeOptions}
              height={400}

            />
            <p>
              گروه ساترکس متشکل از با تجربه ترین برنامه نویسان، متخصصان امنیت شبکه و تحلیلگران، بستری امن و قابل اعتماد را
              ایجاد نموده­اند تا مردم شریف ایران بتوانند با خیالی راحت و با حفظ سرمایه های خود با سرعتی بالا و رابط کاربری
              آسان شروع به معامله در بازار ارزهای دیجیتال نمایند.
            </p>
          </IonSlide>
          <IonSlide>
            <Lottie
              options={cryptoOptions}
              height={400}

            />
            <p>
              امکان ورود به بازارهای رمزارز از طریق واریز تومان با کارت­های شتاب برای کاربران مسیر شده است. کاربران
              می­توانند انواع رمزارزهای محبوب را در شبکه های موجود با سرعت و امنیت بالا خرید و فروش نمایند. کارمزد معاملات
              در ساترکس بسیار کم بوده و با افزایش حجم معاملات کاهش می­یابد.
            </p>
          </IonSlide>
          <IonSlide>
            <Lottie
              options={securityOptions}
              height={400}

            />
            <p>
              ساترکس امنیت حساب کاربری را در سطوح مختلف فراهم کرده است. همچنین با روش ذخیره­سازی دارایی­های دیجیتال در کیف
              پول سرد، این اطمینان را ایجاد میکند حتی در صورت نفوذ به سرورها،امکان سرقت دارایی کاربران وجود نخواهد داشت.
            </p>
            <IonButton
              style={{ width: '45%', marginTop: '30px', boxShadow: 'none' }}
              onClick={() => history.replace('/home')}
            >
              <Trans>start</Trans>
            </IonButton>
          </IonSlide>
        </IonSlides>
      </div>
    </>
  );
};

export default Slides;
