import { ExcludeNull, InferQueryOutput } from '../../types';

export type Chat = InferQueryOutput<'room.chats'>[number];

export type Room = ExcludeNull<InferQueryOutput<'room.byId'>>;
