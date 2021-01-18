export enum SnackbarKind {
  Success,
  Error,
  Warning,
  Info,
}

export interface SnackbarData {
  type: SnackbarKind;
  text: string;
}
