import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Clinics } from '@/components/sections/Clinics';
import { Directions } from '@/components/sections/Directions';
import { SurgeryScene } from '@/components/sections/SurgeryScene';
import { Hospital } from '@/components/sections/Hospital';
import { DoctorsStrip } from '@/components/sections/DoctorsStrip';
import { Exotic } from '@/components/sections/Exotic';
import { Taxi } from '@/components/sections/Taxi';
import { PricePreview } from '@/components/sections/PricePreview';
import { Reviews } from '@/components/sections/Reviews';
import { Faq, FinalCta } from '@/components/sections/FaqFinal';
import { SwanDivider } from '@/components/art/Water';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Clinics />
      <Directions />
      <SurgeryScene />
      <Hospital />
      <DoctorsStrip />
      <Exotic />
      <Taxi />
      <PricePreview />
      <Reviews />
      <SwanDivider className="py-16" />
      <Faq />
      <FinalCta />
    </>
  );
}
