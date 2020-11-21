import { BareUser, User } from "../../../../front/src/stack-shared-code/types";

export const toBareUser = (user: User): BareUser => ({
  _id: user._id,
  id: user.id,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  name: user.name,
  familyName: user.familyName,
  givenName: user.givenName,
  picture: user.picture,
  locale: user.locale,
});
