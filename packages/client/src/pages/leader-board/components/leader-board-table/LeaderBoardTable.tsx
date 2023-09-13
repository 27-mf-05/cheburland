import type { FC } from 'react'

import { Avatar } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

import { RESOURCES_URL } from '@/app/redux/api/endpoints'
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
      mih="100px"
      records={leaders}
      idAccessor="rank"
      fetching={!leaders}
      loaderVariant="oval"
      columns={[
        { accessor: 'rank', title: '№', width: '1%' },
        {
          accessor: 'avatar',
          title: '',
          width: '1%',
          render: ({ avatar, name }) => (
            <Avatar
              src={avatar ? RESOURCES_URL + avatar : ''}
              alt={name}
              radius="xl"
              size="lg"
            />
          ),
        },
        { accessor: 'name', title: 'Имя' },
        { accessor: 'score', title: 'Счет' },
      ]}
    />
  )
}
