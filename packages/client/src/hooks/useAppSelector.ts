import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '@/app/redux/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
