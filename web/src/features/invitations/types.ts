import { InferQueryOutput } from '../../types';

export type TReceivedInvitation =
  InferQueryOutput<'invitation.received'>[number];
