import { InferQueryOutput } from '../../types';

export type Member = InferQueryOutput<'room.members'>[number];
