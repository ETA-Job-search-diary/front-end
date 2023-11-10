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
  CHECK_ALL = 'CHECK_ALL',
  CHECK = 'CHECK',
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
    case CheckActionType.CHECK_ALL: {
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
        ...state,
        checkedIds: checkedIds.includes(payload.id)
          ? checkedIds.filter((id) => id !== payload.id)
          : [...checkedIds, payload.id],
      };
      return {
        ...state,
        checkedIds: updateState.checkedIds,
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
  onCheckAll: (checkedIds: string[]) => {},
  onCheck: (id: string) => {},
});

const CheckProvider = ({ children }: CheckContextProps) => {
  const [checkedsState, dispatch] = useReducer(reducer, initialState);

  const onCheckAll = useCallback((checkedIds: string[]) => {
    dispatch({
      type: CheckActionType.CHECK_ALL,
      payload: { checkedIds },
    });
  }, []);

  const onCheck = useCallback((id: string) => {
    dispatch({
      type: CheckActionType.CHECK,
      payload: { id },
    });
  }, []);

  const checksDispatch = useMemo(() => {
    return {
      onCheckAll,
      onCheck,
    };
  }, [onCheckAll, onCheck]);

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
  const { onCheckAll, onCheck } = useContext(CheckDispatchContext);
  return { onCheckAll, onCheck };
};

export default CheckProvider;
