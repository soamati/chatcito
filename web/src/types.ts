import type { AppRouter as _AppRouter } from '../../server/src/router';
import { inferProcedureOutput, inferProcedureInput } from '@trpc/server';

// tRPC types

export type TAppRouter = _AppRouter;

export type TQuery = keyof TAppRouter['_def']['queries'];

export type TMutation = keyof TAppRouter['_def']['mutations'];

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  TAppRouter['_def']['queries'][TRouteKey]
>;

export type InferMutationInput<TRouteKey extends TMutation> =
  inferProcedureInput<TAppRouter['_def']['mutations'][TRouteKey]>;

// Utility types

export type ExcludeNull<T> = Exclude<T, null>;
