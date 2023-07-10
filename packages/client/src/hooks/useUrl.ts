import { useParams } from 'react-router-dom'

type UseInfoUrlTypeReturn = {
  forumTopicId?: string
}

export const useUrl = (): UseInfoUrlTypeReturn => {
  const { forumTopicId } = useParams<{ forumTopicId?: string }>()

  return {
    forumTopicId: forumTopicId || '',
  }
}
