import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import { useOnboardingTeamActionForm as useForm } from "../../../../../../hooks";
import { FeedbackButton } from "../../../../../generic/buttons/FeedbackButton";
import { TopLeftButton } from "../../../../../generic/buttons/TopLeftButton";
import ColoredCard from "../../../../../generic/containers/ColoredCard";
import { TeamAction, TeamOnboardingStep } from "../../../TeamOnboarding";
import { Loading } from "./Loading";
import { styles } from "./TeamActionForm.styles";

interface TeamActionFormText {
  description: string;
  cancelAction: string;
  submitAction: string;
  loading: string;
}

interface TeamActionFormProps {
  type: TeamAction;
  text: TeamActionFormText;
  transitionDirection: "left" | "right";
  ActionIcon: OverridableComponent<SvgIconTypeMap>;
  TitleIcon: OverridableComponent<SvgIconTypeMap>;
  onStepChange: React.Dispatch<React.SetStateAction<TeamOnboardingStep>>;
}

export const TeamActionForm: React.FC<TeamActionFormProps> = ({
  type,
  text,
  transitionDirection,
  ActionIcon,
  TitleIcon,
  onStepChange,
}) => {
  const classes = styles();

  const {
    teamName,
    isSubmitted,
    isLoading,
    isErrored,
    handleChange,
    handleSubmit,
  } = useForm(type, onStepChange);

  const handleResetStep = () => onStepChange("InitialState");

  if (isLoading)
    return <Loading text={text.loading} IconComponent={ActionIcon} />;

  return (
    <>
      <TopLeftButton
        IconComponent={KeyboardArrowLeftIcon}
        onClick={handleResetStep}
      />
      <Grid item xs={12} sm={12} className={classes.centered}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={12}>
            <Slide
              direction={transitionDirection}
              timeout={600}
              in
              mountOnEnter
              unmountOnExit
            >
              <TitleIcon className={classes.actionIcon} color="primary" />
            </Slide>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Slide direction="up" timeout={600} in mountOnEnter unmountOnExit>
              <ColoredCard backgroundColor={grey[900]}>
                <>
                  {text.description}
                  <TextField
                    required
                    id="teamName"
                    label="Team name"
                    name="teamName"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={teamName}
                    error={isSubmitted && teamName === ""}
                    onChange={handleChange}
                  />
                  <FeedbackButton
                    IconComponent={ActionIcon}
                    actionText={text.submitAction}
                    isErrored={isErrored}
                    isPending={isLoading}
                    onSubmit={handleSubmit}
                  />
                </>
              </ColoredCard>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
