import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { renderCell } from "@/utils/renderCell";
import { getLocationData } from "@/utils/getLocationData";
import { useFormContext } from "react-hook-form";
import LocationList from "./LocationList";
import { useProduct } from "@/context/ProductContext";

const steps = ["Tỉnh/Thành Phố", "Quận/Huyện", "Phường/Xã"];

export default function AddressMultiStep() {
  const { locationData } = useProduct();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { watch } = useFormContext();

  const getDistricts = () => {
    if (locationData.length && watch("city")) {
      const districts = locationData.find(
        (item) => item.Id === watch("city")
      )?.Districts;
      return setDistricts(districts);
    }
    setDistricts([]);
  };

  const getWards = () => {
    if (locationData && watch("district")) {
      const districts = getDistricts();
      if (districts.length) {
        const wards = districts.find((d) => d.Id === watch("district"))?.Wards;
        return setWards(wards);
      }
    }

    setWards([]);
  };

  useEffect(() => {
    setDistricts(getDistricts());
    setWards(getWards());
  }, [activeStep]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleOnChangeDistrict = (e) => {
    console.log(e.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          console.log("close modal")
        ) : (
          <div className="min-h-[120px] max-h-[200px] overflow-scroll">
            {activeStep === 0 && (
              <LocationList
                name={"city"}
                data={locationData}
                handleOnChange={handleOnChangeDistrict}
              />
            )}
            {activeStep === 0 && (
              <LocationList
                name={"district"}
                data={districts}
                activeStep={activeStep}
                handleOnChange={handleOnChangeDistrict}
              />
            )}
            {activeStep === 0 && (
              <LocationList
                name={"ward"}
                data={wards}
                activeStep={activeStep}
                handleOnChange={(e) => console.log(e)}
              />
            )}
          </div>
        )}
      </div>
    </Box>
  );
}
