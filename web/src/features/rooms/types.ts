import { InferQueryOutput } from '../../types';

export type Chat = InferQueryOutput<'room.chats'>[number];
