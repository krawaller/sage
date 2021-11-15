import { ActionCreator } from './types/creator'
import {
  Action,
  ActionType,
  ActionState,
  ActionPayload,
  ActionDeps,
} from './types/action'
import { Reducer } from './types/reducer'
import { Consequence } from './types/consequence'

type FactoryOpts<A, S> = {
  type: ActionType<A>
  mapper?: (...args: any) => ActionPayload<A>
  reducer: Reducer<ActionState<A>, ActionPayload<A>>
  isError?: boolean
  cons?: Consequence<ActionState<A>, ActionDeps<A>>
}

export const factory = (blueprint: FactoryOpts<any, any>) => {
  const { type, reducer, isError, mapper, cons } = blueprint
  if (cons) {
    cons.displayName = type
  }
  const creator = ((...args: any) => ({
    type,
    payload: mapper ? mapper(...args) : args[0],
    ...(reducer && {
      reducer,
    }),
    ...(isError && {
      error: true,
    }),
    ...(cons && {
      cons,
    }),
  })) as ActionCreator<any, any>
  creator.actionType = blueprint.type
  const guard = (action: Action<string, any, any, any>): action is A =>
    action.type === (type as string)
  return [creator, guard] as const
}
