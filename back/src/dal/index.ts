import * as AppKeysMockedStore from "./mockdb/stores/app.keys.mocked.store";
import * as InvitationsMockedStore from "./mockdb/stores/invitations.mocked.store";
import * as TeamsMockedStore from "./mockdb/stores/teams.mocked.store";
import * as UsersMockedStore from "./mockdb/stores/users.mocked.store";
import * as AppKeysStore from "./mongodb/stores/app.keys.store";
import * as InvitationsStore from "./mongodb/stores/invitations.store";
import * as TeamsStore from "./mongodb/stores/teams.store";
import * as UsersStore from "./mongodb/stores/users.store";

let stores = {
  Teams: TeamsStore,
  Users: UsersStore,
  AppKeys: AppKeysStore,
  Invitations: InvitationsStore,
};

const isDevEnv = process.env.NODE_ENV === "development";
if (isDevEnv) {
  stores = {
    Teams: TeamsMockedStore,
    Users: UsersMockedStore,
    AppKeys: AppKeysMockedStore,
    Invitations: InvitationsMockedStore,
  };
}

export default stores;
