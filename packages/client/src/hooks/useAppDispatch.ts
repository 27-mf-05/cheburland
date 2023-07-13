import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/redux/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
