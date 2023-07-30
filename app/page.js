"use client";
import ContainerWrapper from "@/components/ContainerWrapper";
import GenreGroup from "@/components/GenreGroup";
import Layouts from "@/components/Layouts";
import ProductGroup from "@/components/ProductGroup";

export default function Home() {
  return (
    <Layouts>
      <div className="mt-8">
        <ContainerWrapper>
          <GenreGroup />
        </ContainerWrapper>
        <ProductGroup />
      </div>
    </Layouts>
  );
}
