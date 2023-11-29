import { Container } from '@mui/material'
import { ReactNode } from 'react'

export default function Page({ children }: { children: ReactNode }) {
  return (
    <Container
      sx={{
        padding: '1rem',
        backgroundColor: ({ palette }) => palette.background.default,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  )
}
