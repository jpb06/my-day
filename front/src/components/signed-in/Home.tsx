import React from "react";

import { TeamOnboarding } from "./team-onboarding/TeamOnboarding";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => (
  <>
    <TeamOnboarding />
  </>
);
