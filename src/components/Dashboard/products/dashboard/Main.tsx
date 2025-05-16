import { useState } from "react";
import Page from "./dahboardPage/Page";
import UpgradePlan from "./upgrade/UpgradePlan";

function Main() {
  const [step, setStep] = useState(0);
  return (
    <div className="space-y-5">
      {
        {
          0: <Page setStep={setStep} />,
          1: <UpgradePlan setStep={setStep} />,
        }[step]
      }
    </div>
  );
}

export default Main;
