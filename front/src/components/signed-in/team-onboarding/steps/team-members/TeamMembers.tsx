import React, { useContext, useState } from "react";

import { Grid, List, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import { apiInviteUser } from "../../../../../api";
import { useApiCall } from "../../../../../hooks";
import { GoogleAuthContext } from "../../../../contexts/WithGoogleAuth";
import { UserTeamsContext } from "../../../../contexts/WithUserTeams";
import { FeedbackButton } from "../../../../generic/buttons/FeedbackButton";
import { styles } from "./TeamMembers.styles";
import { User } from "./User";

export const TeamMembers = () => {
  const classes = styles();
  const { signedUser } = useContext(GoogleAuthContext);
  const { teams } = useContext(UserTeamsContext);
  const [users, setUsers] = useState<Array<string>>([signedUser?.email || ""]);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { apiAction: apiInvite, isLoading, isErrored, data } = useApiCall(
    apiInviteUser,
    () => {
      setUsers((current) => [...current, email]);
      setEmail("");
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const isEmailInvalid = () =>
    !email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isEmailInvalid()) return;

    apiInvite({ teamId: teams[0]._id, userEmail: email });
  };

  return (
    <Grid item xs={12}>
      <TextField
        required
        id="email"
        label="User email"
        name="email"
        type="text"
        margin="dense"
        variant="outlined"
        fullWidth
        value={email}
        error={isSubmitted && isEmailInvalid()}
        onChange={handleChange}
      />
      <FeedbackButton
        IconComponent={SupervisedUserCircleIcon}
        actionText="Invite user"
        isErrored={isErrored || data?.success === false}
        isPending={isLoading}
        onSubmit={handleSubmit}
      />
      <div className={classes.arrowContainer}>
        <ExpandMoreIcon className={classes.arrow} />
      </div>

      <List dense disablePadding>
        {users.map((email) => (
          <User key={email} email={email} />
        ))}
      </List>
    </Grid>
  );
};
