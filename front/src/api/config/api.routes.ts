export enum ApiRoute {
  Login = "/user/login",
  CreateTeam = "/team/create",
  JoinTeam = "/team/:name/join",
  InviteUser = "/user/invite",
  AcceptInvite = "/user/invite/:id/accept",
  RejectInvite = "/user/invite/:id/reject",
}
