import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const steps = [
  { id: "01", name: "Tỉnh/ Thành phố", stepName: "city", current: true },
  { id: "02", name: "Quận/Huyện", stepName: "district", current: false },
  { id: "03", name: "Phường/Xã", stepName: "ward", current: false },
];

export default function LocationStepSelect({ setStep, step }) {
  const { resetField } = useFormContext();

  useEffect(() => {
    if (step == "city") {
      resetField("ward");
      resetField("district");
    } else if (step == "district") {
      resetField("ward");
    }
  }, [step, resetField]);

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y flex divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={stepIdx} className="relative flex-1 md:flex">
            <button
              type="button"
              onClick={() => setStep(step.stepName)}
              className="py-4 w-full items-center"
            >
              <span className="text-sm font-medium text-gray-900">
                {step.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
