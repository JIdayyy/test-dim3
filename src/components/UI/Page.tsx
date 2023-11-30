import { Container } from '@mui/material'
import { ReactNode } from 'react'

export default function Page({
  children,
  center,
}: {
  children: ReactNode
  center?: boolean
}) {
  return (
    <Container
      sx={{
        padding: '1rem',
        backgroundColor: ({ palette }) => palette.background.default,
        flexGrow: 1,
        ...(center && {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }),
      }}
    >
      {children}
    </Container>
  )
}
