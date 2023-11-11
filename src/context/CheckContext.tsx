'use client';

import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from 'react';

interface CheckContextProps {
  children: ReactNode;
}

enum CheckActionType {
  CHECK_TOGGLE = 'CHECK_TOGGLE',
  CHECK = 'CHECK',
  UNCHECK_ALL = 'UNCHECK_ALL',
}

interface Action {
  type: CheckActionType;
  payload:
    | {
        id: string;
      }
    | {
        checkedIds: string[];
      }
    | {};
}

interface CheckState {
  allChecked: boolean;
  checkedIds: string[];
}

const reducer = (state: CheckState, action: Action): CheckState => {
  const { allChecked, checkedIds } = state;
  const { type, payload } = action;

  switch (type) {
    case CheckActionType.CHECK_TOGGLE: {
      if (!('checkedIds' in payload)) return state;
      if (allChecked) {
        return {
          allChecked: false,
          checkedIds: [],
        };
      }
      return {
        allChecked: true,
        checkedIds: payload.checkedIds,
      };
    }
    case CheckActionType.CHECK: {
      if (!('id' in payload)) return state;
      const updateState = {
        allChecked: checkedIds.includes(payload.id)
          ? checkedIds.length - 1 === 0
            ? false
            : true
          : true,
        checkedIds: checkedIds.includes(payload.id)
          ? checkedIds.filter((id) => id !== payload.id)
          : [...checkedIds, payload.id],
      };
      return {
        allChecked: updateState.allChecked,
        checkedIds: updateState.checkedIds,
      };
    }
    case CheckActionType.UNCHECK_ALL: {
      return {
        allChecked: false,
        checkedIds: [],
      };
    }
    default:
      return state;
  }
};

const initialState: CheckState = {
  allChecked: false,
  checkedIds: [],
};

const CheckContext = createContext({
  checkedsState: initialState,
});

const CheckDispatchContext = createContext({
  onCheckToggle: (checkedIds: string[]) => {},
  onCheck: (id: string) => {},
  onUnCheckAll: () => {},
});

const CheckProvider = ({ children }: CheckContextProps) => {
  const [checkedsState, dispatch] = useReducer(reducer, initialState);

  const onCheckToggle = useCallback((checkedIds: string[]) => {
    dispatch({
      type: CheckActionType.CHECK_TOGGLE,
      payload: { checkedIds },
    });
  }, []);

  const onCheck = useCallback((id: string) => {
    dispatch({
      type: CheckActionType.CHECK,
      payload: { id },
    });
  }, []);

  const onUnCheckAll = useCallback(() => {
    dispatch({
      type: CheckActionType.UNCHECK_ALL,
      payload: {},
    });
  }, []);

  const checksDispatch = useMemo(() => {
    return {
      onCheckToggle,
      onCheck,
      onUnCheckAll,
    };
  }, [onCheckToggle, onCheck, onUnCheckAll]);

  return (
    <CheckContext.Provider value={{ checkedsState }}>
      <CheckDispatchContext.Provider value={checksDispatch}>
        {children}
      </CheckDispatchContext.Provider>
    </CheckContext.Provider>
  );
};

export const useCheckState = () => {
  const { checkedsState } = useContext(CheckContext);
  return checkedsState;
};

export const useCheckDispatch = () => {
  const { onCheckToggle, onUnCheckAll, onCheck } =
    useContext(CheckDispatchContext);
  return { onCheckToggle, onUnCheckAll, onCheck };
};

export default CheckProvider;
