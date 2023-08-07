import type { FC } from 'react'

import { Avatar } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

import { Leader } from '@/shared'

type LeaderBoardTableProps = {
  leaders: Leader[] | undefined
}

export const LeaderBoardTable: FC<LeaderBoardTableProps> = ({
  leaders,
}): JSX.Element => {
  return (
    <DataTable
      w="100vh"
      records={leaders}
      columns={[
        { accessor: 'rank', title: '№', width: '1%' },
        {
          accessor: 'avatar',
          title: '',
          width: '1%',
          render: ({ avatar, name }) => (
            <Avatar src={avatar} alt={name} radius="xl" size="lg" />
          ),
        },
        { accessor: 'name', title: 'Имя' },
        { accessor: 'score', title: 'Счет' },
      ]}
    />
  )
}
