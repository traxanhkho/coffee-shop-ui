"use client";
import ContainerWrapper from "@/components/ContainerWrapper";
import CategorySelect from "@/components/CategorySelect";
import Layouts from "@/components/Layouts";
import ProductGroup from "@/components/ProductGroup";

export default function Home() {
  return (
    <Layouts>
      <div className="mt-8">
        <ContainerWrapper>
          <CategorySelect />
        </ContainerWrapper>
        <ProductGroup />
      </div>
    </Layouts>
  );
}
