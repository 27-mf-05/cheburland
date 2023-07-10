import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataTable } from 'mantine-datatable'

import type { Topic } from '../../types'

type ForumTableProps = {
  topics: Topic[]
}

export const ForumTable: FC<ForumTableProps> = ({ topics }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <DataTable
      highlightOnHover
      verticalSpacing="xl"
      w="100vh"
      records={topics}
      columns={[
        { accessor: 'subject', title: 'Тема' },
        { accessor: 'replies', title: 'Ответы' },
      ]}
      onRowClick={({ id }) => navigate(`/forum/${id}`)}
    />
  )
}
