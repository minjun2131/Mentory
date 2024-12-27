import Image from 'next/image';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-12">
      <div className="w-full">
        <Image
          src="/images/hero-image.png"
          alt="Hero-Image"
          width={1920}
          height={300}
          className="w-full h-[30vh] sm:h-[300px] object-cover filter brightness-90 blur-[1px]"
        />
      </div>
    </section>
  );
};
